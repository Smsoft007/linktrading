'use client'

import { useState, useEffect } from 'react'

export interface CoinData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  total_volume: number
  market_cap: number
  last_updated: string
}

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws'

export function useCoinPrices() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const COIN_IDS = [
    'bitcoin',
    'ethereum',
    'dogecoin',
    'tron'
  ]

  const SYMBOL_MAP = {
    'bitcoin': 'BTCUSDT',
    'ethereum': 'ETHUSDT',
    'dogecoin': 'DOGEUSDT',
    'tron': 'TRXUSDT'
  }

  // CoinGecko API로 초기 데이터 가져오기
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(',')}&order=market_cap_desc&sparkline=false`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch coin data')
        }

        const data = await response.json()
        setCoins(data)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  // Binance WebSocket으로 실시간 가격 업데이트
  useEffect(() => {
    if (coins.length === 0) return

    const symbols = Object.values(SYMBOL_MAP)
    const ws = new WebSocket(BINANCE_WS_URL)

    ws.onopen = () => {
      // 모든 심볼에 대한 구독 메시지 생성
      const subscribeMsg = {
        method: 'SUBSCRIBE',
        params: symbols.map(symbol => `${symbol.toLowerCase()}@ticker`),
        id: 1
      }
      ws.send(JSON.stringify(subscribeMsg))
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.e === '24hrTicker') {
        const symbol = data.s
        const price = parseFloat(data.c)
        const priceChange = parseFloat(data.P)
        const volume = parseFloat(data.v) * price // Convert volume to USD

        setCoins(prevCoins => 
          prevCoins.map(coin => {
            const coinSymbol = SYMBOL_MAP[coin.id as keyof typeof SYMBOL_MAP]
            if (coinSymbol === symbol) {
              return {
                ...coin,
                current_price: price,
                price_change_percentage_24h: priceChange,
                total_volume: volume,
                last_updated: new Date().toISOString()
              }
            }
            return coin
          })
        )
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setError('실시간 가격 업데이트 중 오류가 발생했습니다')
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        const unsubscribeMsg = {
          method: 'UNSUBSCRIBE',
          params: symbols.map(symbol => `${symbol.toLowerCase()}@ticker`),
          id: 1
        }
        ws.send(JSON.stringify(unsubscribeMsg))
        ws.close()
      }
    }
  }, [coins.length])

  return {
    coins,
    loading,
    error
  }
}
