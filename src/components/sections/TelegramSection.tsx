'use client'

import { motion } from 'framer-motion'
import { FaTelegram, FaBell, FaUsers, FaChartLine, FaComments } from 'react-icons/fa'
import Image from 'next/image'

const benefits = [
  {
    icon: FaBell,
    title: '실시간 알림',
    description: '중요한 시장 변동과 거래 기회를 실시간으로 알려드립니다',
    gradient: 'from-blue-500',
    image: '/images/features/telegram-notification.jpg'
  },
  {
    icon: FaUsers,
    title: '전문가 커뮤니티',
    description: '경험 많은 트레이더들과 함께 투자 정보를 공유하세요',
    gradient: 'from-purple-500',
    image: '/images/features/auto-coin-generation.jpg'
  },
  {
    icon: FaChartLine,
    title: '시장 분석',
    description: '전문 애널리스트의 심층적인 시장 분석을 받아보세요',
    gradient: 'from-emerald-500',
    image: '/images/features/ai-calculation.jpg'
  },
  {
    icon: FaComments,
    title: '1:1 상담',
    description: '전담 매니저가 여러분의 투자를 지원합니다',
    gradient: 'from-orange-500',
    image: '/images/features/auto-payment.jpg'
  }
]

const stats = [
  {
    value: '15K+',
    label: '활성 회원',
    gradient: 'from-blue-500'
  },
  {
    value: '24/7',
    label: '실시간 지원',
    gradient: 'from-purple-500'
  },
  {
    value: '3년+',
    label: '운영 기간',
    gradient: 'from-emerald-500'
  }
]

export function TelegramSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.1),_transparent_70%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 왼쪽: 텔레그램 소개 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500"
              >
                텔레그램 커뮤니티
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-400"
              >
                전문가들과 함께하는 프리미엄 투자 커뮤니티에 참여하세요
              </motion.p>
            </div>

            {/* 통계 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-3 gap-4"
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 p-4 rounded-2xl backdrop-blur-sm text-center"
                >
                  <div className={`text-2xl font-bold ${stat.gradient.replace('from-', 'text-')}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* 가입 버튼 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => window.open('https://t.me/autousdt', '_blank')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors group"
              >
                <FaTelegram className="text-xl group-hover:scale-110 transition-transform" />
                텔레그램 참여하기
              </button>
              <button className="flex-1 px-6 py-4 rounded-xl border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-semibold transition-colors">
                더 알아보기
              </button>
            </motion.div>
          </div>

          {/* 오른쪽: 혜택 설명 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full bg-gray-900/50 overflow-hidden rounded-2xl backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                    {/* 배경 이미지 */}
                    <div className="absolute inset-0">
                      <Image
                        src={benefit.image}
                        alt={benefit.title}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/90"></div>
                    </div>
                    
                    <div className="relative p-6 space-y-4">
                      <div className={`w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center text-xl ${benefit.gradient.replace('from-', 'text-')} group-hover:scale-110 transition-transform`}>
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
