'use client'

import { useState } from 'react'

// 지원하는 코인 타입
const COIN_TYPES = ['TRC', 'ERC', 'BEP']

// 타입 정의
interface WalletInfo {
  address: string
  balance?: string
  coinType: string
}

interface WalletState {
  wallets: Record<string, WalletInfo>
  isLoading: boolean
  error: string
}

/**
 * 지갑 관련 기능을 제공하는 커스텀 훅 (모의 구현)
 */
export function useWallet() {
  const [state, setState] = useState<WalletState>({
    wallets: {},
    isLoading: false,
    error: ''
  })

  /**
   * 지갑 주소 생성 함수 (모의 구현)
   * @param userId 사용자 ID
   */
  const createWallets = async (userId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: '' }))
    
    try {
      // 실제 API 호출 대신 모의 데이터 생성
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const createdWallets: Record<string, WalletInfo> = {}
      
      // 각 코인 타입에 대해 모의 지갑 주소 생성
      for (const coinType of COIN_TYPES) {
        const randomAddress = generateRandomAddress(coinType)
        console.log(`${coinType} 지갑 주소 생성 성공:`, randomAddress)
        
        createdWallets[coinType] = {
          address: randomAddress,
          coinType
        }
      }
      
      // 상태 업데이트
      setState(prev => ({
        ...prev,
        wallets: { ...prev.wallets, ...createdWallets },
        isLoading: false
      }))
      
      return createdWallets
    } catch (err: any) {
      console.error('지갑 주소 생성 중 오류:', err)
      
      // 에러 메시지 설정
      const errorMessage = err.message || '지갑 주소 생성 중 오류가 발생했습니다.'
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }))
      
      throw err
    }
  }

  /**
   * 지갑 잔액 조회 함수 (모의 구현)
   * @param userId 사용자 ID
   * @param coinType 코인 타입
   */
  const getWalletBalance = async (userId: string, coinType: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: '' }))
    
    try {
      // 실제 API 호출 대신 모의 데이터 생성
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // 모의 잔액 생성
      const randomBalance = (Math.random() * 10).toFixed(4)
      
      // 상태 업데이트
      setState(prev => ({
        ...prev,
        wallets: {
          ...prev.wallets,
          [coinType]: {
            ...prev.wallets[coinType],
            balance: randomBalance
          }
        },
        isLoading: false
      }))
      
      return randomBalance
    } catch (err: any) {
      console.error('지갑 잔액 조회 중 오류:', err)
      
      // 에러 메시지 설정
      const errorMessage = err.message || '지갑 잔액 조회 중 오류가 발생했습니다.'
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }))
      
      throw err
    }
  }

  /**
   * 모든 지갑 잔액 조회 함수 (모의 구현)
   * @param userId 사용자 ID
   */
  const getAllWalletBalances = async (userId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: '' }))
    
    try {
      const balances: Record<string, string> = {}
      
      // 각 코인 타입에 대해 잔액 조회
      for (const coinType of COIN_TYPES) {
        try {
          const balance = await getWalletBalance(userId, coinType)
          balances[coinType] = balance
        } catch (err) {
          console.error(`${coinType} 잔액 조회 중 오류:`, err)
          // 개별 잔액 조회 실패는 전체 프로세스를 중단하지 않음
        }
      }
      
      return balances
    } catch (err: any) {
      console.error('모든 지갑 잔액 조회 중 오류:', err)
      
      // 에러 메시지 설정
      const errorMessage = err.message || '지갑 잔액 조회 중 오류가 발생했습니다.'
      setState(prev => ({ ...prev, isLoading: false, error: errorMessage }))
      
      throw err
    } finally {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  // 모의 지갑 주소 생성 함수
  const generateRandomAddress = (coinType: string): string => {
    const characters = '0123456789abcdef'
    let address = ''
    
    // 코인 타입에 따라 다른 접두사 사용
    switch (coinType) {
      case 'TRC':
        address = 'T'
        break
      case 'ERC':
        address = '0x'
        break
      case 'BEP':
        address = 'bnb'
        break
      default:
        address = '0x'
    }
    
    // 랜덤 문자열 생성
    const length = coinType === 'TRC' ? 33 : 40
    for (let i = 0; i < length; i++) {
      address += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    
    return address
  }

  return {
    createWallets,
    getWalletBalance,
    getAllWalletBalances,
    wallets: state.wallets,
    isLoading: state.isLoading,
    error: state.error
  }
}
