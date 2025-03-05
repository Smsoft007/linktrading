'use client'

import { FaTelegram, FaBell, FaLock, FaUserShield } from 'react-icons/fa'
import { BsArrowRight } from 'react-icons/bs'

export function TelegramNotification() {
  const handleJoinTelegram = () => {
    window.open('https://t.me/autousdt', '_blank')
  }

  const features = [
    {
      icon: FaBell,
      text: '실시간 알림'
    },
    {
      icon: FaLock,
      text: '보안 알림'
    },
    {
      icon: FaUserShield,
      text: '24/7 고객지원'
    }
  ]

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-900/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-3xl animate-pulse">
                <FaTelegram />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">텔레그램 알림 받기</h3>
                <p className="text-gray-400">실시간 거래 알림을 텔레그램으로 받아보세요</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="hidden md:flex gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <feature.icon className="text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-400 group-hover:text-white transition-colors">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleJoinTelegram}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
              >
                텔레그램 참여하기
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
