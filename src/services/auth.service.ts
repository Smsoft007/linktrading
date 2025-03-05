import api from './api';
import { LoginCredentials, RegisterData, User } from '../types/auth.types';

// API 엔드포인트 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post<{ user: User; token: string }>('/auth/register', data);
    return response.data;
  },

  async getProfile() {
    const response = await api.get<User>('/user/profile');
    return response.data;
  },

  async updateProfile(data: Partial<User>) {
    const response = await api.put<User>('/user/profile', data);
    return response.data;
  },

  // 아이디 중복 확인 함수
  async checkUsername(username: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-username?username=${encodeURIComponent(username)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '아이디 확인에 실패했습니다')
      }

      return await response.json()
    } catch (error) {
      console.error('Check username error:', error)
      throw error
    }
  },

  // 후원인 검색 함수
  async searchSponsor(query: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/search-sponsor?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '후원인 검색에 실패했습니다')
      }

      return await response.json()
    } catch (error) {
      console.error('Search sponsor error:', error)
      throw error
    }
  },

  // 추천인 검색 함수
  async searchRecommender(query: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/search-recommender?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '추천인 검색에 실패했습니다')
      }

      return await response.json()
    } catch (error) {
      console.error('Search recommender error:', error)
      throw error
    }
  },

  // 로그아웃 함수
  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '로그아웃에 실패했습니다')
      }

      return await response.json()
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  // 국가 목록 가져오기
  async getCountries() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/countries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '국가 정보를 불러오는데 실패했습니다')
      }

      return await response.json()
    } catch (error) {
      console.error('Get countries error:', error)
      throw error
    }
  },

  // 센터 목록 가져오기
  async getCenters() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/centers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '센터 정보를 불러오는데 실패했습니다')
      }

      return await response.json()
    } catch (error) {
      console.error('Get centers error:', error)
      throw error
    }
  },

  // 은행 목록 가져오기
  async getBanks() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/banks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || '은행 정보를 불러오는데 실패했습니다')
      }

      return await response.json()
    } catch (error) {
      console.error('Get banks error:', error)
      throw error
    }
  },
};
