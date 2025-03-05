import { NextResponse, NextRequest } from 'next/server'
import sql from 'mssql'

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
    const { username, password, name, email } = await request.json()

    // Validate required fields
    if (!username || !password || !name || !email) {
      return NextResponse.json(
        { message: '모든 필수 항목을 입력해주세요' },
        { status: 400 }
      )
    }

    // Connect to database
    const pool = await sql.connect(dbConfig)
    
    // Create request
    const request = new sql.Request(pool)
    
    // Add parameters
    request.input('inUser_ID', sql.NVarChar(100), username)
    request.input('inUser_Pwd', sql.NVarChar(150), password)
    request.input('inUser_Name', sql.NVarChar(100), name)
    request.input('inUser_Email', sql.NVarChar(150), email)
    
    // Execute stored procedure
    const result = await request.execute('sp_signup')
    
    // Close the connection
    await pool.close()
    
    // Process the result
    if (result.recordset && result.recordset.length > 0) {
      const userData = result.recordset[0]
      
      if (userData.Result === 'SUCCESS') {
        // User registered successfully
        return NextResponse.json({
          success: true,
          message: '회원가입에 성공했습니다'
        })
      } else {
        // Registration failed
        return NextResponse.json(
          { 
            success: false, 
            message: userData.Message || '회원가입에 실패했습니다' 
          },
          { status: 400 }
        )
      }
    } else {
      // No result from database
      return NextResponse.json(
        { success: false, message: '회원가입 처리 중 오류가 발생했습니다' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: '회원가입 처리 중 오류가 발생했습니다',
        error: (error as Error).message 
      },
      { status: 500 }
    )
  }
} 