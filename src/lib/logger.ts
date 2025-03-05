import { LogLevel, LoggerConfig, LogMessage } from '@/types/logger.types'
import { LOG_COLORS, formatLogMessage, shouldLog } from '@/utils/logger.utils'

class Logger {
  private static instance: Logger
  private config: LoggerConfig

  private constructor(config?: Partial<LoggerConfig>) {
    this.config = {
      logLevel: config?.logLevel || 'info',
      useConsole: config?.useConsole !== false,
    }
  }

  public static getInstance(config?: Partial<LoggerConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config)
    }
    return Logger.instance
  }

  private log(level: LogLevel, message: string, data?: any) {
    if (!shouldLog(level, this.config.logLevel)) return

    const logMessage: LogMessage = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    }

    const formattedMessage = formatLogMessage(logMessage)

    if (this.config.useConsole) {
      const color = LOG_COLORS[level]
      console.log(`%c${formattedMessage}`, `color: ${color}`)
      if (data) {
        console.log(data)
      }
    }
  }

  public debug(message: string, data?: any) {
    this.log('debug', message, data)
  }

  public info(message: string, data?: any) {
    this.log('info', message, data)
  }

  public warn(message: string, data?: any) {
    this.log('warn', message, data)
  }

  public error(message: string, data?: any) {
    this.log('error', message, data)
  }

  public fatal(message: string, data?: any) {
    this.log('fatal', message, data)
  }
}

export default Logger
