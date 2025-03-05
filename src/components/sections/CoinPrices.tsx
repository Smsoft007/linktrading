'use client'

import { useEffect, useState } from 'react'
import { RiBitCoinFill, RiLineChartLine, RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri'

interface Coin {
  name: string
  symbol: string
  price: number
  change: number
  volume: string
  marketCap: string
}

const sampleCoins: Coin[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 68500000,
    change: 2.5,
    volume: '₩1.2조',
    marketCap: '₩1,450조'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3850000,
    change: -1.2,
    volume: '₩580억',
    marketCap: '₩450조'
  },
  {
    name: 'Binance',
    symbol: 'BNB',
    price: 420000,
    change: 0.8,
    volume: '₩120억',
    marketCap: '₩65조'
  }
]

const coins = [
  {
    name: '비트코인',
    symbol: 'BTC',
    price: '58,432,000',
    change: '+2.5',
    volume: '1,234.5'
  },
  {
    name: '이더리움',
    symbol: 'ETH',
    price: '3,421,000',
    change: '-1.2',
    volume: '892.3'
  },
  {
    name: '리플',
    symbol: 'XRP',
    price: '890',
    change: '+3.8',
    volume: '45,678.9'
  },
  {
    name: '도지코인',
    symbol: 'DOGE',
    price: '198',
    change: '+5.2',
    volume: '23,456.7'
  },
  {
    name: '카르다노',
    symbol: 'ADA',
    price: '1,230',
    change: '-0.8',
    volume: '12,345.6'
  },
  {
    name: '솔라나',
    symbol: 'SOL',
    price: '89,000',
    change: '+4.1',
    volume: '7,890.1'
  }
]

export function CoinPrices() {
  const [coinsState, setCoinsState] = useState<Coin[]>(sampleCoins)

  // TODO: Implement real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCoinsState(coinsState.map(coin => ({
        ...coin,
        price: coin.price * (1 + (Math.random() * 0.002 - 0.001)),
        change: coin.change + (Math.random() * 0.2 - 0.1)
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [coinsState])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(price)
  }

  return (
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-16">실시간 코인 시세</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coins.map((coin, index) => {
            const isPositive = coin.change.startsWith('+')
            return (
              <div key={index} className="bg-gray-900/50 p-6 rounded-2xl backdrop-blur-sm border border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{coin.name}</h3>
                    <p className="text-gray-400 text-sm">{coin.symbol}</p>
                  </div>
                  <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <RiArrowUpSFill className="text-2xl" /> : <RiArrowDownSFill className="text-2xl" />}
                    <span>{coin.change}%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-2xl font-bold text-white">₩{coin.price}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-gray-400 text-sm">거래량</span>
                      <span className="text-gray-300 text-sm ml-2">{coin.volume}</span>
                    </div>
                  </div>
                  <div className="h-16 w-24 bg-gray-800/50 rounded-lg"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
