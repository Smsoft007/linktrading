import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';
import jwt from 'jsonwebtoken';
import { getConfig } from '@/lib/db-config';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Firebase Admin 초기화
if (!getApps().length) {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '', 'base64').toString()
  );
  
  initializeApp({
    credential: cert(serviceAccount)
  });
}

// JWT 토큰 생성 함수
const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign(
    { 
      userId, 
      role,
      iat: Math.floor(Date.now() / 1000),
    },
    secret,
    { expiresIn: '12h' }
  );
};

export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const { idToken, email, displayName } = await request.json();

    // 필수 필드 검증
    if (!idToken) {
      return NextResponse.json(
        { 
          success: false, 
          message: '유효하지 않은 인증 정보입니다.' 
        },
        { status: 400 }
      );
    }

    // Firebase Admin으로 토큰 검증
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // 데이터베이스 연결
    const config = getConfig();
    const pool = await sql.connect(config);

    // 사용자 존재 여부 확인 - 암호화된 이메일 처리
    const checkRequest = new sql.Request(pool);
    checkRequest.input('EMAIL', sql.NVarChar, email);
    
    // 암호화된 이메일로 사용자 조회 (dbo.fn_dec 함수 사용)
    const query = `
      SELECT * FROM DISTRIBU 
      WHERE dbo.fn_dec(D_EMAIL) = @EMAIL
    `;
    
    const result = await checkRequest.query(query);
    
    let user;
    let memberId;
    
    if (!result.recordset || result.recordset.length === 0) {
      // 사용자가 존재하지 않는 경우 새로 등록
      const registerRequest = new sql.Request(pool);
      registerRequest.input('MEMBER_ID', sql.NVarChar, email);
      registerRequest.input('MEMBER_NAME', sql.NVarChar, displayName || email.split('@')[0]);
      registerRequest.input('PASSWORD', sql.NVarChar, uid); // Firebase UID를 비밀번호로 사용 (실제로는 로그인에 사용되지 않음)
      registerRequest.input('EMAIL', sql.NVarChar, email);
      registerRequest.input('SOCIAL_TYPE', sql.NVarChar, 'google');
      registerRequest.input('SOCIAL_ID', sql.NVarChar, uid);
      
      const registerResult = await registerRequest.execute('SP_MEMBER_REGISTER_SOCIAL');
      
      if (!registerResult.recordset || registerResult.recordset.length === 0) {
        return NextResponse.json(
          { 
            success: false, 
            message: '사용자 등록에 실패했습니다.' 
          },
          { status: 500 }
        );
      }
      
      memberId = registerResult.recordset[0].MEMBER_ID;
      user = {
        id: memberId,
        name: displayName || email.split('@')[0],
        email: email,
        role: 'user',
        createdAt: new Date().toISOString()
      };
    } else {
      // 기존 사용자 정보 가져오기
      user = result.recordset[0];
      memberId = user.MEMBER_ID;
      
      // 소셜 로그인 정보 업데이트
      const updateRequest = new sql.Request(pool);
      updateRequest.input('MEMBER_ID', sql.Int, memberId);
      updateRequest.input('SOCIAL_TYPE', sql.NVarChar, 'google');
      updateRequest.input('SOCIAL_ID', sql.NVarChar, uid);
      
      try {
        await updateRequest.execute('SP_MEMBER_UPDATE_SOCIAL');
      } catch (updateError) {
        console.error('Failed to update social info:', updateError);
        // 업데이트 실패는 로그인 실패로 처리하지 않음
      }
    }

    // 토큰 생성
    const token = generateToken(memberId.toString(), user.MEMBER_LEVEL || 'user');
    
    // 세션 정보 저장
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const sessionRequest = new sql.Request(pool);
    sessionRequest.input('MEMBER_ID', sql.Int, memberId);
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
      id: memberId,
      name: user.MEMBER_NAME || displayName || email.split('@')[0],
      email: email,
      role: user.MEMBER_LEVEL || 'user',
      createdAt: user.REG_DATE || new Date().toISOString(),
      token: token
    };

    // 성공 응답 반환
    return NextResponse.json({
      success: true,
      message: 'Google 로그인에 성공했습니다.',
      data: sanitizedUser
    });
    
  } catch (error: any) {
    console.error('Google login error:', error);
    
    // Firebase 인증 오류 처리
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { 
          success: false, 
          message: '인증 토큰이 만료되었습니다. 다시 로그인해주세요.' 
        },
        { status: 401 }
      );
    }
    
    if (error.code === 'auth/invalid-id-token') {
      return NextResponse.json(
        { 
          success: false, 
          message: '유효하지 않은 인증 토큰입니다.' 
        },
        { status: 401 }
      );
    }
    
    // 기타 오류 처리
    return NextResponse.json(
      { 
        success: false, 
        message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
      },
      { status: 500 }
    );
  }
}
