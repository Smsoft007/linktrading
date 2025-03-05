import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 메타마스크 확장 프로그램과의 충돌 방지
    try {
      if (typeof window !== 'undefined') {
        // ethereum 객체 안전하게 처리
        const handleEthereum = () => {
          // ethereum 속성이 이미 존재하는지 확인
          const hasEthereum = Object.getOwnPropertyDescriptor(window, 'ethereum');
          
          if (!hasEthereum) {
            // 빈 객체를 생성하여 ethereum 속성으로 설정
            const mockEthereum = {
              isMetaMask: false,
              request: () => Promise.resolve(false),
              on: () => {},
              removeListener: () => {},
              autoRefreshOnNetworkChange: false,
              chainId: null,
              selectedAddress: null,
              isConnected: () => false,
              type: 'none'
            };
            
            try {
              Object.defineProperty(window, 'ethereum', {
                value: mockEthereum,
                writable: false,
                configurable: true
              });
            } catch (e) {
              console.warn('Failed to define ethereum property:', e);
            }
          }
        };

        // 페이지 로드 시 즉시 실행
        handleEthereum();
        
        // DOMContentLoaded 이벤트 후에도 실행
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', handleEthereum);
        }
      }
    } catch (error) {
      console.error('Ethereum property handling error:', error);
    }

    // 페이지 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen flex items-center justify-center min-h-screen bg-gray-950 flex-col">
        <h1 className="text-3xl font-bold premium-gradient-text mb-4">LINK TRADING</h1>
        <div className="loading-spinner h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp; 