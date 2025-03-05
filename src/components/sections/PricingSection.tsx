'use client'

import { motion } from 'framer-motion'
import { FaCheck, FaStar } from 'react-icons/fa'

const plans = [
  {
    name: '베이직',
    description: '개인 트레이더를 위한 기본 플랜',
    price: '100,000',
    period: '월',
    features: [
      '실시간 시세 확인',
      '기본 자동 거래 기능',
      '텔레그램 알림',
      '일일 거래 리포트',
      '이메일 지원'
    ],
    gradient: 'from-blue-500',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
    delay: 0
  },
  {
    name: '프로',
    description: '전문 트레이더를 위한 프리미엄 플랜',
    price: '300,000',
    period: '월',
    features: [
      '실시간 시세 확인',
      '고급 자동 거래 기능',
      '텔레그램 알림',
      '실시간 거래 리포트',
      '우선 순위 지원',
      '커스텀 거래 전략',
      'API 액세스',
      '전용 매니저'
    ],
    gradient: 'from-purple-500',
    buttonClass: 'bg-purple-600 hover:bg-purple-700',
    popular: true,
    delay: 0.1
  },
  {
    name: '엔터프라이즈',
    description: '기관 투자자를 위한 맞춤형 플랜',
    price: '문의',
    period: '',
    features: [
      '실시간 시세 확인',
      '맞춤형 자동 거래 기능',
      '텔레그램 알림',
      '실시간 거래 리포트',
      'VIP 지원',
      '맞춤형 거래 전략',
      '전용 API',
      '전담 매니저',
      '보안 감사',
      'SLA 보장'
    ],
    gradient: 'from-emerald-500',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
    delay: 0.2
  }
]

export function PricingSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 -z-10">
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
            가격 정책
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-400"
          >
            당신의 트레이딩 스타일에 맞는 최적의 플랜을 선택하세요
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: plan.delay }}
              className={`group relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center z-10">
                  <div className="px-4 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                    <FaStar className="text-yellow-300" />
                    인기 플랜
                  </div>
                </div>
              )}

              <div className={`relative h-full bg-gray-900/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 ${plan.popular ? 'border-2 border-purple-500/30 shadow-lg shadow-purple-500/10' : ''}`}>
                {/* 호버 시 나타나는 그라디언트 */}
                <div className={`absolute inset-0 bg-gradient-to-b ${plan.gradient} to-transparent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>
                
                <div className="relative space-y-6">
                  {/* 플랜 헤더 */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400">{plan.description}</p>
                  </div>

                  {/* 가격 */}
                  <div className="pt-6 border-t border-gray-800/50">
                    <div className="flex items-end gap-1 mb-1">
                      {plan.price === '문의' ? (
                        <span className="text-3xl font-bold text-white">문의</span>
                      ) : (
                        <>
                          <span className="text-lg text-gray-400">₩</span>
                          <span className="text-4xl font-bold text-white">{plan.price}</span>
                          <span className="text-gray-400 mb-1">/{plan.period}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 기능 목록 */}
                  <ul className="space-y-4 pt-6 border-t border-gray-800/50">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`mt-1 w-5 h-5 rounded-full ${plan.gradient.replace('from-', 'bg-')} flex items-center justify-center flex-shrink-0`}>
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 버튼 */}
                  <button
                    className={`w-full py-4 px-6 rounded-xl text-white font-semibold transition-all ${plan.buttonClass} hover:scale-105 mt-8`}
                  >
                    시작하기
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 하단 문구 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 text-gray-400"
        >
          모든 플랜은 14일 무료 체험 기간이 제공됩니다. 신용카드 정보가 필요하지 않습니다.
        </motion.p>
      </div>
    </section>
  )
}
