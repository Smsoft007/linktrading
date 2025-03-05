import { 
  ProcedureInfo, 
  ProcedureInfoV2, 
  ProcedureCacheV2, 
  ProcedureParameter, 
  ProcedureExecuteOptions, 
  ProcedureNames, 
  ProcedureNamesV2, 
  ProcedureInfoMapV2 
} from '@/types/procedure.types'
import { MSSQLParameter, MSSQLProcedureResult, ListProcedureResult } from '@/types/mssql.types'
import { mssqlClient } from './mssql.client'
import Logger from './logger'

const logger = Logger.getInstance()

class ProcedureManager {
  private static instance: ProcedureManager
  private cache: ProcedureCacheV2 = {}
  private cacheTimeout: number = 1000 * 60 * 60 // 1시간

  private constructor() {}

  public static getInstance(): ProcedureManager {
    if (!ProcedureManager.instance) {
      ProcedureManager.instance = new ProcedureManager()
    }
    return ProcedureManager.instance
  }

  /**
   * 프로시저 정보 조회
   */
  async getProcedureInfo(procedureName: string): Promise<ProcedureInfo> {
    // 캐시 확인
    const cached = this.cache[procedureName]
    if (cached && Date.now() - cached.lastUpdated <= this.cacheTimeout) {
      return cached.info
    }

    // 프로시저 정보 조회
    const info = ProcedureInfoMapV2[procedureName]
    if (!info) {
      throw new Error(`프로시저 정보를 찾을 수 없습니다: ${procedureName}`)
    }

    // 캐시에 저장
    this.cache[procedureName] = {
      info,
      lastUpdated: Date.now(),
    }

    return info
  }

  /**
   * 프로시저 파라미터를 MSSQL 파라미터로 변환
   */
  private convertToMSSQLParameters(parameters: ProcedureParameter[]): MSSQLParameter[] {
    return parameters.map(param => ({
      name: param.name,
      type: param.type,
      value: param.value ?? null,
      output: param.isOutput ?? false,
    }))
  }

  /**
   * 프로시저 실행
   */
  async executeProcedure<T>(
    procedureKey: string,
    parameters: ProcedureParameter[],
    options: ProcedureExecuteOptions = {}
  ): Promise<ListProcedureResult<T>> {
    const {
      timeout = 30000,
      useTransaction = false,
      retryCount = 0,
      validateParams = true,
      includeCount = false,
    } = options

    // 프로시저 이름 조회
    const procedureInfo = ProcedureNames[procedureKey]
    if (!procedureInfo) {
      throw new Error(`프로시저 키를 찾을 수 없습니다: ${procedureKey}`)
    }

    const procedureName = procedureInfo.name

    try {
      // 프로시저 정보 조회
      const info = await this.getProcedureInfo(procedureName)

      // 파라미터 유효성 검사
      if (validateParams) {
        this.validateParameters(info, parameters)
      }

      // MSSQL 파라미터로 변환
      const mssqlParameters = this.convertToMSSQLParameters(parameters)

      // 프로시저 실행
      const result = await mssqlClient.executeProcedure<T>(procedureName, mssqlParameters, {
        timeout,
        useTransaction,
      })

      // 리스트 프로시저인 경우 카운트 조회
      let count
      if (info.hasList && includeCount) {
        const countResult = await mssqlClient.executeProcedure<{ total: number, page: number, limit: number }>(
          `${procedureName}_CNT`,
          mssqlParameters,
          { timeout }
        )
        if (countResult.recordset?.[0]) {
          count = countResult.recordset[0]
        }
      }

      return {
        ...result,
        returnName: procedureInfo.returnName,
        count,
      }
    } catch (error) {
      logger.error(`프로시저 실행 실패: ${procedureName}`, {
        parameters,
        options,
        error,
      })
      throw error
    }
  }

  /**
   * 파라미터 유효성 검사
   */
  private validateParameters(info: ProcedureInfo, parameters: ProcedureParameter[]): void {
    const errors: string[] = []

    // 필수 파라미터 확인
    for (const expectedParam of info.params) {
      if (expectedParam.required) {
        const providedParam = parameters.find(p => p.name === expectedParam.name)
        if (!providedParam || providedParam.value === undefined || providedParam.value === null) {
          errors.push(`필수 파라미터가 누락되었습니다: ${expectedParam.name}`)
        }
      }
    }

    // 잘못된 파라미터 확인
    for (const providedParam of parameters) {
      const expectedParam = info.params.find(p => p.name === providedParam.name)
      if (!expectedParam) {
        errors.push(`알 수 없는 파라미터입니다: ${providedParam.name}`)
      }
    }

    if (errors.length > 0) {
      throw new Error(`파라미터 유효성 검사 실패:\n${errors.join('\n')}`)
    }
  }

  /**
   * 캐시 초기화
   */
  clearCache(procedureName?: string): void {
    if (procedureName) {
      delete this.cache[procedureName]
    } else {
      this.cache = {}
    }
  }

  /**
   * 캐시 타임아웃 설정
   */
  setCacheTimeout(timeout: number): void {
    this.cacheTimeout = timeout
  }
}

export const procedureManager = ProcedureManager.getInstance()
