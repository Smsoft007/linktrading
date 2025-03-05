'use client'

import { motion } from 'framer-motion'
import { FaRobot, FaChartLine, FaShieldAlt, FaBell, FaUsers, FaGlobe } from 'react-icons/fa'

const features = [
  {
    icon: FaRobot,
    title: '자동 거래',
    description: '24/7 무중단 자동 거래로 최적의 수익을 실현하세요',
    gradient: 'from-blue-500',
    delay: 0
  },
  {
    icon: FaChartLine,
    title: '실시간 모니터링',
    description: '실시간 차트와 거래 현황을 한눈에 파악하세요',
    gradient: 'from-purple-500',
    delay: 0.1
  },
  {
    icon: FaShieldAlt,
    title: '보안 시스템',
    description: '다중 보안 시스템으로 자산을 안전하게 보호합니다',
    gradient: 'from-red-500',
    delay: 0.2
  },
  {
    icon: FaBell,
    title: '알림 서비스',
    description: '중요한 시장 변동과 거래 실행을 실시간으로 알려드립니다',
    gradient: 'from-yellow-500',
    delay: 0.3
  },
  {
    icon: FaUsers,
    title: '커뮤니티',
    description: '전문 트레이더들과 함께 투자 정보를 공유하세요',
    gradient: 'from-green-500',
    delay: 0.4
  },
  {
    icon: FaGlobe,
    title: '글로벌 거래소',
    description: '전 세계 주요 거래소와 연동하여 최적의 거래 기회를 제공합니다',
    gradient: 'from-emerald-500',
    delay: 0.5
  }
]

export function PlatformFeatures() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.1),_transparent_70%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500"
          >
            플랫폼 기능
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-400"
          >
            최첨단 기술로 구현된 강력한 자동 거래 시스템
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="group"
              >
                <div className="relative h-full bg-gray-900/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                  {/* 호버 시 나타나는 그라디언트 */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} to-transparent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>
                  
                  <div className="relative space-y-4">
                    {/* 아이콘 */}
                    <div className={`w-14 h-14 rounded-xl bg-gray-800/50 flex items-center justify-center text-2xl ${feature.gradient.replace('from-', 'text-')} group-hover:scale-110 transition-transform`}>
                      <Icon />
                    </div>

                    {/* 제목과 설명 */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* 호버 시 나타나는 화살표 */}
                    <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
