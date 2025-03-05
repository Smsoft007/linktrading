import { apiClient } from './api.client'
import { MSSQLParameter, MSSQLProcedureResult, SqlTypeFactory } from '@/types/mssql.types'

interface ExecuteProcedureOptions {
  timeout?: number
  useTransaction?: boolean
}

class MSSQLClient {
  private readonly baseUrl: string

  constructor(baseUrl: string = '/api/mssql') {
    this.baseUrl = baseUrl
  }

  /**
   * 프로시저 실행
   * @param procedureName 프로시저 이름
   * @param parameters 파라미터 배열
   * @param options 실행 옵션
   */
  async executeProcedure<T = any>(
    procedureName: string,
    parameters: MSSQLParameter[] = [],
    options: ExecuteProcedureOptions = {}
  ): Promise<MSSQLProcedureResult<T>> {
    try {
      const response = await apiClient.post<MSSQLProcedureResult<T>>(`${this.baseUrl}/procedure`, {
        procedureName,
        parameters,
        options,
      })
      return response.data
    } catch (error: any) {
      throw new Error(`프로시저 실행 중 오류 발생: ${error.message}`)
    }
  }

  /**
   * 파라미터 생성 헬퍼 함수
   */
  createParameter(name: string, type: any, value: any, output: boolean = false): MSSQLParameter {
    return {
      name,
      type,
      value,
      output,
    }
  }

  /**
   * 출력 파라미터 생성 헬퍼 함수
   */
  createOutputParameter(name: string, type: any): MSSQLParameter {
    return this.createParameter(name, type, null, true)
  }
}

export const mssqlClient = new MSSQLClient()
