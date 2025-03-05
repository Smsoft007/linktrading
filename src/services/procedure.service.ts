import { procedureManager } from '@/lib/procedure.manager'
import { ProcedureInfo, ProcedureParameter, ProcedureExecuteOptions } from '@/types/procedure.types'
import Logger from '@/lib/logger'
import { ISqlType } from 'mssql'

const logger = Logger.getInstance()

export class ProcedureService {
  private static instance: ProcedureService

  private constructor() {}

  public static getInstance(): ProcedureService {
    if (!ProcedureService.instance) {
      ProcedureService.instance = new ProcedureService()
    }
    return ProcedureService.instance
  }

  /**
   * 프로시저 정보 조회
   */
  public async getProcedureInfo(procedureName: string): Promise<ProcedureInfo> {
    try {
      return await procedureManager.getProcedureInfo(procedureName)
    } catch (error) {
      logger.error(`프로시저 정보 조회 실패: ${procedureName}`, { error })
      throw error
    }
  }

  /**
   * 프로시저 실행
   */
  public async execute<T = any>(
    procedureName: string,
    parameters: ProcedureParameter[],
    options?: ProcedureExecuteOptions
  ) {
    try {
      return await procedureManager.executeProcedure<T>(procedureName, parameters, options)
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
   * 프로시저 캐시 초기화
   */
  public clearCache(procedureName?: string): void {
    procedureManager.clearCache(procedureName)
  }

  /**
   * 프로시저 파라미터 생성 헬퍼
   */
  public createParameter(
    name: string,
    type: ISqlType,
    value: any,
    isOutput: boolean = false,
    description?: string,
    required: boolean = true
  ): ProcedureParameter {
    return {
      name,
      type,
      value,
      isOutput,
      description,
      required,
    }
  }
}

export default ProcedureService.getInstance()
