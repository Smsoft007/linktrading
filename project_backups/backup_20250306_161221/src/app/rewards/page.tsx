'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 헤더 */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center premium-text-gradient">
            마케팅 리워드 플랜
          </h1>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">회원 등급 및 명칭</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-left">레벨</th>
                    <th className="border border-gray-700 p-3 text-left">명칭</th>
                    <th className="border border-gray-700 p-3 text-left">조건</th>
                    <th className="border border-gray-700 p-3 text-left">혜택</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3">1 LEVEL</td>
                    <td className="border border-gray-700 p-3">일반회원</td>
                    <td className="border border-gray-700 p-3">회원가입 시</td>
                    <td className="border border-gray-700 p-3">기본 리워드 혜택</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3">2 LEVEL</td>
                    <td className="border border-gray-700 p-3">VIP</td>
                    <td className="border border-gray-700 p-3">1,000만원 이상 투자</td>
                    <td className="border border-gray-700 p-3">추가 리워드 + 전용 고객센터</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3">3 LEVEL</td>
                    <td className="border border-gray-700 p-3">VVIP</td>
                    <td className="border border-gray-700 p-3">5,000만원 이상 투자</td>
                    <td className="border border-gray-700 p-3">프리미엄 리워드 + 전담 매니저</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3">4 LEVEL</td>
                    <td className="border border-gray-700 p-3">ROYAL</td>
                    <td className="border border-gray-700 p-3">1억원 이상 투자</td>
                    <td className="border border-gray-700 p-3">로열 리워드 + 맞춤형 투자 전략</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3">5 LEVEL</td>
                    <td className="border border-gray-700 p-3">BLACK</td>
                    <td className="border border-gray-700 p-3">3억원 이상 투자</td>
                    <td className="border border-gray-700 p-3">최고급 리워드 + 전용 투자 컨설팅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">투자 금액별 혜택</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-left">투자 금액</th>
                    <th className="border border-gray-700 p-3 text-center">1,000만원</th>
                    <th className="border border-gray-700 p-3 text-center">5,000만원</th>
                    <th className="border border-gray-700 p-3 text-center">1억원</th>
                    <th className="border border-gray-700 p-3 text-center">3억원</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">월 최소 보장 수익</td>
                    <td className="border border-gray-700 p-3 text-center">30만원</td>
                    <td className="border border-gray-700 p-3 text-center">150만원</td>
                    <td className="border border-gray-700 p-3 text-center">300만원</td>
                    <td className="border border-gray-700 p-3 text-center">900만원</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">연간 예상 수익</td>
                    <td className="border border-gray-700 p-3 text-center">360만원</td>
                    <td className="border border-gray-700 p-3 text-center">1,800만원</td>
                    <td className="border border-gray-700 p-3 text-center">3,600만원</td>
                    <td className="border border-gray-700 p-3 text-center">1억 800만원</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">추천인 보너스 시스템</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-left">구분</th>
                    <th className="border border-gray-700 p-3 text-center">직접 추천</th>
                    <th className="border border-gray-700 p-3 text-center">2차 추천</th>
                    <th className="border border-gray-700 p-3 text-center">3차 추천</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">보너스 비율</td>
                    <td className="border border-gray-700 p-3 text-center">3%</td>
                    <td className="border border-gray-700 p-3 text-center">1%</td>
                    <td className="border border-gray-700 p-3 text-center">0.5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">리워드 비율</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-left">구분</th>
                    <th className="border border-gray-700 p-3 text-center">1 LEVEL</th>
                    <th className="border border-gray-700 p-3 text-center">2 LEVEL</th>
                    <th className="border border-gray-700 p-3 text-center">3 LEVEL</th>
                    <th className="border border-gray-700 p-3 text-center">4 LEVEL</th>
                    <th className="border border-gray-700 p-3 text-center">5 LEVEL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">직추천 보너스</td>
                    <td className="border border-gray-700 p-3 text-center">1.5%</td>
                    <td className="border border-gray-700 p-3 text-center">2%</td>
                    <td className="border border-gray-700 p-3 text-center">2.5%</td>
                    <td className="border border-gray-700 p-3 text-center">3%</td>
                    <td className="border border-gray-700 p-3 text-center">3%</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">매칭 보너스<br />(간접 추천)</td>
                    <td className="border border-gray-700 p-3 text-center">0.5%</td>
                    <td className="border border-gray-700 p-3 text-center">0.7%</td>
                    <td className="border border-gray-700 p-3 text-center">1%</td>
                    <td className="border border-gray-700 p-3 text-center">1.2%</td>
                    <td className="border border-gray-700 p-3 text-center">1.5%</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">트레이딩 성과 보너스</td>
                    <td className="border border-gray-700 p-3 text-center">1%</td>
                    <td className="border border-gray-700 p-3 text-center">1.5%</td>
                    <td className="border border-gray-700 p-3 text-center">2%</td>
                    <td className="border border-gray-700 p-3 text-center">2.5%</td>
                    <td className="border border-gray-700 p-3 text-center">3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">투자 패키지 및 영업 마케팅 보상 플랜</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-left">패키지 플랜 (USDT)</th>
                    <th className="border border-gray-700 p-3 text-center">500 USDT</th>
                    <th className="border border-gray-700 p-3 text-center">1,000</th>
                    <th className="border border-gray-700 p-3 text-center">2,000</th>
                    <th className="border border-gray-700 p-3 text-center">5,000</th>
                    <th className="border border-gray-700 p-3 text-center">20,000</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">① 추천수당 (1회 지급)</td>
                    <td className="border border-gray-700 p-3 text-center" colSpan={5}>10%</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">②매칭 보너스<br />(1회 지급)</td>
                    <td className="border border-gray-700 p-3 text-center">1대 스폰서</td>
                    <td className="border border-gray-700 p-3 text-center">1.5%</td>
                    <td className="border border-gray-700 p-3 text-center">2%</td>
                    <td className="border border-gray-700 p-3 text-center">2.5%</td>
                    <td className="border border-gray-700 p-3 text-center">3%</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 text-center"></td>
                    <td className="border border-gray-700 p-3 text-center">2대 스폰서</td>
                    <td className="border border-gray-700 p-3 text-center">x</td>
                    <td className="border border-gray-700 p-3 text-center">1%</td>
                    <td className="border border-gray-700 p-3 text-center">1.5%</td>
                    <td className="border border-gray-700 p-3 text-center">2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">TRADER 직급 자격요건 및 보너스 지급률 (5%)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-left">TRADER 직급 구분</th>
                    <th className="border border-gray-700 p-3 text-center">(CT) 1-LEVEL</th>
                    <th className="border border-gray-700 p-3 text-center">(DT) 2-LEVEL</th>
                    <th className="border border-gray-700 p-3 text-center">(PT) 3-LEVEL</th>
                    <th className="border border-gray-700 p-3 text-center">(ST) 4-LEVEL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">③ 직급 보너스</td>
                    <td className="border border-gray-700 p-3 text-center">2%</td>
                    <td className="border border-gray-700 p-3 text-center">1.5%</td>
                    <td className="border border-gray-700 p-3 text-center">1%</td>
                    <td className="border border-gray-700 p-3 text-center">0.5%</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">본인 패키지</td>
                    <td className="border border-gray-700 p-3 text-center">1,000</td>
                    <td className="border border-gray-700 p-3 text-center">2,000</td>
                    <td className="border border-gray-700 p-3 text-center">5,000</td>
                    <td className="border border-gray-700 p-3 text-center">20,000</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">본인 소실적 볼륨</td>
                    <td className="border border-gray-700 p-3 text-center">20,000</td>
                    <td className="border border-gray-700 p-3 text-center">100,000</td>
                    <td className="border border-gray-700 p-3 text-center">300,000</td>
                    <td className="border border-gray-700 p-3 text-center">1,000,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">배당금 분배 정보</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-left" colSpan={2}>④ 투자자 &amp; 운영자 배당금 (85%)</th>
                    <th className="border border-gray-700 p-3 text-left" colSpan={2}>⑤ 매칭 배당금 (15%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">(IT) 투자자 배당</td>
                    <td className="border border-gray-700 p-3 text-center">50%</td>
                    <td className="border border-gray-700 p-3 font-medium">추천인 배당금</td>
                    <td className="border border-gray-700 p-3 text-center">10%</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">(QT) 회사 배당</td>
                    <td className="border border-gray-700 p-3 text-center">25%</td>
                    <td className="border border-gray-700 p-3 font-medium">1대 스폰서 매칭 배당금</td>
                    <td className="border border-gray-700 p-3 text-center">3%</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 font-medium">영업 운영배당</td>
                    <td className="border border-gray-700 p-3 text-center">10%</td>
                    <td className="border border-gray-700 p-3 font-medium">2대 스폰서 매칭 배당금</td>
                    <td className="border border-gray-700 p-3 text-center">2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">용어 정리</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-center">LEVEL</th>
                    <th className="border border-gray-700 p-3 text-center">직급 명칭</th>
                    <th className="border border-gray-700 p-3 text-center">직급 영문</th>
                    <th className="border border-gray-700 p-3 text-center">직급 내용</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 text-center">1-LEVEL</td>
                    <td className="border border-gray-700 p-3 text-center">CT</td>
                    <td className="border border-gray-700 p-3 text-center">COIN TRADER</td>
                    <td className="border border-gray-700 p-3 text-center">코인을 사고파는 일반 트레이더</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 text-center">2-LEVEL</td>
                    <td className="border border-gray-700 p-3 text-center">DT</td>
                    <td className="border border-gray-700 p-3 text-center">DAY TRADER</td>
                    <td className="border border-gray-700 p-3 text-center">매일 차트를 매매하는 단타 트레이더</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 text-center">3-LEVEL</td>
                    <td className="border border-gray-700 p-3 text-center">PT</td>
                    <td className="border border-gray-700 p-3 text-center">PRO TRADER</td>
                    <td className="border border-gray-700 p-3 text-center">프로페셔널 직업으로 하는 전문가</td>
                  </tr>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 text-center">4-LEVEL</td>
                    <td className="border border-gray-700 p-3 text-center">ST</td>
                    <td className="border border-gray-700 p-3 text-center">STAR TRADER</td>
                    <td className="border border-gray-700 p-3 text-center">트레이딩으로 고수익을 창출하는 전문가</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">투자자와 운영자 명칭</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="border border-gray-700 p-3 text-center">투자자의 명칭</th>
                    <th className="border border-gray-700 p-3 text-center">IT</th>
                    <th className="border border-gray-700 p-3 text-center">INVEST TRADER</th>
                    <th className="border border-gray-700 p-3 text-center">코인거래를 하는 투자자 또는 위탁자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-900">
                    <td className="border border-gray-700 p-3 text-center">운영자의 명칭</td>
                    <td className="border border-gray-700 p-3 text-center">QT</td>
                    <td className="border border-gray-700 p-3 text-center">QUANT TRADER</td>
                    <td className="border border-gray-700 p-3 text-center">알고리즘과 수학적 모델로 트레이딩하는 전문가</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Button className="premium-button h-14 px-10 text-lg">
              <Link href="/">메인으로 돌아가기</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 