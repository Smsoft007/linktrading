'use client'

import { FaUserCircle, FaUser, FaChartLine, FaSignOutAlt, FaClock, FaShieldAlt } from 'react-icons/fa'
import { MdAccountBalanceWallet } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useWallet } from '@/hooks/useWallet'
import { useState } from 'react'
import { LoginModal } from '@/components/auth/LoginModal'
import { useAuth } from '@/hooks/useAuth'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Hero() {
  const { account, isConnecting, connectWallet } = useWallet()
  const { user, logout } = useAuth()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleConnect = () => {
    connectWallet()
  }

  const handleRegister = () => {
    window.open('https://t.me/your_bot_username', '_blank')
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="initial"
            animate="animate"
            className="text-center space-y-8"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl font-bold"
            >
              신뢰할 수 있는{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                자동 코인 제작
              </span>
              <br />
              <span className="text-3xl sm:text-4xl mt-4 block text-gray-300">
                USDT 자동 입출금 서비스
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              자체 개발한 스마트 컨트랙트로 안전하고 빠른 코인 제작이 가능합니다.
              <br />
              24시간 자동화된 시스템으로 즉시 입출금을 지원합니다.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full ring-2 ring-white/20" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="group px-8 py-4 bg-red-500/80 hover:bg-red-600/80 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 backdrop-blur-lg"
                  >
                    <FaSignOutAlt className="text-xl" />
                    <span>로그아웃</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 backdrop-blur-lg border border-white/20"
                >
                  <FaUser className="text-xl group-hover:rotate-12 transition-transform" />
                  <span>코인 제작 시작하기</span>
                </button>
              )}

              <button
                onClick={handleRegister}
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500/80 to-blue-500/80 hover:from-emerald-600/80 hover:to-blue-600/80 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 backdrop-blur-lg"
              >
                <FaChartLine className="text-xl group-hover:rotate-12 transition-transform" />
                <span>제작 신청하기</span>
              </button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-8 pt-12"
            >
              <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl backdrop-blur-lg">
                <FaShieldAlt className="text-xl text-emerald-400" />
                <span>스마트 컨트랙트</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl backdrop-blur-lg">
                <FaChartLine className="text-xl text-blue-400" />
                <span>자동 코인 생성</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl backdrop-blur-lg">
                <FaClock className="text-xl text-purple-400" />
                <span>24/7 자동화</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </section>
  )
}