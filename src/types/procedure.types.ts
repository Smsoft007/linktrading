import { ISqlType, TYPES as SQL_TYPES } from 'mssql'
import { SqlTypeFactory } from './mssql.types'

export type SqlType = SqlTypeFactory | ISqlType

export interface ProcedureParameter {
  name: string
  type: SqlType
  value: any
  required: boolean
  isOutput?: boolean
  description?: string
}

export interface ProcedureInfo {
  usingCache: boolean
  params: ProcedureParameter[]
  hasList?: boolean
}

export interface ProcedureNameInfo {
  name: string
  returnName: string
}

export interface ProcedureExecuteOptions {
  timeout?: number
  useTransaction?: boolean
  retryCount?: number
  validateParams?: boolean
  includeCount?: boolean
}

export interface ProcedureCache {
  [key: string]: {
    info: ProcedureInfo
    lastUpdated: number
  }
}

export const ProcedureNames: { [key: string]: ProcedureNameInfo } = {
  signin: {
    name: 'SP_MEMBER_LOGIN',
    returnName: 'SIGNIN',
  },
  my_token: {
    name: 'SP_TOKEN_LIST',
    returnName: 'MY_TOKEN',
  },
  mywithdraw_token: {
    name: 'SP_MY_WITHDRAW_TOKEN',
    returnName: 'MYWITHDRAW_TOKEN',
  },
  coin_balance: {
    name: 'SP_COIN_BALANCE',
    returnName: 'COIN_BALANCE',
  },
  coin_token_balance: {
    name: 'SP_MY_POINT_BALANCE',
    returnName: 'COIN_token_BALANCE',
  },
  saleadd: {
    name: 'SALE_ADD',
    returnName: 'SALEADD',
  },
  my_transorm: {
    name: 'SP_TRANSFORM',
    returnName: 'MY_TRANSORM',
  },
  boardList: {
    name: 'SP_BOARD_MAIN_LIST',
    returnName: 'BOARDLIST',
  }
}

