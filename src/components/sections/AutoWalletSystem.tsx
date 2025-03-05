'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { RiMoneyDollarCircleLine, RiWallet3Line, RiRefreshLine, RiFileCopyLine } from 'react-icons/ri'

interface AutoWalletSystemProps {
  // props 정의
}

export function AutoWalletSystem({}: AutoWalletSystemProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const handleError = (error: Error) => {
    // TODO: Add toast notification
  }

  const handleSubmit = () => {
    // TODO: Implement submit logic
  }

  const copyAddress = () => {
    navigator.clipboard.writeText('0x7a2...3f9b')
    // TODO: Add toast notification
  }

  return (
    <section className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">자동 입출금 시스템</h2>
            <p className="text-gray-400">
              안전하고 빠른 자동 입출금 시스템으로 거래를 관리하세요.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">시스템 상태</span>
                <span className="text-primary">정상</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">마지막 거래</span>
                <span className="text-primary">완료됨</span>
              </div>
            </div>
            <Button
              variant="default"
              size="lg"
              className="w-full"
              onClick={handleSubmit}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
