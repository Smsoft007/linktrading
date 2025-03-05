import { LogLevel, LogMessage } from '@/types/logger.types'

export const LOG_COLORS: Record<LogLevel, string> = {
  debug: '#808080', // gray
  info: '#0066cc',  // blue
  warn: '#ff9900',  // orange
  error: '#cc0000', // red
  fatal: '#990000'  // dark red
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
}

export function formatDate(date: Date, pattern: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0')

  return pattern
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
    .replace('SSS', milliseconds)
}

export function shouldLog(messageLevel: LogLevel, configLevel: LogLevel): boolean {
  return LOG_LEVELS[messageLevel] >= LOG_LEVELS[configLevel]
}

export function formatLogMessage(logMessage: LogMessage): string {
  const { timestamp, level, message } = logMessage
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`
}
