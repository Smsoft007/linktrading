export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export interface LoggerConfig {
  logLevel: LogLevel
  useConsole?: boolean
  useFile?: boolean
  logFilePath?: string
  datePattern?: string
}

export interface LogMessage {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
}
