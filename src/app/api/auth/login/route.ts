import { NextResponse, NextRequest } from 'next/server'
import sql from 'mssql'
import { v4 as uuidv4 } from 'uuid'

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