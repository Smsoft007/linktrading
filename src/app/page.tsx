'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import Header from '@/components/layout/Header'
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react'

// 코인 데이터 타입 정의
interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume: number;
}

export default function HomePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)

  // 인증된 사용자는 메인 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/main')
    }
  }, [user, isLoading, router])

  // 코인 데이터 가져오기
  useEffect(() => {
    // 실제 API 연동 시 아래 주석을 해제하고 사용
    // const fetchCoins = async () => {
    //   try {
    //     const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1&sparkline=false&price_change_percentage=24h')
    //     const data = await response.json()
    //     setCoins(data)
    //     setLoading(false)
    //   } catch (error) {
    //     console.error('코인 데이터를 가져오는 중 오류 발생:', error)
    //     setLoading(false)
    //   }
    // }
    // fetchCoins()

    // 임시 데이터 (API 연동 전까지 사용)
    const mockData: CoinData[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        image: '/images/coins/bitcoin.svg',
        current_price: 68245.32,
        price_change_percentage_24h: 2.34,
        market_cap: 1345678901234,
        volume: 45678901234
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        image: '/images/coins/ethereum.svg',
        current_price: 3245.67,
        price_change_percentage_24h: -1.23,
        market_cap: 345678901234,
        volume: 23456789012
      },
      {
        id: 'tether',
        name: 'Tether',
        symbol: 'USDT',
        image: '/images/coins/tether.svg',
        current_price: 1.00,
        price_change_percentage_24h: 0.01,
        market_cap: 98765432123,
        volume: 76543210987
      },
      {
        id: 'binancecoin',
        name: 'Binance Coin',
        symbol: 'BNB',
        image: '/images/coins/binance.svg',
        current_price: 567.89,
        price_change_percentage_24h: 3.45,
        market_cap: 87654321098,
        volume: 5432109876
      },
      {
        id: 'ripple',
        name: 'XRP',
        symbol: 'XRP',
        image: '/images/coins/xrp.svg',
        current_price: 0.5678,
        price_change_percentage_24h: -2.34,
        market_cap: 54321098765,
        volume: 4321098765
      },
      {
        id: 'tron',
        name: 'TRON',
        symbol: 'TRX',
        image: '/images/coins/tron.svg',
        current_price: 0.1234,
        price_change_percentage_24h: 5.67,
        market_cap: 12345678901,
        volume: 1234567890
      }
    ]
    
    setTimeout(() => {
      setCoins(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  // 숫자 포맷팅 함수
  const formatNumber = (num: number, digits: number = 2) => {
    if (num < 1) return num.toFixed(4)
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(num)
  }

  // 큰 숫자 포맷팅 (예: 1.2B, 345.6M)
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col w-full">
      {/* 헤더 */}
      <Header />

      {/* 메인 섹션 */}
      <main className="flex-1 w-full pt-24 page-transition">
        {/* 히어로 섹션 */}
        <section className="py-20 px-4 w-full">
          <div className="container mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 shadow-lg hover-glow">
                <div className="absolute inset-0 bg-gray-900 rounded-full m-0.5 flex items-center justify-center">
                  <img 
                    src="/images/logo.png" 
                    alt="LINK BOT TRADING Logo" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="premium-text-gradient">
                LINK BOT TRADING
              </span>
              <br /> 
              <span className="text-white">BUSINESS</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              고빈도 알고리즘 트레이딩을 통한 안정적인 수익 창출 플랫폼에 참여하세요.
              리스크 관리 기반의 투자로 암호화 화폐 시장에서 수익을 창출합니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="premium-button h-12 px-8">
                <Link href="/login">시작하기</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-gray-500 text-gray-300 hover:bg-gray-800 h-12 px-8 hover-glow">
                <a href="#about">자세히 알아보기</a>
              </Button>
            </div>
          </div>
        </section>

        {/* 실시간 코인 정보 섹션 */}
        <section className="py-16 px-4 w-full bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">실시간 코인 시세</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              <p className="text-gray-400 mt-4 text-center max-w-2xl">
                LINK BOT TRADING이 트레이딩하는 주요 암호화폐의 실시간 시세 정보입니다.
                고빈도 알고리즘을 통해 이러한 시장 변동성에서 수익을 창출합니다.
              </p>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                      </div>
                    </div>
                    <div className="h-8 bg-gray-700 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-700 rounded w-2/5"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coins.map((coin) => (
                  <div key={coin.id} className="premium-card hover-scale p-6 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full p-2 mr-3 flex items-center justify-center shadow-md">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                          {coin.symbol === 'BTC' && (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F7931A">
                              <path d="M23.638 14.904c-1.602 6.425-8.113 10.342-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.68 8.475-1.243 14.9.364c6.43 1.603 10.342 8.116 8.738 14.54z" />
                              <path d="M17.304 10.377c.237-1.588-.974-2.44-2.638-3.013l.54-2.164-1.315-.33-.525 2.106c-.346-.087-.7-.167-1.05-.246l.53-2.12-1.32-.33-.54 2.168c-.285-.065-.565-.13-.84-.198l.005-.02-1.815-.455-.35 1.406s.975.225.955.238c.535.134.63.486.615.766l-.615 2.464c.035.01.08.024.13.045l-.13-.033-.86 3.45c-.065.158-.23.398-.6.307.015.02-.96-.24-.96-.24l-.655 1.51 1.71.427.935.234-.55 2.2 1.32.33.54-2.17c.36.1.705.19 1.05.273l-.535 2.145 1.32.33.55-2.19c2.24.427 3.93.255 4.64-1.775.57-1.637-.03-2.582-1.217-3.2.865-.198 1.517-.77 1.69-1.94zm-3.01 4.24c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.22 3.757.66 3.33 2.37zm.405-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.63c.75.187 3.17.53 2.75 2.08z" fill="#FFFFFF" />
                            </svg>
                          )}
                          {coin.symbol === 'ETH' && (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#627EEA">
                              <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003z" fillOpacity=".6" />
                              <path d="M11.943 0L4.57 12.093l7.372 4.35 7.37-4.35L11.943 0z" />
                            </svg>
                          )}
                          {coin.symbol === 'USDT' && (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#26A17B">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                              <path d="M13.803 10.469v-1.26h5.211V6.42H4.869v2.789h5.211v1.258c-4.291.148-7.518.744-7.518 1.469 0 .723 3.228 1.32 7.518 1.468v6.076h3.424v-6.076c4.29-.148 7.518-.745 7.518-1.468 0-.724-3.228-1.32-7.518-1.469l-.001.002zm0 2.54v.002c-.1.008-.635.166-1.764.166-1.026 0-1.73-.152-1.764-.166v-.002c-3.41-.123-5.947-.584-5.947-1.126 0-.541 2.537-1.002 5.947-1.125v1.783c.038.016.777.166 1.778.166.968 0 1.71-.143 1.764-.166V10.76c3.41.123 5.947.584 5.947 1.125 0 .542-2.537 1.003-5.947 1.126l-.014-.002z" fill="#FFFFFF" />
                            </svg>
                          )}
                          {coin.symbol === 'BNB' && (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#F3BA2F">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.576 14.979L7.59 12.145l-1.66 1.66 4.494 4.493 9.163-9.163-1.66-1.66-7.413 7.504zm-3.248-2.834l1.66-1.66-1.66-1.66-1.66 1.66 1.66 1.66zm9.163-1.66l-1.66-1.66-5.753 5.752 1.66 1.66 5.753-5.752z" />
                            </svg>
                          )}
                          {coin.symbol === 'XRP' && (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#23292F">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                              <path d="M17.61 7.612h1.637L14.355 12.5l4.892 4.887h-1.637L12.718 12.5l4.892-4.888zm-6.51 0h1.637L7.845 12.5l4.892 4.887H11.1L6.208 12.5l4.892-4.888zm-6.51 0h1.637L1.335 12.5l4.892 4.887H4.59L-.302 12.5l4.892-4.888z" fill="#FFFFFF" />
                            </svg>
                          )}
                          {coin.symbol === 'TRX' && (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#EF0027">
                              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" />
                              <path d="M10.59 7.463L6.4 16.536h5.043l4.189-9.073h-5.043zm1.412 7.463l-1.415-3.066 2.126-1.577-2.126-1.577 1.415-3.066 3.54 4.643-3.54 4.643z" fill="#FFFFFF" />
                            </svg>
                          )}
                          {!['BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'TRX'].includes(coin.symbol) && (
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                              {coin.symbol.substring(0, 1)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white">{coin.name}</h3>
                        <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
                      </div>
                      <div className="ml-auto">
                        {coin.price_change_percentage_24h > 0 ? (
                          <div className="flex items-center text-green-500">
                            <ArrowUp className="w-4 h-4 mr-1" />
                            <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500">
                            <ArrowDown className="w-4 h-4 mr-1" />
                            <span>{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-white">${formatNumber(coin.current_price)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <div>
                        <span className="block mb-1">시가총액</span>
                        <span className="text-white font-medium">${formatLargeNumber(coin.market_cap)}</span>
                      </div>
                      <div>
                        <span className="block mb-1">24시간 거래량</span>
                        <span className="text-white font-medium">${formatLargeNumber(coin.volume)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-center mt-10">
              <Button asChild className="premium-button">
                <Link href="/dashboard/trading" className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>트레이딩 시작하기</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 주요 특징 섹션 */}
        <section id="about" className="py-20 px-4 bg-gray-850 w-full">
          <div className="container mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">주요 특징</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="premium-card p-6 hover-scale">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">고수익 알고리즘</h3>
                <p className="text-gray-400">월 평균 30~40% 이상의 수익률을 목표로 최적화된 트레이딩 알고리즘을 활용합니다.</p>
              </div>
              
              <div className="premium-card p-6 hover-scale">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">리스크 관리</h3>
                <p className="text-gray-400">철저한 리스크 관리 시스템으로 시장 변동성에 대응하며 안정적인 수익을 추구합니다.</p>
              </div>
              
              <div className="premium-card p-6 hover-scale">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">실시간 모니터링</h3>
                <p className="text-gray-400">24시간 실시간으로 자산 상태와 트레이딩 현황을 모니터링할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 시장 동향 분석 섹션 */}
        <section className="py-20 px-4 bg-gray-900/50 backdrop-blur-sm w-full">
          <div className="container mx-auto">
            <div className="flex flex-col items-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">2024 시장 동향 분석</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              <p className="text-gray-400 mt-4 text-center max-w-2xl">
                글로벌 암호화폐 시장의 최신 동향과 전망을 분석하여 투자 전략 수립에 도움을 드립니다.
              </p>
            </div>

            {/* 시장 성장 잠재력 */}
            <div className="premium-card p-8 mb-10 hover-scale">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                      </svg>
                    </div>
                    시장 성장 잠재력
                  </h3>
                  <div className="space-y-4 text-gray-300">
                    <p>글로벌 암호화폐 시장 규모는 <span className="text-primary font-semibold">2조 달러</span>를 넘어서며 지속적인 성장세를 보이고 있습니다.</p>
                    <p>주요 성장 동력:</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li>기관 투자자들의 활발한 시장 참여</li>
                      <li>BlackRock, Fidelity 등 주요 금융 기업들의 암호화폐 투자 확대</li>
                      <li>규제 환경의 점진적 개선</li>
                      <li>디지털 자산에 대한 대중적 인식 향상</li>
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/2 bg-gray-800/50 rounded-xl p-6 flex items-center justify-center">
                  <div className="w-full h-64 relative">
                    {/* 시장 성장 차트 (SVG로 구현) */}
                    <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
                      {/* 그리드 라인 */}
                      <line x1="50" y1="20" x2="50" y2="180" stroke="#2D3748" strokeWidth="1" />
                      <line x1="50" y1="180" x2="380" y2="180" stroke="#2D3748" strokeWidth="1" />
                      
                      {/* Y축 레이블 */}
                      <text x="10" y="30" fill="#A0AEC0" fontSize="12">2.5T</text>
                      <text x="10" y="80" fill="#A0AEC0" fontSize="12">2.0T</text>
                      <text x="10" y="130" fill="#A0AEC0" fontSize="12">1.5T</text>
                      <text x="10" y="180" fill="#A0AEC0" fontSize="12">1.0T</text>
                      
                      {/* X축 레이블 */}
                      <text x="50" y="195" fill="#A0AEC0" fontSize="12">2020</text>
                      <text x="140" y="195" fill="#A0AEC0" fontSize="12">2021</text>
                      <text x="230" y="195" fill="#A0AEC0" fontSize="12">2022</text>
                      <text x="320" y="195" fill="#A0AEC0" fontSize="12">2023</text>
                      
                      {/* 데이터 라인 */}
                      <path 
                        d="M50,160 L140,100 L230,140 L320,80" 
                        fill="none" 
                        stroke="url(#marketGrowthGradient)" 
                        strokeWidth="3"
                      />
                      
                      {/* 데이터 포인트 */}
                      <circle cx="50" cy="160" r="5" fill="#4F46E5" />
                      <circle cx="140" cy="100" r="5" fill="#4F46E5" />
                      <circle cx="230" cy="140" r="5" fill="#4F46E5" />
                      <circle cx="320" cy="80" r="5" fill="#4F46E5" />
                      
                      {/* 그라데이션 정의 */}
                      <defs>
                        <linearGradient id="marketGrowthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4F46E5" />
                          <stop offset="100%" stopColor="#06B6D4" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {/* 영역 채우기 */}
                      <path 
                        d="M50,160 L140,100 L230,140 L320,80 L320,180 L230,180 L140,180 L50,180 Z" 
                        fill="url(#areaGradient)" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 경쟁 분석 및 시장 기회 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="premium-card p-8 hover-scale">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"/>
                      <path d="M15 7h6v6"/>
                    </svg>
                  </div>
                  경쟁 분석
                </h3>
                <div className="space-y-4 text-gray-300">
                  <p>LINK BOT TRADING과 기존 트레이딩 기업 비교:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 text-gray-400">구분</th>
                          <th className="text-left py-3 text-primary">LINK BOT TRADING</th>
                          <th className="text-left py-3 text-gray-400">기존 트레이딩 기업</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 text-gray-400">자본 규모</td>
                          <td>중소형</td>
                          <td>대형</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 text-gray-400">트레이딩 전략</td>
                          <td>고빈도 알고리즘 특화</td>
                          <td>다양한 전략 혼합</td>
                        </tr>
                        <tr className="border-b border-gray-800">
                          <td className="py-3 text-gray-400">운영 방식</td>
                          <td>효율적 자동화 시스템</td>
                          <td>대규모 인력 운영</td>
                        </tr>
                        <tr>
                          <td className="py-3 text-gray-400">수익률</td>
                          <td className="text-green-500">월 30~40% 목표</td>
                          <td>월 5~15% 평균</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="premium-card p-8 hover-scale">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  시장 기회 및 전망
                </h3>
                <div className="space-y-4 text-gray-300">
                  <p>2024년 암호화폐 시장은 다음과 같은 기회와 도전에 직면해 있습니다:</p>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-2">성장 기회</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li>기관의 암호화폐 채택 확대</li>
                      <li>스테이블코인(USDT) 시장의 성장</li>
                      <li>디지털 자산 금융 상품의 다양화</li>
                      <li>전통 금융의 암호화폐 수용 증가</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-2">도전 요소</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-400">
                      <li>규제 불확실성</li>
                      <li>시장 변동성</li>
                      <li>기술적 취약점</li>
                      <li>경쟁 심화</li>
                    </ul>
                  </div>
                  <p className="text-sm italic text-gray-400">
                    * 빠르게 성장하는 시장에서 차별화된 전략이 필수적입니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 시장 트렌드 */}
            <div className="premium-card p-8 hover-scale">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
                주요 시장 트렌드
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h4 className="text-lg font-semibold text-white mb-3">스테이블코인 성장</h4>
                  <p className="text-gray-400 mb-4">USDT를 중심으로 한 스테이블코인 시장이 급성장하며 거래 및 결제 수단으로 자리매김</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">시장 점유율</span>
                    <span className="text-sm text-white">32%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '32%'}}></div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h4 className="text-lg font-semibold text-white mb-3">디지털 자산 금융상품</h4>
                  <p className="text-gray-400 mb-4">ETF, 선물, 옵션 등 다양한 금융상품의 등장으로 투자 방식 다양화</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">성장률</span>
                    <span className="text-sm text-white">+45%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-6 border-l-4 border-green-500">
                  <h4 className="text-lg font-semibold text-white mb-3">전통 금융의 수용</h4>
                  <p className="text-gray-400 mb-4">은행, 결제 서비스 등 전통 금융 기관의 암호화폐 수용 확대</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">채택률</span>
                    <span className="text-sm text-white">+28%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '28%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-300 mb-6">
                LINK BOT TRADING은 이러한 시장 동향을 면밀히 분석하여 최적의 트레이딩 전략을 구사합니다.
              </p>
              <Button asChild className="premium-button">
                <Link href="/docs/market-analysis" className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  <span>상세 시장 분석 보고서</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-16 px-4 premium-gradient w-full">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">지금 바로 시작하세요</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              LINK BOT TRADING BUSINESS와 함께 안정적인 수익을 창출하세요.
            </p>
            <Button size="lg" asChild className="bg-white text-indigo-900 hover:bg-gray-100 h-12 px-8 hover-glow">
              <Link href="/register">회원가입하기</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-900 py-12 px-4 w-full">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start">
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 shadow-md mr-3">
                  <div className="absolute inset-0 bg-gray-900 rounded-full m-0.5 flex items-center justify-center">
                    <img 
                      src="/images/logo.png" 
                      alt="LINK BOT TRADING Logo" 
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                </div>
                <span className="text-white font-semibold">LINK BOT TRADING</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 text-center md:text-left">
                © {new Date().getFullYear()} LINK BOT TRADING BUSINESS. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">이용약관</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">개인정보처리방침</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">고객지원</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 