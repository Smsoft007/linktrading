import axios from 'axios'
import { API_CONFIG } from '@/config/api.config'
import { ApiResponse, ErrorResponse, PaginatedResponse } from '@/types/api.types'
import Logger from './logger'

const logger = Logger.getInstance()

export class ApiClient {
  private static instance: ApiClient
  private axiosInstance: ReturnType<typeof axios.create>

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    })
    this.setupInterceptors()
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers) {
          config.headers = {}
        }

        // Add auth token if available
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        logger.debug('API Request', {
          url: config.url,
          method: config.method,
          data: config.data,
        })
        return config
      },
      (error) => {
        logger.error('Request error', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        logger.debug('API Response', {
          url: response.config.url,
          status: response.status,
          data: response.data,
        })
        return response
      },
      (error) => {
        logger.error('API Error', {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
        })
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  private handleError(error: unknown): never {
    if (error instanceof Error) {
      logger.error('API Error', { error: error.message })
      throw error
    }
    throw new Error('Unknown error occurred')
  }

  public async get<T>(url: string, config?: Parameters<typeof axios.get>[1]): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.get<ApiResponse<T>>(url, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  public async post<T>(url: string, data?: any, config?: Parameters<typeof axios.post>[2]): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  public async put<T>(url: string, data?: any, config?: Parameters<typeof axios.put>[2]): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  public async delete<T>(url: string, config?: Parameters<typeof axios.delete>[1]): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  public async getPaginated<T>(
    url: string,
    page: number = 1,
    limit: number = 10,
    config?: Parameters<typeof axios.get>[1]
  ): Promise<PaginatedResponse<T>> {
    try {
      const params = {
        ...(config?.params || {}),
        page,
        limit,
      }

      const response = await this.axiosInstance.get<{
        data: T[]
        total: number
        page: number
        limit: number
        totalPages: number
        success: boolean
        message?: string
      }>(url, {
        ...config,
        params,
      })

      return {
        success: response.data.success,
        message: response.data.message,
        data: {
          items: response.data.data,
          metadata: {
            total: response.data.total,
            page: response.data.page,
            limit: response.data.limit,
            totalPages: response.data.totalPages,
          }
        }
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }
}

export const apiClient = ApiClient.getInstance()
export default apiClient
