import { mssqlClient } from '@/lib/mssql.client'

export interface User {
  UserID: number
  Email: string
  Name: string
  CreatedAt: Date
}

export class UserService {
  /**
   * 사용자 목록 조회
   */
  static async getUsers(page: number = 1, pageSize: number = 10): Promise<User[]> {
    const result = await mssqlClient.executeProcedure<User>('sp_GetUsers', [
      mssqlClient.createParameter('@PageNumber', 'Int', page),
      mssqlClient.createParameter('@PageSize', 'Int', pageSize),
      mssqlClient.createOutputParameter('@TotalCount', 'Int'),
    ])
    return result.resultSet
  }

  /**
   * 사용자 상세 조회
   */
  static async getUserById(userId: number): Promise<User | null> {
    const result = await mssqlClient.executeProcedure<User>('sp_GetUserById', [
      mssqlClient.createParameter('@UserID', 'Int', userId),
    ])
    return result.resultSet[0] || null
  }

  /**
   * 사용자 생성
   */
  static async createUser(email: string, name: string, password: string): Promise<number> {
    const result = await mssqlClient.executeProcedure<{ UserID: number }>('sp_CreateUser', [
      mssqlClient.createParameter('@Email', 'NVarChar', email),
      mssqlClient.createParameter('@Name', 'NVarChar', name),
      mssqlClient.createParameter('@Password', 'NVarChar', password),
      mssqlClient.createOutputParameter('@UserID', 'Int'),
    ])
    return result.outputParameters['@UserID']
  }

  /**
   * 사용자 정보 수정
   */
  static async updateUser(userId: number, name: string): Promise<void> {
    await mssqlClient.executeProcedure('sp_UpdateUser', [
      mssqlClient.createParameter('@UserID', 'Int', userId),
      mssqlClient.createParameter('@Name', 'NVarChar', name),
    ])
  }

  /**
   * 사용자 삭제
   */
  static async deleteUser(userId: number): Promise<void> {
    await mssqlClient.executeProcedure('sp_DeleteUser', [
      mssqlClient.createParameter('@UserID', 'Int', userId),
    ])
  }
}
