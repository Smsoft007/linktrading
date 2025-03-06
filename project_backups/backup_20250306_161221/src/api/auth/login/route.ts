import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { rateLimit } from '@/lib/rate-limit';
import { getConfig } from '@/lib/db-config';

// 로그인 시도 제한 설정 (IP당 1분에 5회)
const limiter = rateLimit({
  interval: 60 * 1000, // 1분
  uniqueTokenPerInterval: 500, // 최대 500개의 고유 IP 추적
});

// JWT 토큰 생성 함수
const generateToken = (userId: string, role: string): string => {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || 'your-secret-key';
  return jwt.sign(
    { 
      userId, 
      role,
      iat: Math.floor(Date.now() / 1000),
    },
    secret,
    { expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRES_IN || '12h' }
  );
};

export async function POST(request: NextRequest) {
  try {
    // 요청 IP 주소 가져오기
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // 속도 제한 적용
    try {
      await limiter.check(NextResponse.next(), ip, 5); // 1분에 5회로 제한
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          message: '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.' 
        },
        { status: 429 }
      );
    }

    // 요청 본문 파싱
    const { username, password } = await request.json();
    
    console.log('Login attempt:', { username, passwordLength: password?.length });

    // 필수 필드 검증
    if (!username || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: '아이디와 비밀번호를 모두 입력해주세요.' 
        },
        { status: 400 }
      );
    }

    // SQL 인젝션 방지를 위한 기본 검증
    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { 
          success: false, 
          message: '유효하지 않은 입력 형식입니다.' 
        },
        { status: 400 }
      );
    }

    // 데이터베이스 연결
    const config = getConfig();
    console.log('DB 연결 시도:', { 
      server: config.server, 
      database: config.database,
      port: config.port
    });
    
    try {
      const pool = await sql.connect(config);
      console.log('DB 연결 성공');

      // 저장 프로시저를 사용하여 사용자 정보 조회
      const sqlRequest = new sql.Request(pool);
      sqlRequest.input('USERNAME', sql.NVarChar, username);
      
      console.log('저장 프로시저 실행: SP_MEMBER_LOGIN');
      const result = await sqlRequest.execute('SP_MEMBER_LOGIN');
      console.log('프로시저 결과:', { 
        recordCount: result.recordset?.length,
        hasRecords: !!result.recordset && result.recordset.length > 0
      });

      // 사용자가 존재하지 않는 경우
      if (!result.recordset || result.recordset.length === 0) {
        return NextResponse.json(
          { 
            success: false, 
            message: '아이디 또는 비밀번호가 일치하지 않습니다.' 
          },
          { status: 401 }
        );
      }

      const user = result.recordset[0];
      
      // 비밀번호 검증 (데모 목적으로 직접 비교, 실제로는 bcrypt 사용 권장)
      // const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
      const isPasswordValid = password === user.PASSWORD;
      
      if (!isPasswordValid) {
        // 로그인 실패 로그 기록 (선택사항)
        console.warn(`Failed login attempt for user: ${username} from IP: ${ip}`);
        
        return NextResponse.json(
          { 
            success: false, 
            message: '아이디 또는 비밀번호가 일치하지 않습니다.' 
          },
          { status: 401 }
        );
      }

      // 로그인 성공 시 세션 생성 및 토큰 발급
      const token = generateToken(user.MEMBER_ID.toString(), user.MEMBER_LEVEL || 'user');
      
      // 세션 정보 저장 (선택사항)
      const sessionRequest = new sql.Request(pool);
      sessionRequest.input('MEMBER_ID', sql.Int, user.MEMBER_ID);
      sessionRequest.input('TOKEN', sql.NVarChar, token);
      sessionRequest.input('IP_ADDRESS', sql.NVarChar, ip);
      
      try {
        await sessionRequest.execute('SP_CREATE_SESSION');
      } catch (sessionError) {
        console.error('Failed to create session:', sessionError);
        // 세션 생성 실패는 로그인 실패로 처리하지 않음
      }

      // 사용자 정보에서 민감한 데이터 제거
      const sanitizedUser = {
        id: user.MEMBER_ID,
        name: user.MEMBER_NAME,
        email: user.MEMBER_ID, // 아이디를 이메일 필드에 매핑
        role: user.MEMBER_LEVEL || 'user',
        createdAt: user.REG_DATE || new Date().toISOString(),
        token: token
      };

      // 성공 응답 반환
      return NextResponse.json({
        success: true,
        message: '로그인에 성공했습니다.',
        data: sanitizedUser
      });
      
    } catch (dbError) {
      console.error('DB 연결 오류:', dbError);
      
      return NextResponse.json(
        { 
          success: false, 
          message: '데이터베이스 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
        },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Login error:', error);
    
    // 오류 유형에 따른 응답 처리
    if (error instanceof sql.RequestError) {
      return NextResponse.json(
        { 
          success: false, 
          message: '데이터베이스 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
      },
      { status: 500 }
    );
  }
}