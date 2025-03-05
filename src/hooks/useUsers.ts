'use client'

import { create } from 'zustand'
import { User, UserService } from '@/services/user.service'

interface UsersState {
  users: User[]
  totalCount: number
  currentPage: number
  pageSize: number
  isLoading: boolean
  error: string | null
  
  // 액션
  fetchUsers: (page?: number, pageSize?: number) => Promise<void>
  createUser: (email: string, name: string, password: string) => Promise<void>
  updateUser: (userId: number, name: string) => Promise<void>
  deleteUser: (userId: number) => Promise<void>
}

export const useUsers = create<UsersState>((set, get) => ({
  users: [],
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
  error: null,

  fetchUsers: async (page = 1, pageSize = 10) => {
    try {
      set({ isLoading: true, error: null })
      const users = await UserService.getUsers(page, pageSize)
      set({ 
        users,
        currentPage: page,
        pageSize
      })
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  createUser: async (email: string, name: string, password: string) => {
    try {
      set({ isLoading: true, error: null })
      await UserService.createUser(email, name, password)
      // 목록 새로고침
      await get().fetchUsers(get().currentPage, get().pageSize)
    } catch (error: any) {
      set({ error: error.message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  updateUser: async (userId: number, name: string) => {
    try {
      set({ isLoading: true, error: null })
      await UserService.updateUser(userId, name)
      // 목록 새로고침
      await get().fetchUsers(get().currentPage, get().pageSize)
    } catch (error: any) {
      set({ error: error.message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },

  deleteUser: async (userId: number) => {
    try {
      set({ isLoading: true, error: null })
      await UserService.deleteUser(userId)
      // 목록 새로고침
      await get().fetchUsers(get().currentPage, get().pageSize)
    } catch (error: any) {
      set({ error: error.message })
      throw error
    } finally {
      set({ isLoading: false })
    }
  },
}))
