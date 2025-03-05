'use client'

import { BiCopy } from 'react-icons/bi'
import { IoReload } from 'react-icons/io5'
import { FaWallet, FaEthereum } from 'react-icons/fa'

export function AIAutoCalculation({ sectionNumber }: { sectionNumber: number }) {
  return (
    <section className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white">자동화된 지갑 시스템</h2>
          <p className="text-gray-400 mt-2">* 예시 화면입니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FaWallet className="text-blue-400 text-xl" />
              </div>
            </div>
            <h3 className="text-white text-center text-xl mb-4">자동 입금 시스템</h3>
            <p className="text-gray-400 text-center text-sm mb-6">스마트 컨트랙트를 통한 자동 입금으로 즉시 거래가 가능합니다</p>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">최근 입금</span>
                <span className="text-green-400">+2.5 ETH</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-400">상태</span>
                <span className="text-blue-400">완료됨</span>
              </div>
            </div>
            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
              입금 내역 보기
            </button>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <FaEthereum className="text-emerald-400 text-xl" />
              </div>
            </div>
            <h3 className="text-white text-center text-xl mb-4">자동 지갑 생성</h3>
            <p className="text-gray-400 text-center text-sm mb-6">계정 등록 시 즉시 활성화되는 안전한 지갑 시스템</p>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">지갑 주소</span>
                <BiCopy className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
              </div>
              <div className="text-gray-500 text-sm mt-2 break-all">0x7a2...3f9b</div>
            </div>
            <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors">
              QR 코드 보기
            </button>
          </div>

          <div className="bg-gray-900/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <IoReload className="text-blue-400 text-xl" />
              </div>
            </div>
            <h3 className="text-white text-center text-xl mb-4">실시간 연동</h3>
            <p className="text-gray-400 text-center text-sm mb-6">자동 업데이트되는 실시간 잔액 확인 시스템</p>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">현재 잔액</span>
                <span className="text-white">12.8 ETH</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-400">24h 변동</span>
                <span className="text-green-400">+2.3%</span>
              </div>
            </div>
            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
              새로고침
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
