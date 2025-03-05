'use client'

import { motion } from 'framer-motion'
import { FaBitcoin, FaEthereum } from 'react-icons/fa'
import { SiDogecoin } from 'react-icons/si'
import { useCoinPrices } from '@/hooks/useCoinPrices'

const coinIcons = {
  bitcoin: {
    icon: FaBitcoin,
    gradient: 'from-orange-500',
    name: '비트코인'
  },
  ethereum: {
    icon: FaEthereum,
    gradient: 'from-blue-500',
    name: '이더리움'
  },
  dogecoin: {
    icon: SiDogecoin,
    gradient: 'from-yellow-500',
    name: '도지코인'
  },
  tron: {
    icon: () => <img src="/images/coins/tron.svg" alt="Tron" />,
    gradient: 'from-purple-500',
    name: '트론'
  }
}

export function LiveCoinPrices() {
  const { coins, loading, error } = useCoinPrices()

  const formatNumber = (num: number, decimals: number = 2) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(decimals) + 'B'
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(decimals) + 'M'
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(decimals) + 'K'
    }
    return num.toFixed(decimals)
  }

  if (error) {
    return (
      <div className="py-24 text-center text-red-500">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    )
  }

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
            실시간 시세
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-xl text-gray-400"
          >
            주요 암호화폐의 실시간 가격 정보를 확인하세요
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            // 로딩 상태 표시
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-900/50 p-6 rounded-2xl animate-pulse"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-800 rounded w-20 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-12"></div>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            coins.map((coin) => {
              const coinConfig = coinIcons[coin.id as keyof typeof coinIcons]
              const Icon = coinConfig.icon
              const isPositive = coin.price_change_percentage_24h >= 0

              return (
                <motion.div
                  key={coin.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <div className="relative h-full bg-gray-900/50 p-6 rounded-2xl backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
                    {/* 호버 시 나타나는 그라디언트 */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${coinConfig.gradient} to-transparent opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>
                    
                    <div className="relative space-y-4">
                      {/* 코인 정보 헤더 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-2xl ${coinConfig.gradient.replace('from-', 'text-')} group-hover:scale-110 transition-transform`}>
                            <Icon />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{coinConfig.name}</h3>
                            <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-lg text-sm ${isPositive ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                          {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                        </div>
                      </div>

                      {/* 가격 정보 */}
                      <div className="pt-4 border-t border-gray-800/50">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">현재 가격</span>
                          <span className="text-white font-semibold">
                            ${coin.current_price < 0.01 ? coin.current_price.toFixed(6) : coin.current_price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">거래량 24H</span>
                          <span className="text-gray-300">${formatNumber(coin.total_volume)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">시가총액</span>
                          <span className="text-gray-300">${formatNumber(coin.market_cap)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