export const ProcedureInfoMap: { [key: string]: ProcedureInfo } = {
  SP_MEMBER_LOGIN: {
    usingCache: false,
    params: [
      {
        name: 'inUser_ID',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'inUser_Pwd',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'inUser_IP',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'sessionID',
        type: SQL_TYPES.VarChar(100),
        value: null,
        required: true,
      },
    ],
  },
  SP_TOKEN_LIST: {
    usingCache: false,
    hasList: true,
    params: [
      {
        name: 'D_UID',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
    ],
  },
  SP_MY_WITHDRAW_TOKEN: {
    usingCache: false,
    params: [
      {
        name: 'D_UID',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'GUBUN',
        type: SQL_TYPES.VarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'D_AMOUNT',
        type: SQL_TYPES.Float,
        value: null,
        required: true,
      },
      {
        name: 'D_BIDNO',
        type: SQL_TYPES.VarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'D_PASS2',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
    ],
  },
  SP_COIN_BALANCE: {
    usingCache: false,
    params: [
      {
        name: 'D_UID',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
    ],
  },
  SP_MY_POINT_BALANCE: {
    usingCache: false,
    params: [
      {
        name: 'D_UID',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
    ],
  },
  SALE_ADD: {
    usingCache: false,
    params: [
      {
        name: 'D_NO',
        type: SQL_TYPES.Int,
        value: null,
        required: true,
      },
      {
        name: 'MS_KEY',
        type: SQL_TYPES.BigInt,
        value: null,
        required: true,
      },
      {
        name: 'QTY',
        type: SQL_TYPES.Int,
        value: null,
        required: true,
      },
      {
        name: 'GCODE',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'AMOUNT',
        type: SQL_TYPES.Decimal(18,2),
        value: null,
        required: true,
      },
      {
        name: 'TXID',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'RATE',
        type: SQL_TYPES.Decimal(18,2),
        value: null,
        required: true,
      },
      {
        name: 'GUBUN',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
    ],
  },
  SP_TRANSFORM: {
    usingCache: false,
    params: [
      {
        name: 'D_UID',
        type: SQL_TYPES.VarChar(100),
        value: null,
        required: true,
      },
    ],
  },
  SP_BOARD_MAIN_LIST: {
    usingCache: false,
    hasList: true,
    params: [
      {
        name: 'B_UID',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'B_GUBUN',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'IP_NO',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'D_SDATE',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'D_EDATE',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
      {
        name: 'CUR_PAGING',
        type: SQL_TYPES.Int,
        value: null,
        required: true,
      },
      {
        name: 'PAGING_NO',
        type: SQL_TYPES.Int,
        value: null,
        required: true,
      },
      {
        name: 'MY_NOTICE',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
      },
    ],
  },
  SP_BOARD_MAIN_LIST_CNT: {
    usingCache: false,
    params: [
      {
        name: 'B_UID',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
        description: '사용자 ID',
      },
      {
        name: 'B_GUBUN',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
        description: '게시판 구분',
      },
      {
        name: 'IP_NO',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
        description: 'IP 주소',
      },
      {
        name: 'D_SDATE',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
        description: '시작일',
      },
      {
        name: 'D_EDATE',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
        description: '종료일',
      },
      {
        name: 'MY_NOTICE',
        type: SQL_TYPES.NVarChar(100),
        value: null,
        required: true,
        description: '내 공지사항 여부',
      },
    ],
  },
}

// 클라이언트 사이드 호환성을 위한 타입 정의
export type ISqlType = {
  name: string
  length?: number
  precision?: number
  scale?: number
}

// 클라이언트 사이드 호환성을 위한 TYPES 정의
export const CLIENT_TYPES = {
  NVarChar: (length: number) => ({ name: 'NVarChar', length }),
  VarChar: (length: number) => ({ name: 'VarChar', length }),
  Int: { name: 'Int' },
  Bit: { name: 'Bit' },
  DateTime: { name: 'DateTime' },
  // 필요한 타입 추가
}

// 프로시저 파라미터 타입
export interface ProcedureParameter {
  name: string
  type: any // ISqlType | SqlTypeFactory
  value: any
  isOutput?: boolean
  description?: string
  required?: boolean
}

// 프로시저 실행 옵션 타입
export interface ProcedureExecuteOptions {
  timeout?: number
  useTransaction?: boolean
  retryCount?: number
  validateParams?: boolean
  includeCount?: boolean
}

// 프로시저 이름 매핑
export const ProcedureNamesV2: Record<string, { name: string, returnName?: string }> = {
  'signin': { name: 'sp_signin' },
  'signup': { name: 'sp_signup' },
  'getUserInfo': { name: 'sp_get_user_info' },
  'updateUserInfo': { name: 'sp_update_user_info' },
  // 필요한 프로시저 추가
}

// 프로시저 정보 매핑
export const ProcedureInfoMapV2: Record<string, ProcedureInfoV2> = {
  'sp_signin': {
    name: 'sp_signin',
    description: '사용자 로그인',
    params: [
      { name: 'D_UID', type: 'varchar', required: true, description: '사용자 아이디' },
      { name: 'D_PASS', type: 'varchar', required: true, description: '비밀번호' }
    ],
    returnName: 'RESULT'
  },
  // 필요한 프로시저 정보 추가
}

// 프로시저 정보 타입 (클라이언트측에서 사용하는 확장된 정보)
export interface ProcedureInfoV2 {
  name: string
  description?: string
  params: Array<{
    name: string
    type: string
    description?: string
    required?: boolean
  }>
  hasList?: boolean
  returnName?: string
}

// 프로시저 캐시 타입
export interface ProcedureCacheV2 {
  [key: string]: {
    info: ProcedureInfoV2
    lastUpdated: number
  }
}
