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

/**
 * POST 요청 처리 - DB에 암호화폐 데이터 저장
 */
export async function POST(request: NextRequest) {
  try {
    // 요청 본문에서 데이터 추출
    const data = await request.json();
    
    // 데이터 유효성 검사
    if (!data || !data.coins || !Array.isArray(data.coins) || !data.marketStats) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Invalid data format' 
        }, 
        { status: 400 }
      );
    }
    
    // 여기에 DB 저장 로직을 구현합니다.
    // 예시:
    // const result = await saveToDatabase(data);
    
    // 실제 DB 연동 코드 대신 성공 응답 반환
    console.log('데이터가 DB에 저장되었습니다:', {
      coinsCount: data.coins.length,
      marketStats: data.marketStats,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json({
      status: 'success',
      message: 'Data successfully saved to database',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving data to database:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to save data to database',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

/**
 * GET 요청 처리 - DB에서 암호화폐 데이터 가져오기
 */
export async function GET() {
  try {
    // 여기에 DB에서 데이터를 가져오는 로직을 구현합니다.
    // 예시:
    // const data = await getFromDatabase();
    
    // 실제 DB 연동 코드 대신 임시 데이터 반환
    return NextResponse.json({
      coins: getMockData(),
      marketStats: {
        totalMarketCap: '$3.12T',
        totalVolume: '$157.86B',
        btcDominance: '59.6%',
        fearGreedIndex: '22/100',
        marketCapChangePercentage: 10.86,
        volumeChangePercentage: 85.76,
        btcDominanceChange: -0.60
      },
      lastUpdated: new Date().toISOString(),
      status: 'success',
      message: 'Data successfully retrieved from database'
    });
  } catch (error) {
    console.error('Error retrieving data from database:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to retrieve data from database',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
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