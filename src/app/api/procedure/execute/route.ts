import { NextRequest, NextResponse } from 'next/server';
import { ProcedureManager } from '@/lib/procedure.manager';
import { ProcedureParameter, ProcedureExecuteOptions } from '@/types/procedure.types';
import sql from 'mssql';

// Database configuration using the correct environment variables
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
};

export async function POST(request: NextRequest) {
  try {
    const { procedureName, parameters } = await request.json();

    console.log('Connecting to SQL Server:', {
      server: dbConfig.server,
      database: dbConfig.database,
      user: dbConfig.user,
      port: dbConfig.port,
      encrypt: dbConfig.options.encrypt,
      trustServerCertificate: dbConfig.options.trustServerCertificate,
    });

    // Connect to database
    const pool = await sql.connect(dbConfig);
    
    // Create request
    const request = new sql.Request(pool);
    
    // Add parameters to the request
    if (parameters && Array.isArray(parameters)) {
      parameters.forEach(param => {
        if (param.isOutput) {
          request.output(param.name, param.type, param.value);
        } else {
          request.input(param.name, param.type, param.value);
        }
      });
    }
    
    // Execute the stored procedure
    const result = await request.execute(procedureName);
    
    // Close the connection
    await pool.close();
    
    return NextResponse.json(result.recordset || { success: true });
  } catch (error) {
    console.error('Error executing procedure:', error);
    return NextResponse.json(
      { message: 'Failed to execute procedure', error: (error as Error).message },
      { status: 500 }
    );
  }
} 