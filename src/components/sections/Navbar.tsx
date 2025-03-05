'use client'

import { useState } from 'react'
import { RiMenu3Line, RiCloseLine, RiWalletLine } from 'react-icons/ri'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: '자동지갑생성', href: '#' },
    { label: '실시간 시세', href: '#' },
    { label: '자동 거래', href: '#' },
    { label: '입출금 현황', href: '#' },
    { label: '고객지원', href: '#' }
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-white">
              Auto USDT
            </a>
          </div>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* 지갑 연결 버튼 */}
          <div className="hidden md:flex items-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <RiWalletLine />
              지갑 연결
            </button>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? (
                <RiCloseLine className="text-2xl" />
              ) : (
                <RiMenu3Line className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <button className="flex items-center gap-2 w-full px-3 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <RiWalletLine />
                지갑 연결
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
