declare namespace NodeJS {
  interface ProcessEnv {
    // API 설정
    NEXT_PUBLIC_API_URL: string
    NEXT_PUBLIC_API_TIMEOUT: string

    // MSSQL 설정
    NEXT_PUBLIC_MSSQL_SERVER: string
    NEXT_PUBLIC_MSSQL_DATABASE: string
    NEXT_PUBLIC_MSSQL_USER: string
    NEXT_PUBLIC_MSSQL_PASSWORD: string
    NEXT_PUBLIC_MSSQL_ENCRYPT: string
    NEXT_PUBLIC_MSSQL_TRUST_SERVER_CERTIFICATE: string

    // 로깅 설정
    NEXT_PUBLIC_LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
    NEXT_PUBLIC_LOG_USE_CONSOLE: string
    NEXT_PUBLIC_LOG_USE_FILE: string
    NEXT_PUBLIC_LOG_FILE_PATH: string
    NEXT_PUBLIC_LOG_DATE_PATTERN: string

    // JWT 설정
    NEXT_PUBLIC_JWT_SECRET: string
    NEXT_PUBLIC_JWT_EXPIRES_IN: string

    // 캐시 설정
    NEXT_PUBLIC_CACHE_TIMEOUT: string

    // 프로시저 설정
    NEXT_PUBLIC_PROCEDURE_DEFAULT_TIMEOUT: string
    NEXT_PUBLIC_PROCEDURE_MAX_RETRY_COUNT: string
  }
}
