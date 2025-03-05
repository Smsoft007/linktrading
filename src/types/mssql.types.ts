import { ISqlType } from 'mssql'

// SQL 타입 팩토리 타입 (mssql 라이브러리의 TYPES 객체와 호환)
export type SqlTypeFactory = (...args: any[]) => ISqlType

// MSSQL 파라미터 타입
export interface MSSQLParameter {
  name: string
  type: any // ISqlType | SqlTypeFactory
  value: any
  output?: boolean
}

// MSSQL 프로시저 실행 결과 타입
export interface MSSQLProcedureResult<T = any> {
  success: boolean
  recordset?: T[]
  recordsets?: any[]
  rowsAffected?: number[]
  output?: any
  message?: string
  error?: any
}

// MSSQL 프로시저 리스트 결과 타입
export interface ListProcedureResult<T = any> extends MSSQLProcedureResult<T> {
  returnName?: string
  count?: {
    total: number
    page: number
    limit: number
  }
}

// MSSQL 연결 설정 타입
export interface MSSQLConfig {
  server: string
  database: string
  user: string
  password: string
  port?: number
  options?: {
    encrypt?: boolean
    trustServerCertificate?: boolean
    [key: string]: any
  }
}

export type MSSQLParamType =
  | 'Bit'
  | 'BigInt'
  | 'Decimal'
  | 'Float'
  | 'Int'
  | 'Money'
  | 'Numeric'
  | 'SmallInt'
  | 'SmallMoney'
  | 'Real'
  | 'TinyInt'
  | 'Char'
  | 'NChar'
  | 'Text'
  | 'NText'
  | 'VarChar'
  | 'NVarChar'
  | 'Xml'
  | 'Time'
  | 'Date'
  | 'DateTime'
  | 'DateTime2'
  | 'DateTimeOffset'
  | 'SmallDateTime'
  | 'UniqueIdentifier'
  | 'Variant'
  | 'Binary'
  | 'VarBinary'
  | 'Image'
  | 'UDT'
  | 'Geography'
  | 'Geometry'
