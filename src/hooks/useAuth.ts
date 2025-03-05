'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'

// 모의 사용자 데이터
const MOCK_USER = {
  id: '1',
  name: '테스트 사용자',
  email: 'test@example.com',
  role: 'user' as const,
  createdAt: new Date().toISOString()
}

// 사용자 정보 타입
export interface User {
  id: string
  name: string
  email: string
  role: string
  sessionId?: string
}

// 로그인 정보 타입
export interface LoginCredentials {
  username: string
  password: string
}

// 회원가입 정보 타입
export interface RegisterData {
  username: string
  password: string
  name: string
  email: string
}

// 로그인 결과 타입
interface LoginResult {
  success: boolean
  user?: User
  message?: string
}

// 인증 컨텍스트 타입
interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: Error | null
  login: (credentials: LoginCredentials) => Promise<LoginResult>
  register: (data: RegisterData) => Promise<LoginResult>
  logout: () => void
}

// 기본 컨텍스트 값
const defaultContext: AuthContextType = {
  user: null,
  isLoading: false,
  error: null,
  login: async () => ({ success: false, message: '구현되지 않음' }),
  register: async () => ({ success: false, message: '구현되지 않음' }),
  logout: () => {},
}

// 인증 컨텍스트 생성
const AuthContext = createContext<AuthContextType>(defaultContext)

// 인증 프로바이더 컴포넌트
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // 초기 로드 시 로컬 스토리지에서 사용자 정보 가져오기
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (err) {
        console.error('사용자 정보 로드 오류:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  // 로그인 함수
  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    setIsLoading(true)
    setError(null)

    try {
      // API 라우트를 통해 로그인 요청
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '로그인에 실패했습니다')
      }

      if (data.success && data.user) {
        // 로그인 성공 처리
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        return {
          success: true,
          user: data.user
        }
      } else {
        throw new Error(data.message || '로그인에 실패했습니다')
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('로그인 중 오류가 발생했습니다')
      setError(error)
      return {
        success: false,
        message: error.message
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 회원가입 함수
  const register = async (data: RegisterData): Promise<LoginResult> => {
    setIsLoading(true)
    setError(null)

    try {
      // API 라우트를 통해 회원가입 요청
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message || '회원가입에 실패했습니다')
      }

      if (responseData.success) {
        // 회원가입 성공 후 자동 로그인
        return await login({
          username: data.username,
          password: data.password
        })
      } else {
        throw new Error(responseData.message || '회원가입에 실패했습니다')
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('회원가입 중 오류가 발생했습니다')
      setError(error)
      return {
        success: false,
        message: error.message
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 로그아웃 함수
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // 컨텍스트 값
  const contextValue = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
  }

  return React.createElement(AuthContext.Provider, { value: contextValue }, children)
}

// 인증 훅
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
