'use client'

import { motion } from 'framer-motion'
import { FaTrophy, FaRocket, FaUserShield } from 'react-icons/fa'

const highlights = [
  {
    icon: FaTrophy,
    title: '최고의 수익률',
    stats: '156%',
    description: '연간 평균 수익률',
    subStats: [
      { label: '월 평균', value: '13%' },
      { label: '최대 수익', value: '28%' }
    ],
    gradient: 'from-yellow-500',
    delay: 0
  },
  {
    icon: FaRocket,
    title: '빠른 거래 속도',
    stats: '0.05초',
    description: '평균 거래 체결 시간',
    subStats: [
      { label: '일일 거래량', value: '₩12.5M' },
      { label: '성공률', value: '99.9%' }
    ],
    gradient: 'from-blue-500',
    delay: 0.1
  },
  {
    icon: FaUserShield,
    title: '신뢰할 수 있는 보안',
    stats: '0건',
    description: '보안 사고 발생',
    subStats: [
      { label: '보안 감사', value: '매일' },
      { label: '보험 가입', value: '100%' }
    ],
    gradient: 'from-emerald-500',
    delay: 0.2
  }
]

export function PlatformHighlights() {
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
            플랫폼 하이라이트
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-400"
          >
            검증된 실적으로 증명하는 플랫폼의 우수성
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: highlight.delay }}
                className="group"
              >
                <div className="relative h-full bg-gray-900/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                  {/* 호버 시 나타나는 그라디언트 */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${highlight.gradient} to-transparent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>
                  
                  <div className="relative space-y-6">
                    {/* 아이콘과 제목 */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-xl bg-gray-800/50 flex items-center justify-center text-2xl ${highlight.gradient.replace('from-', 'text-')} group-hover:scale-110 transition-transform`}>
                        <Icon />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {highlight.title}
                      </h3>
                    </div>

                    {/* 주요 통계 */}
                    <div className="pt-4 border-t border-gray-800/50">
                      <div className="flex items-end gap-2 mb-1">
                        <span className="text-4xl font-bold text-white">
                          {highlight.stats}
                        </span>
                        <span className="text-gray-400 mb-1">
                          {highlight.description}
                        </span>
                      </div>

                      {/* 부가 통계 */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {highlight.subStats.map((stat, statIndex) => (
                          <div key={statIndex} className="bg-gray-800/30 rounded-xl p-3">
                            <div className="text-sm text-gray-400">
                              {stat.label}
                            </div>
                            <div className="text-lg font-semibold text-white">
                              {stat.value}
                            </div>
                          </div>
                        ))}
                      </div>
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
