'use client';

import React, { useEffect, useState } from 'react';
import { FaRobot, FaCalendarAlt, FaArrowRight, FaShieldAlt, FaBitcoin, FaEthereum } from 'react-icons/fa';
import { RiExchangeDollarFill } from 'react-icons/ri';
import { SiBinance, SiDogecoin } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Link from 'next/link';
import StarryBackground from '@/components/effects/StarryBackground';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 페이지 로드 후 애니메이션 효과를 위해 상태 변경
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <StarryBackground starCount={150} speed={0.03} />
      <Header transparent />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-blue-900/30 bg-cover bg-center"></div>
        </div>
        
        {/* 빛나는 원형 효과 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl z-0 animate-pulse"></div>
        
        <div 
          className={`relative z-10 max-w-5xl mx-auto text-center transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">LINK BOT</span> TRADING BUSINESS
          </h1>
          <p className="max-w-3xl mx-auto mb-10 text-xl text-gray-300">
            고빈도 알고리즘 트레이딩을 통한 리스크 관리 기반의 암호화폐 투자 플랫폼
          </p>
          <div 
            className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-300 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Button 
              className="px-8 py-4 text-lg font-medium transition-all bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-md shadow-lg hover:shadow-blue-500/20"
              asChild
            >
              <Link href="/agreement">투자 시작하기</Link>
            </Button>
            <Button 
              className="px-8 py-4 text-lg font-medium transition-all bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-md shadow-lg hover:shadow-purple-500/20"
              asChild
            >
              <Link href="/rewards">리워드 플랜</Link>
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-4 text-lg font-medium transition-all border border-blue-400 rounded-md text-blue-400 hover:bg-blue-900/20 backdrop-blur-sm"
            >
              서비스 둘러보기
            </Button>
          </div>
        </div>
      </section>

      {/* Live Market Data */}
      <section className="py-12 bg-gray-900/80">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
            <h2 className="mb-4 text-3xl font-bold md:mb-0">
              실시간 <span className="text-blue-400">시세 정보</span>
            </h2>
            <div className="flex items-center">
              <div className="px-4 py-2 mr-2 text-sm font-medium text-green-400 bg-green-400/10 rounded-md">
                시장 상태: 활발
              </div>
              <Button 
                variant="outline"
                className="px-4 py-2 text-sm font-medium transition-all border rounded-md border-blue-400 text-blue-400 hover:bg-blue-900/20"
              >
                전체 시장 보기
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Bitcoin */}
            <Card className="p-4 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardContent className="p-0">
                <div className="flex items-center mb-3">
                  <FaBitcoin className="w-8 h-8 mr-3 text-yellow-500" />
                  <div>
                    <h3 className="font-semibold">Bitcoin</h3>
                    <p className="text-xs text-gray-400">BTC/USDT</p>
                  </div>
                  <div className="px-2 py-1 ml-auto text-xs font-medium text-green-400 bg-green-400/10 rounded">+2.4%</div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">$61,247.35</p>
                  <div className="text-xs text-gray-400">24h Vol: $32.8B</div>
                </div>
              </CardContent>
            </Card>
            
            {/* Ethereum */}
            <Card className="p-4 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardContent className="p-0">
                <div className="flex items-center mb-3">
                  <FaEthereum className="w-8 h-8 mr-3 text-purple-400" />
                  <div>
                    <h3 className="font-semibold">Ethereum</h3>
                    <p className="text-xs text-gray-400">ETH/USDT</p>
                  </div>
                  <div className="px-2 py-1 ml-auto text-xs font-medium text-green-400 bg-green-400/10 rounded">+3.1%</div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">$3,412.67</p>
                  <div className="text-xs text-gray-400">24h Vol: $18.2B</div>
                </div>
              </CardContent>
            </Card>
            
            {/* Binance Coin */}
            <Card className="p-4 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardContent className="p-0">
                <div className="flex items-center mb-3">
                  <SiBinance className="w-8 h-8 mr-3 text-yellow-400" />
                  <div>
                    <h3 className="font-semibold">Binance Coin</h3>
                    <p className="text-xs text-gray-400">BNB/USDT</p>
                  </div>
                  <div className="px-2 py-1 ml-auto text-xs font-medium text-red-400 bg-red-400/10 rounded">-0.8%</div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">$527.93</p>
                  <div className="text-xs text-gray-400">24h Vol: $5.4B</div>
                </div>
              </CardContent>
            </Card>
            
            {/* Dogecoin */}
            <Card className="p-4 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardContent className="p-0">
                <div className="flex items-center mb-3">
                  <SiDogecoin className="w-8 h-8 mr-3 text-yellow-300" />
                  <div>
                    <h3 className="font-semibold">Dogecoin</h3>
                    <p className="text-xs text-gray-400">DOGE/USDT</p>
                  </div>
                  <div className="px-2 py-1 ml-auto text-xs font-medium text-green-400 bg-green-400/10 rounded">+5.2%</div>
                </div>
                <div className="flex items-end justify-between">
                  <p className="text-2xl font-bold">$0.1342</p>
                  <div className="text-xs text-gray-400">24h Vol: $2.1B</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline"
              className="flex items-center px-6 py-3 font-medium transition-all border rounded-md border-blue-400 text-blue-400 hover:bg-blue-900/20"
            >
              실시간 거래 시작하기
              <FaArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center">
            <span className="text-blue-400">LINK BOT</span>의 핵심 가치
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="p-6 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardContent className="p-0">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-600/20">
                  <FaRobot className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">고빈도 알고리즘 트레이딩</h3>
                <p className="text-gray-400">
                  최첨단 알고리즘을 활용한 자동화된 트레이딩 시스템으로 24시간 시장 모니터링 및 거래 실행
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardContent className="p-0">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-600/20">
                  <FaShieldAlt className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">리스크 관리 시스템</h3>
                <p className="text-gray-400">
                  포트폴리오 다각화 및 자동 손절/익절 설정으로 투자 리스크 최소화
                </p>
              </CardContent>
            </Card>
            <Card className="p-6 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardContent className="p-0">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-600/20">
                  <RiExchangeDollarFill className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">높은 수익률</h3>
                <p className="text-gray-400">
                  월평균 30% ~ 40% 이상의 목표 수익률로 안정적인 투자 성과 제공
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Model */}
      <section className="py-20">
        <div className="max-w-6xl px-4 mx-auto">
          <h2 className="mb-16 text-4xl font-bold text-center">
            투자 모델 및 수익 구조
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="p-8 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-2xl font-semibold text-blue-400">주요 수익원</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 mr-3 text-blue-400">•</span>
                    <span>거래차익 - 암호화폐 시장의 가격 변동성을 활용한 트레이딩 수익</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 mr-3 text-blue-400">•</span>
                    <span>운용 수수료 - 투자 자본에 대한 관리 수수료</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 mr-3 text-blue-400">•</span>
                    <span>성과 보수 - 목표 수익 달성 시 추가 보상</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 mr-3 text-blue-400">•</span>
                    <span>재투자 및 고수익 아이템 사업 투자</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="p-8 transition-all rounded-lg bg-gray-800/80 hover:bg-gray-700/80">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-2xl font-semibold text-blue-400">예상 수익 시뮬레이션</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-4">
                  <div className="p-4 rounded-md bg-gray-700/50">
                    <p className="mb-2 font-semibold">보수적 시나리오</p>
                    <p className="text-gray-300">월 15-20% 수익률</p>
                  </div>
                  <div className="p-4 rounded-md bg-gray-700/50">
                    <p className="mb-2 font-semibold">중간적 시나리오</p>
                    <p className="text-gray-300">월 20-30% 수익률</p>
                  </div>
                  <div className="p-4 rounded-md bg-gray-700/50">
                    <p className="mb-2 font-semibold">공격적 시나리오</p>
                    <p className="text-gray-300">월 30-40% 이상 수익률</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-900/30">
        <div className="max-w-4xl px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold">
            지금 LINK BOT과 함께 시작하세요
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-300">
            안정적인 수익 창출과 지속 가능한 성장을 위한 최적의 암호화폐 투자 솔루션
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="px-8 py-4 text-lg font-medium transition-all bg-blue-600 rounded-md hover:bg-blue-700"
              asChild
            >
              <Link href="/agreement">계정 만들기</Link>
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-4 text-lg font-medium transition-all border border-blue-400 rounded-md text-blue-400 hover:bg-blue-900/20"
              asChild
            >
              <Link href="/login">로그인</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">
                <span className="text-blue-400">LINK BOT</span> TRADING
              </h2>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="/about" className="text-gray-400 hover:text-white">회사 소개</a>
              <a href="/terms" className="text-gray-400 hover:text-white">이용약관</a>
              <a href="/privacy" className="text-gray-400 hover:text-white">개인정보처리방침</a>
              <a href="/contact" className="text-gray-400 hover:text-white">문의하기</a>
            </div>
          </div>
          <div className="pt-8 mt-8 text-center text-gray-500 border-t border-gray-800">
            <p>© {new Date().getFullYear()} LINK BOT TRADING BUSINESS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 