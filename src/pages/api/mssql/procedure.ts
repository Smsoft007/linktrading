import { NextApiRequest, NextApiResponse } from 'next'
import { ENV_CONFIG } from '@/config/env.config'
import Logger from '@/lib/logger'
import { NextResponse, NextRequest } from 'next/server'
import sql from 'mssql'
import { v4 as uuidv4 } from 'uuid'

const logger = Logger.getInstance()

// MSSQL 모듈은 서버 사이드에서만 임포트
let sql: any
if (typeof window === 'undefined') {
  sql = require('mssql')
}

// MSSQL 연결 설정
const config = {
  server: ENV_CONFIG.MSSQL.server,
  database: ENV_CONFIG.MSSQL.database,
  user: ENV_CONFIG.MSSQL.user,
  password: ENV_CONFIG.MSSQL.password,
  port: parseInt(process.env.NEXT_PUBLIC_MSSQL_PORT || '1433'),
  options: {
    encrypt: ENV_CONFIG.MSSQL.options.encrypt,
    trustServerCertificate: ENV_CONFIG.MSSQL.options.trustServerCertificate,
  },
}

// 연결 풀 생성
let pool: any = null

async function getPool() {
  if (!pool && typeof window === 'undefined') {
    try {
      logger.info('Creating new MSSQL connection pool')
      pool = await new sql.ConnectionPool(config).connect()
      logger.info('MSSQL connection pool created successfully')
    } catch (err) {
      logger.error('Failed to create MSSQL connection pool:', err)
      throw err
    }
  }
  return pool
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    const { procedureName, parameters = [], options = {} } = req.body

    if (!procedureName) {
      return res.status(400).json({ success: false, message: 'Procedure name is required' })
    }

    logger.info(`Executing procedure: ${procedureName}`, { parameters })

    // 연결 풀 가져오기
    const pool = await getPool()
    const request = pool.request()

    // 파라미터 추가
    for (const param of parameters) {
      if (param.output) {
        request.output(param.name, param.type, param.value)
      } else {
        request.input(param.name, param.type, param.value)
      }
    }

    // 프로시저 실행
    const result = await request.execute(procedureName)

    logger.info(`Procedure ${procedureName} executed successfully`)

    // 결과 반환
    return res.status(200).json({
      success: true,
      recordset: result.recordset,
      recordsets: result.recordsets,
      rowsAffected: result.rowsAffected,
      output: result.output,
    })
  } catch (error: any) {
    logger.error('Error executing procedure:', error)
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    })
  }
}

// Database configuration
const dbConfig = {
  user: process.env.NEXT_PUBLIC_MSSQL_USER,
  password: process.env.NEXT_PUBLIC_MSSQL_PASSWORD,
  server: process.env.NEXT_PUBLIC_MSSQL_SERVER || '',
  database: process.env.NEXT_PUBLIC_MSSQL_DATABASE,
  port: Number(process.env.NEXT_PUBLIC_MSSQL_PORT) || 1433,
  options: {
    encrypt: process.env.NEXT_PUBLIC_MSSQL_ENCRYPT === 'true',
    trustServerCertificate: process.env.NEXT_PUBLIC_MSSQL_TRUST_SERVER_CERTIFICATE === 'true',
  }
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        { message: '아이디와 비밀번호를 입력해주세요' },
        { status: 400 }
      )
    }

    // Generate session ID
    const sessionId = uuidv4()
    
    // Get client IP (in production, this would use request headers)
    const clientIp = '127.0.0.1'

    // Connect to database
    const pool = await sql.connect(dbConfig)
    
    // Create request
    const request = new sql.Request(pool)
    
    // Add parameters
    request.input('inUser_ID', sql.NVarChar(100), username)
    request.input('inUser_Pwd', sql.NVarChar(150), password)
    request.input('inUser_IP', sql.NVarChar(50), clientIp)
    request.input('sessionID', sql.NVarChar(50), sessionId)
    
    // Execute stored procedure
    const result = await request.execute('sp_signin')
    
    // Close the connection
    await pool.close()
    
    // Process the result
    if (result.recordset && result.recordset.length > 0) {
      const userData = result.recordset[0]
      
      if (userData.Result === 'SUCCESS') {
        // User authenticated successfully
        const user = {
          id: userData.User_ID,
          name: userData.User_Name || '사용자',
          email: userData.User_Email || '',
          role: userData.User_Role || 'user',
          sessionId: sessionId
        }
        
        return NextResponse.json({
          success: true,
          user,
          message: '로그인에 성공했습니다'
        })
      } else {
        // Authentication failed
        return NextResponse.json(
          { 
            success: false, 
            message: userData.Message || '아이디 또는 비밀번호가 올바르지 않습니다' 
          },
          { status: 401 }
        )
      }
    } else {
      // No result from database
      return NextResponse.json(
        { success: false, message: '로그인 처리 중 오류가 발생했습니다' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: '로그인 처리 중 오류가 발생했습니다',
        error: (error as Error).message 
      },
      { status: 500 }
    )
  }
}

export const { webpack } = {
  webpack: (config, { isServer }) => {
    // punycode 경고 무시
    config.ignoreWarnings = [
      {
        module: /node_modules\/node-fetch\/lib\/index\.js/,
        message: /^The 'punycode' module is deprecated/,
      },
    ]

    // Handle Node.js specific modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        'tedious/lib/connection': false,
        crypto: false,
        stream: false,
        path: false,
        util: false,
        child_process: false,
      }
    }

    return config
  },
} 