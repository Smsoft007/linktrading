import { NextRequest, NextResponse } from 'next/server';

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

// 시장 통계 데이터 타입 정의
interface MarketStats {
  totalMarketCap: string;
  totalVolume: string;
  btcDominance: string;
  fearGreedIndex: string;
  marketCapChangePercentage: number;
  volumeChangePercentage: number;
  btcDominanceChange: number;
}

// 임시 데이터 (실제 환경에서는 외부 API 호출)
const mockData = {
  coins: [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: '/images/coins/bitcoin.svg',
      current_price: 94139.28,
      price_change_percentage_24h: 10.13,
      market_cap: 1864400332800,
      volume: 53582471809
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      image: '/images/coins/ethereum.svg',
      current_price: 2516.48,
      price_change_percentage_24h: 13.30,
      market_cap: 302336151614,
      volume: 31240134989
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'USDT',
      image: '/images/coins/tether.svg',
      current_price: 1.00,
      price_change_percentage_24h: 0.10,
      market_cap: 142445883525,
      volume: 121029093062
    },
    {
      id: 'binancecoin',
      name: 'Binance Coin',
      symbol: 'BNB',
      image: '/images/coins/binance.svg',
      current_price: 625.21,
      price_change_percentage_24h: 3.43,
      market_cap: 88990448864,
      volume: 2015933743
    },
    {
      id: 'ripple',
      name: 'XRP',
      symbol: 'XRP',
      image: '/images/coins/xrp.svg',
      current_price: 2.85,
      price_change_percentage_24h: 31.82,
      market_cap: 165714567033,
      volume: 15638272577
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      image: '/images/coins/solana.svg',
      current_price: 173.93,
      price_change_percentage_24h: 23.99,
      market_cap: 88289513042,
      volume: 10232641699
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      image: '/images/coins/cardano.svg',
      current_price: 0.45,
      price_change_percentage_24h: 5.67,
      market_cap: 16345678901,
      volume: 1234567890
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      image: '/images/coins/polkadot.svg',
      current_price: 5.09,
      price_change_percentage_24h: 7.82,
      market_cap: 7654321098,
      volume: 987654321
    }
  ],
  marketStats: {
    totalMarketCap: '$3.12T',
    totalVolume: '$157.86B',
    btcDominance: '59.6%',
    fearGreedIndex: '22/100',
    marketCapChangePercentage: 10.86,
    volumeChangePercentage: 85.76,
    btcDominanceChange: -0.60
  },
  lastUpdated: new Date().toISOString()
};

/**
 * GET 요청 처리 - 암호화폐 데이터 가져오기
 */
export async function GET(request: NextRequest) {
  try {
    // 실제 환경에서는 외부 API 호출 (예: CoinGecko, CoinMarketCap 등)
    // const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
    // const data = await response.json();
    
    // 임시 데이터 사용
    return NextResponse.json({
      status: 'success',
      ...mockData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to fetch cryptocurrency data'
    }, { status: 500 });
  }
}

/**
 * 임시 데이터 생성 함수
 */
function getMockData(): CoinData[] {
  return [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      image: '/images/coins/bitcoin.svg',
      current_price: 94139.28,
      price_change_percentage_24h: 10.13,
      market_cap: 1864400332800,
      volume: 53582471809
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      image: '/images/coins/ethereum.svg',
      current_price: 2516.48,
      price_change_percentage_24h: 13.30,
      market_cap: 302336151614,
      volume: 31240134989
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'USDT',
      image: '/images/coins/tether.svg',
      current_price: 1.00,
      price_change_percentage_24h: 0.10,
      market_cap: 142445883525,
      volume: 121029093062
    },
    {
      id: 'binancecoin',
      name: 'Binance Coin',
      symbol: 'BNB',
      image: '/images/coins/binance.svg',
      current_price: 625.21,
      price_change_percentage_24h: 3.43,
      market_cap: 88990448864,
      volume: 2015933743
    },
    {
      id: 'ripple',
      name: 'XRP',
      symbol: 'XRP',
      image: '/images/coins/xrp.svg',
      current_price: 2.85,
      price_change_percentage_24h: 31.82,
      market_cap: 165714567033,
      volume: 15638272577
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      image: '/images/coins/solana.svg',
      current_price: 173.93,
      price_change_percentage_24h: 23.99,
      market_cap: 88289513042,
      volume: 10232641699
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      image: '/images/coins/cardano.svg',
      current_price: 0.45,
      price_change_percentage_24h: 5.67,
      market_cap: 16345678901,
      volume: 1234567890
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      image: '/images/coins/polkadot.svg',
      current_price: 5.09,
      price_change_percentage_24h: 7.82,
      market_cap: 7654321098,
      volume: 987654321
    }
  ];
} 