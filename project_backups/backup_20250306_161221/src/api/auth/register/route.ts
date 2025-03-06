import { NextResponse, NextRequest } from 'next/server'

// Mock MSSQL implementation
// This is a placeholder implementation that mimics MSSQL functionality
// without requiring the actual mssql package

// Mock SQL types
const sql = {
  NVarChar: (size: number) => ({ type: 'nvarchar', size }),
  Int: () => ({ type: 'int' }),
  Bit: () => ({ type: 'bit' }),
  DateTime: () => ({ type: 'datetime' }),
  
  // Mock connection method
  connect: async (config: any) => {
    console.log('[MSSQL] Connecting to database with config:', {
      server: config.server,
      database: config.database,
      user: config.user,
      // Not logging password for security
    });
    
    // Return mock pool
    return {
      close: async () => {
        console.log('[MSSQL] Connection closed');
        return Promise.resolve();
      },
    };
  },
  
  // Mock Request class
  Request: class {
    private params: Record<string, any> = {};
    
    constructor(private pool: any) {
      console.log('[MSSQL] Request created');
    }
    
    input(name: string, type: any, value: any) {
      this.params[name] = value;
      console.log(`[MSSQL] Parameter added: ${name}`);
      return this;
    }
    
    async execute(procedure: string) {
      console.log(`[MSSQL] Executing stored procedure: ${procedure}`);
      console.log('[MSSQL] With parameters:', this.params);
      
      // Mock successful registration
      if (procedure === 'sp_signup') {
        // Check if username already exists (mock check)
        if (this.params['inUser_ID'] === 'admin') {
          return {
            recordset: [{
              Result: 'FAIL',
              Message: '이미 존재하는 사용자 ID입니다'
            }]
          };
        }
        
        // Mock successful registration
        return {
          recordset: [{
            Result: 'SUCCESS',
            Message: '회원가입 성공'
          }]
        };
      }
      
      // Default mock response
      return {
        recordset: []
      };
    }
  }
};

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

export async function POST(req: NextRequest) {
  try {
    const { username, password, name, email } = await req.json()

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
    const sqlRequest = new sql.Request(pool)
    
    // Add parameters
    sqlRequest.input('inUser_ID', sql.NVarChar(100), username)
    sqlRequest.input('inUser_Pwd', sql.NVarChar(150), password)
    sqlRequest.input('inUser_Name', sql.NVarChar(100), name)
    sqlRequest.input('inUser_Email', sql.NVarChar(150), email)
    
    // Execute stored procedure
    const result = await sqlRequest.execute('sp_signup')
    
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