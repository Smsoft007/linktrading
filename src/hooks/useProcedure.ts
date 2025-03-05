'use client'

import { useState } from 'react'

// Define type interfaces here to avoid importing from procedure.types.ts which has server dependencies
interface ProcedureParameter {
  name: string;
  type: any;
  value: any;
  isOutput?: boolean;
  description?: string;
  required?: boolean;
}

interface ProcedureExecuteOptions {
  timeout?: number;
  useTransaction?: boolean;
}

interface ProcedureInfoV2 {
  name: string;
  parameters: ProcedureParameter[];
  description?: string;
}

// Simple type map for client-side type references (not the actual SQL types)
const TYPES = {
  Int: 'Int',
  BigInt: 'BigInt',
  NVarChar: (length: number) => `NVarChar(${length})`,
  VarChar: (length: number) => `VarChar(${length})`,
  Bit: 'Bit',
  DateTime: 'DateTime',
  Date: 'Date',
  Decimal: 'Decimal',
  Float: 'Float',
  Money: 'Money',
  Real: 'Real',
  UniqueIdentifier: 'UniqueIdentifier',
}

// 클라이언트 사이드에서 사용할 서비스 구현
const ClientProcedureService = {
  async execute<T = any>(
    procedureName: string,
    parameters: ProcedureParameter[],
    options?: ProcedureExecuteOptions
  ): Promise<T> {
    try {
      // API 라우트를 통해 서버 사이드 프로시저 실행
      const response = await fetch('/api/procedure/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          procedureName,
          parameters,
          options,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '프로시저 실행 중 오류가 발생했습니다');
      }

      return await response.json();
    } catch (error) {
      console.error('프로시저 실행 오류:', error);
      throw error;
    }
  },

  createParameter(
    name: string,
    type: string,
    value: any,
    isOutput: boolean = false,
    description?: string
  ): ProcedureParameter {
    // 클라이언트에서는 실제 SQL 타입 대신 문자열로 타입 정보만 전달
    return {
      name,
      type,
      value,
      isOutput,
      description,
      required: true,
    };
  }
};

export function useProcedure<T = any>(
  procedureName: string,
  defaultOptions?: ProcedureExecuteOptions
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * 프로시저 실행
   */
  const execute = async (parameters: ProcedureParameter[], options?: ProcedureExecuteOptions) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await ClientProcedureService.execute<T>(
        procedureName,
        parameters,
        { ...defaultOptions, ...options }
      )
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error('프로시저 실행 중 오류가 발생했습니다')
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 파라미터 생성 헬퍼
   */
  const createParameter = (
    name: string,
    type: string,
    value: any,
    isOutput: boolean = false,
    description?: string
  ) => {
    return ClientProcedureService.createParameter(name, type, value, isOutput, description)
  }

  return {
    execute,
    createParameter,
    isLoading,
    error,
    TYPES
  }
}

// Export the TYPES object for use in other client components
export { TYPES }
