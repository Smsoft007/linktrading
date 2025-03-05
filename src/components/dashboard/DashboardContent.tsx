'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  RiVipCrownLine, 
  RiCoinLine, 
  RiGroupLine, 
  RiTeamLine,
  RiWallet3Line,
  RiLockLine,
  RiPieChartLine,
  RiCalendarCheckLine,
  RiCalendarLine,
  RiFundsLine,
  RiGiftLine,
  RiDownloadLine,
  RiRefreshLine
} from 'react-icons/ri'
import { useEffect, useRef } from 'react'

// 차트 라이브러리 타입 정의
declare global {
  interface Window {
    echarts: any
  }
}

export function DashboardContent() {
  const chartRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined' && window.echarts && chartRef.current) {
      const chart = window.echarts.init(chartRef.current)
      
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderColor: '#e5e7eb',
          borderWidth: 1,
          textStyle: {
            color: '#1f2937'
          }
        },
        legend: {
          data: ['복지보너스', '구인보너스', '후원보너스', '후원매칭보너스', '직급수당'],
          bottom: 0
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '복지보너스',
            type: 'bar',
            data: [2000000, 1500000, 1000000, 500000, 400000, 300000],
            itemStyle: {
              color: 'rgba(87, 181, 231, 1)'
            }
          },
          {
            name: '구인보너스',
            type: 'bar',
            data: [500000, 1000000, 3000000, 800000, 600000, 400000],
            itemStyle: {
              color: 'rgba(141, 211, 199, 1)'
            }
          },
          {
            name: '후원보너스',
            type: 'bar',
            data: [4000000, 5000000, 6000000, 2000000, 1000000, 500000],
            itemStyle: {
              color: 'rgba(251, 191, 114, 1)'
            }
          },
          {
            name: '후원매칭보너스',
            type: 'bar',
            data: [1000000, 1500000, 4500000, 1500000, 800000, 400000],
            itemStyle: {
              color: 'rgba(252, 141, 98, 1)'
            }
          },
          {
            name: '직급수당',
            type: 'bar',
            data: [1500000, 3500000, 1500000, 1800000, 900000, 300000],
            itemStyle: {
              color: 'rgba(166, 216, 84, 1)'
            }
          }
        ]
      }
      
      chart.setOption(option)
      
      const handleResize = () => {
        chart.resize()
      }
      
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize)
        chart.dispose()
      }
    }
  }, [])
  
  return (
    <div>
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500">나의 직급</p>
                <h3 className="text-3xl font-semibold mt-2">SILVER</h3>
                <p className="text-sm text-gray-500 mt-1">승급까지 30일 남음</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-teal-50 rounded-lg">
                <RiVipCrownLine className="text-primary text-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500">나의 PV</p>
                <h3 className="text-3xl font-semibold mt-2">836</h3>
                <p className="text-sm text-gray-500 mt-1">이번 달 누적</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-amber-50 rounded-lg">
                <RiCoinLine className="text-amber-500 text-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500">나의 GV</p>
                <h3 className="text-3xl font-semibold mt-2">1,475</h3>
                <p className="text-sm text-gray-500 mt-1">이번 달 누적</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-green-50 rounded-lg">
                <RiGroupLine className="text-green-500 text-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500">추천인원</p>
                <h3 className="text-3xl font-semibold mt-2">189</h3>
                <p className="text-sm text-gray-500 mt-1">총 인원</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
                <RiTeamLine className="text-blue-500 text-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 자산 개요 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <RiWallet3Line className="text-gray-400" />
                <span className="text-gray-500">총 자산</span>
              </div>
              <div className="text-2xl font-bold mb-1">22,020,193 KRW</div>
              <div className="text-sm text-gray-500">현재 보유하고 있는 자산의 총합입니다. (스테이킹 포함)</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <RiLockLine className="text-gray-400" />
                <span className="text-gray-500">스테이킹</span>
              </div>
              <div className="text-2xl font-bold mb-1">90,965.8162</div>
              <div className="text-sm text-gray-500">현재 스테이킹 중인 PosCoin의 수량입니다.</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <RiLockLine className="text-gray-400" />
                <span className="text-gray-500">언스테이킹</span>
              </div>
              <div className="text-2xl font-bold mb-1">457.1146</div>
              <div className="text-sm text-gray-500">금일 언스테이킹 된 PosCoin 수량입니다.</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 스테이킹 진행률 */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <RiPieChartLine className="text-gray-400" />
            <span className="text-gray-500">보상 진행률</span>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block text-gray-600">
                  보상 순환률
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-gray-600">
                  13%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <div style={{ width: '13%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>5,805,000 / 44,800,000</span>
              <span>목표: 400%</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 보상 상세 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <RiCalendarCheckLine className="text-gray-400" />
              <span className="text-gray-500">누적 보상</span>
            </div>
            <div className="text-2xl font-bold mb-1">5,805,000</div>
            <div className="text-sm text-gray-500">현재까지 받은 보상의 합계를 표시합니다.</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <RiCalendarLine className="text-gray-400" />
              <span className="text-gray-500">오늘의 보상</span>
            </div>
            <div className="text-2xl font-bold mb-1">0</div>
            <div className="text-sm text-gray-500">오늘 받은 보상 합계를 표시합니다.</div>
          </CardContent>
        </Card>
      </div>
      
      {/* 추가 보상 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <RiFundsLine className="text-gray-400" />
              <span className="text-gray-500">세대 보상</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">오늘</span>
              <span className="text-sm font-semibold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">누적</span>
              <span className="text-sm font-semibold">2,500,000</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <RiGiftLine className="text-gray-400" />
              <span className="text-gray-500">제넬 보상</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">오늘</span>
              <span className="text-sm font-semibold">0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">누적</span>
              <span className="text-sm font-semibold">0</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 월별 수익 차트 */}
      <Card className="mt-6">
        <CardHeader className="flex justify-between items-center pb-2">
          <CardTitle className="text-lg font-semibold">월별 수당지급내역</CardTitle>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-button">
              <RiDownloadLine />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-button">
              <RiRefreshLine />
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} className="w-full h-[300px]"></div>
        </CardContent>
      </Card>
    </div>
  )
} 