import axios from 'axios'
import Logger from '@/lib/logger'

const logger = Logger.getInstance()

interface AxiosLikeError extends Error {
  config?: {
    url?: string
    method?: string
    data?: any
    headers?: Record<string, string>
  }
  response?: {
    status?: number
    data?: any
  }
}

function isAxiosLikeError(error: unknown): error is AxiosLikeError {
  return (
    error instanceof Error &&
    typeof (error as any).config === 'object' &&
    typeof (error as any).response === 'object'
  )
}

export function logApiError(error: unknown): void {
  if (isAxiosLikeError(error)) {
    logger.error('API Error', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    })
  } else if (error instanceof Error) {
    logger.error('API Error', {
      message: error.message,
      stack: error.stack,
    })
  } else {
    logger.error('Unknown API Error', error)
  }
}

export function logSystemError(error: Error): void {
  logger.error('System Error', {
    name: error.name,
    message: error.message,
    stack: error.stack,
  })
}

export function logAuthError(error: Error): void {
  logger.error('Authentication Error', {
    name: error.name,
    message: error.message,
    stack: error.stack,
  })
}

export function logValidationError(error: Error & { errors?: Record<string, string[]> }): void {
  logger.error('Validation Error', {
    name: error.name,
    message: error.message,
    errors: error.errors,
  })
}

export function logApiRequest(method: string, url: string, data?: any): void {
  logger.debug('API Request', {
    method,
    url,
    data,
  })
}

export function logApiResponse(method: string, url: string, status: number, data?: any): void {
  logger.debug('API Response', {
    method,
    url,
    status,
    data,
  })
}
