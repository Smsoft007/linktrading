'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaShieldAlt, FaLock, FaUserShield, FaCheckCircle } from 'react-icons/fa'

const wallets = [
  {
    name: 'MetaMask',
    icon: '/images/metamask.svg',
    description: '가장 인기있는 크립토 월렛',
    color: 'text-orange-500',
    gradient: 'from-orange-500',
    image: '/images/features/wallet-history.jpg'
  },
  {
    name: 'Trust Wallet',
    icon: '/images/trustwallet.svg',
    description: '모바일에 최적화된 월렛',
    color: 'text-blue-500',
    gradient: 'from-blue-500',
    image: '/images/features/low-fee.jpg'
  },
  {
    name: 'WalletConnect',
    icon: '/images/walletconnect.svg',
    description: '다양한 월렛 연결 지원',
    color: 'text-blue-400',
    gradient: 'from-blue-400',
    image: '/images/features/auto-payment.jpg'
  }
]

const securityFeatures = [
  {
    icon: FaShieldAlt,
    title: '엔드투엔드 암호화',
    description: '모든 거래는 완벽하게 암호화되어 처리됩니다',
    gradient: 'from-blue-500'
  },
  {
    icon: FaLock,
    title: '안전한 자산 보관',
    description: '고객의 자산은 콜드월렛에서 안전하게 보관됩니다',
    gradient: 'from-purple-500'
  },
  {
    icon: FaUserShield,
    title: '개인정보 보호',
    description: '고객의 개인정보는 철저하게 보호됩니다',
    gradient: 'from-emerald-500'
  },
  {
    icon: FaCheckCircle,
    title: '검증된 보안',
    description: '정기적인 보안 감사를 통해 시스템 안전성을 검증합니다',
    gradient: 'from-orange-500'
  }
]

export function WalletSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.1),_transparent_70%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* 왼쪽: 월렛 설명 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500"
              >
                지갑 연결
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-400"
              >
                안전하고 편리한 지갑 연결로 시작하세요
              </motion.p>
            </div>

            {/* 월렛 목록 */}
            <div className="space-y-6">
              {wallets.map((wallet, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-gray-900/50 overflow-hidden rounded-2xl backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                    {/* 배경 이미지 */}
                    <div className="absolute inset-0">
                      <Image
                        src={wallet.image}
                        alt={wallet.name}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/80"></div>
                    </div>
                    
                    <div className="relative p-6 flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Image
                          src={wallet.icon}
                          alt={wallet.name}
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {wallet.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {wallet.description}
                        </p>
                      </div>
                      <button className="ml-auto px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white text-sm font-medium transition-colors">
                        연결
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 보안 알림 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900/30 border border-gray-800/50 p-4 rounded-xl text-sm text-gray-400"
            >
              <p>
                🔒 모든 지갑 연결은 암호화되어 있으며, 당사는 개인 키에 접근할 수 없습니다.
              </p>
            </motion.div>
          </div>

          {/* 오른쪽: 보안 특징 */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-white">
                최고 수준의 보안
              </h3>
              <p className="text-gray-400">
                고객의 자산과 개인정보 보호를 위해 엄격한 보안 정책을 준수합니다
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="relative bg-gray-900/50 p-6 rounded-2xl backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                      {/* 호버 시 나타나는 그라디언트 */}
                      <div className={`absolute inset-0 bg-gradient-to-b ${feature.gradient} to-transparent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>
                      
                      <div className="relative flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center text-xl ${feature.gradient.replace('from-', 'text-')} group-hover:scale-110 transition-transform flex-shrink-0`}>
                          <Icon />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-gray-400 text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* 인증서 표시 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gray-900/30 p-6 rounded-2xl border border-gray-800/50"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h4 className="text-white font-semibold">보안 인증</h4>
                  <p className="text-sm text-gray-400">ISO 27001 & ISMS 인증</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <FaShieldAlt className="text-2xl text-emerald-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
