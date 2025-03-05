export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginationMetadata {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PaginatedData<T> {
  items: T[]
  metadata: PaginationMetadata
}

export interface PaginatedResponse<T> extends Omit<ApiResponse<PaginatedData<T>>, 'data'> {
  data: PaginatedData<T>
}

export interface ErrorResponse {
  success: false
  message: string
  code?: string
  details?: Record<string, any>
}

export interface ApiError extends Error {
  status?: number
  code?: string
  details?: Record<string, any>
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
