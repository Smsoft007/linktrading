'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"

// Simple arrow left SVG component to replace lucide-react dependency
const ArrowLeftIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7"/>
    <path d="M19 12H5"/>
  </svg>
);

export default function AgreementPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 헤더 */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeftIcon />
            <span>메인으로 돌아가기</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center premium-text-gradient">
            약정 및 준수 사항
          </h1>
          
          <div className="space-y-10">
            {/* 페키지 가입조건 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">페키지 가입조건</h2>
              <p className="text-gray-300 leading-relaxed">
                페키지 봉투는 회사가 지정한 USDT를 회사 전자 지갑에 이체된 거래만 인정됩니다.
              </p>
            </section>

            {/* 투자금 위탁조건 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">투자금 위탁조건</h2>
              <p className="text-gray-300 leading-relaxed">
                투자금은 최저비 USDT를 회사가 트레이딩 하도록 최소 6개월 이상 회사에 위탁하기로 약정합니다.
              </p>
            </section>

            {/* 해약조건 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">해약조건</h2>
              <p className="text-gray-300 leading-relaxed">
                투자자는 회사에 투자한 투자 수당을 6개월 전에 해약할 때는 투자한 USDT에서 각종 영업손실 20%를 공제한 후, 투자한 USDT의 80%만 반환하기로 하며, 투자자의 영업 계좌은 즉시 말소하기로 합니다.
              </p>
            </section>

            {/* 투자위탁금 수익분배 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">투자위탁금 수익분배</h2>
              <p className="text-gray-300 leading-relaxed">
                회사는 투자자가 위탁한 투자 USDT를 트레이딩 및 교수적 장물을 적으로 투자하고 매주 수익금을 분배합니다. 단, 최소익은 월 최소 5% 이상은 회사가 책임지고 보장해드릴 것을 약약합니다.
              </p>
            </section>

            {/* 추천수당 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">① 추천수당</h2>
              <p className="text-gray-300 leading-relaxed">
                추천수당은 당일 자정까지 패키지매출을 마감한 후, 패키지매출의 10%를 추천수당으로 이체해드립니다.
              </p>
            </section>

            {/* 매칭 보너스 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">② 매칭 보너스</h2>
              <p className="text-gray-300 leading-relaxed">
                추천인의 직 스폰서 2대까지 추천 매칭 보너스를 2일 후 USDT로 이체됩니다.
              </p>
            </section>

            {/* 직급 보너스 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">③ 직급 보너스</h2>
              <p className="text-gray-300 leading-relaxed">
                직급 보너스는 매주간별로 지급하며, 월요일부터 일요일까지 회사 총 패키지매출을 마감한 후, 총매출의 5%를 익주 목요일에 직급별로 나누어 이체됩니다. 단, 통급은 1/N로 분배합니다. (총책직급 포함)
              </p>
            </section>

            {/* 직급 자격 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">직급 자격</h2>
              <p className="text-gray-300 leading-relaxed">
                직급 보너스는 각 항목의 자격요건을 달성한 후 익주부터 직급을 유지해야만 보너스를 이체해드립니다.
              </p>
            </section>

            {/* 매칭 배당금 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">⑤ 매칭 배당금</h2>
              <p className="text-gray-300 leading-relaxed">
                추천인과 스폰서 2대까지 매주 배당을 정산하여 스폰서 매칭 배당을 익주 목요일 이체해드립니다.
              </p>
            </section>

            {/* 수익배당금 정의 */}
            <section className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h2 className="text-xl font-semibold mb-4 text-blue-400">수익배당금 정의</h2>
              <p className="text-gray-300 leading-relaxed">
                회사는 투자자에게 위탁받은 USDT를 BOT으로 트레이딩해서 발생한 수익과 회사가 투자하여 발생한 수익을 포함해서 배당수익으로 정의 하고, 패키수익 분배조건에 따라 배당지급이 각각 이체해드립니다.
              </p>
            </section>
          </div>

          <div className="flex justify-center mt-12">
            <Button asChild className="premium-button h-14 px-10 text-lg">
              <Link href="/">투자하기</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 