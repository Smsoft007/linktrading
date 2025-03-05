export const ENV_CONFIG = {
  // API 설정
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),

  // MSSQL 설정
  MSSQL: {
    server: process.env.NEXT_PUBLIC_MSSQL_SERVER || 'localhost',
    database: process.env.NEXT_PUBLIC_MSSQL_DATABASE || 'your_database',
    user: process.env.NEXT_PUBLIC_MSSQL_USER || 'your_username',
    password: process.env.NEXT_PUBLIC_MSSQL_PASSWORD || 'your_password',
    options: {
      encrypt: process.env.NEXT_PUBLIC_MSSQL_ENCRYPT === 'true',
      trustServerCertificate: process.env.NEXT_PUBLIC_MSSQL_TRUST_SERVER_CERTIFICATE === 'true',
    },
  },

  // 로깅 설정
  LOGGING: {
    level: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
    useConsole: process.env.NEXT_PUBLIC_LOG_USE_CONSOLE === 'true',
    useFile: process.env.NEXT_PUBLIC_LOG_USE_FILE === 'true',
    filePath: process.env.NEXT_PUBLIC_LOG_FILE_PATH || './logs',
    datePattern: process.env.NEXT_PUBLIC_LOG_DATE_PATTERN || 'YYYY-MM-DD',
  },

  // JWT 설정
  JWT: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET || 'your_jwt_secret',
    expiresIn: process.env.NEXT_PUBLIC_JWT_EXPIRES_IN || '24h',
  },

  // 캐시 설정
  CACHE_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_CACHE_TIMEOUT || '3600000'),

  // 프로시저 설정
  PROCEDURE: {
    defaultTimeout: parseInt(process.env.NEXT_PUBLIC_PROCEDURE_DEFAULT_TIMEOUT || '30000'),
    maxRetryCount: parseInt(process.env.NEXT_PUBLIC_PROCEDURE_MAX_RETRY_COUNT || '3'),
  },
} as const
