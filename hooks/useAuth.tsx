'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

// Types based on the memory about auth system
export interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  username: string
  name: string
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  checkUsername: (username: string) => Promise<boolean>
  searchSponsor: (sponsorId: string) => Promise<{ success: boolean; data?: { id: string; name: string } }>
  searchRecommender: (recommenderId: string) => Promise<{ success: boolean; data?: { id: string; name: string } }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true)
      // Simulate API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
      }

      const data = await response.json()
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      
      setUser(data.user)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    try {
      setLoading(true)
      // Simulate API call
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Registration successful
        setLoading(false)
        return { success: true }
      } else {
        // Registration failed
        const errorData = await response.json()
        setLoading(false)
        return { success: false, message: errorData.message || 'Registration failed' }
      }
    } catch (error) {
      setLoading(false)
      return { success: false, message: error instanceof Error ? error.message : 'Registration failed' }
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }

  const checkUsername = async (username: string) => {
    // Simulate API call to check if username is available
    const response = await fetch(`/api/auth/check-username?username=${encodeURIComponent(username)}`)
    const data = await response.json()
    return data.available
  }

  const searchSponsor = async (sponsorId: string) => {
    // Simulate API call to search for sponsor
    const response = await fetch(`/api/auth/search-sponsor?id=${encodeURIComponent(sponsorId)}`)
    return await response.json()
  }

  const searchRecommender = async (recommenderId: string) => {
    // Simulate API call to search for recommender
    const response = await fetch(`/api/auth/search-recommender?id=${encodeURIComponent(recommenderId)}`)
    return await response.json()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkUsername,
        searchSponsor,
        searchRecommender
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuth
