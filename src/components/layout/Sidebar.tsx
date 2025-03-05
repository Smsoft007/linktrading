'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  RiDashboardLine, 
  RiUserLine, 
  RiCoinsLine, 
  RiWallet3Line, 
  RiTeamLine, 
  RiCustomerServiceLine, 
  RiMenuFoldLine, 
  RiArrowDownSLine, 
  RiGlobalLine 
} from 'react-icons/ri'

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleSubmenu = (id: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-gray-900 text-gray-300 transition-all duration-300 h-screen`}>
      <div className="p-4 flex items-center justify-between">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
          <img 
            src="/images/logo.png" 
            alt="LINK BOT TRADING Logo" 
            className={`${collapsed ? 'w-8 h-8' : 'w-10 h-10'} object-contain`}
          />
          {!collapsed && <span className="ml-2 font-bold text-white">LINK BOT</span>}
        </div>
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="hover:bg-teal-600 rounded-button"
          >
            <RiMenuFoldLine className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="mt-6">
        <div className="menu-section">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold hover:bg-gray-800"
          >
            <div className="flex items-center">
              <RiDashboardLine className="text-xl mr-3" />
              {!collapsed && <span>대시보드</span>}
            </div>
          </Button>
        </div>
        <div className="menu-section">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
            onClick={() => toggleSubmenu('profile')}
          >
            <div className="flex items-center">
              <RiUserLine className="text-xl mr-3" />
              {!collapsed && <span>내 정보</span>}
            </div>
            {!collapsed && (
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['profile'] ? 'rotate-180' : ''}`} 
              />
            )}
          </Button>
          <div className={`${openMenus['profile'] ? 'block' : 'hidden'} ${collapsed ? 'hidden' : ''} pl-4 space-y-1`}>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              프로필 관리
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              보안 설정
            </Link>
          </div>
        </div>
        <div className="menu-section">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
            onClick={() => toggleSubmenu('staking')}
          >
            <div className="flex items-center">
              <RiCoinsLine className="text-xl mr-3" />
              {!collapsed && <span>스테이킹</span>}
            </div>
            {!collapsed && (
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['staking'] ? 'rotate-180' : ''}`} 
              />
            )}
          </Button>
          <div className={`${openMenus['staking'] ? 'block' : 'hidden'} ${collapsed ? 'hidden' : ''} pl-4 space-y-1`}>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              스테이킹 현황
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              언스테이킹
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              리워드 내역
            </Link>
          </div>
        </div>
        <div className="menu-section">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
            onClick={() => toggleSubmenu('wallet')}
          >
            <div className="flex items-center">
              <RiWallet3Line className="text-xl mr-3" />
              {!collapsed && <span>지갑</span>}
            </div>
            {!collapsed && (
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['wallet'] ? 'rotate-180' : ''}`} 
              />
            )}
          </Button>
          <div className={`${openMenus['wallet'] ? 'block' : 'hidden'} ${collapsed ? 'hidden' : ''} pl-4 space-y-1`}>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              입출금
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              거래내역
            </Link>
          </div>
        </div>
        <div className="menu-section">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
            onClick={() => toggleSubmenu('network')}
          >
            <div className="flex items-center">
              <RiTeamLine className="text-xl mr-3" />
              {!collapsed && <span>네트워크</span>}
            </div>
            {!collapsed && (
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['network'] ? 'rotate-180' : ''}`} 
              />
            )}
          </Button>
          <div className={`${openMenus['network'] ? 'block' : 'hidden'} ${collapsed ? 'hidden' : ''} pl-4 space-y-1`}>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              추천인 현황
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              조직도
            </Link>
          </div>
        </div>
        <div className="menu-section">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
            onClick={() => toggleSubmenu('support')}
          >
            <div className="flex items-center">
              <RiCustomerServiceLine className="text-xl mr-3" />
              {!collapsed && <span>고객센터</span>}
            </div>
            {!collapsed && (
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['support'] ? 'rotate-180' : ''}`} 
              />
            )}
          </Button>
          <div className={`${openMenus['support'] ? 'block' : 'hidden'} ${collapsed ? 'hidden' : ''} pl-4 space-y-1`}>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              공지사항
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              1:1 문의
            </Link>
            <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

// 모바일용 사이드바
export function MobileSidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleSubmenu = (id: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <RiMenuFoldLine className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-gray-900 text-gray-300">
        <div className="p-4 flex items-center">
          <div className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="LINK BOT TRADING Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="ml-2 font-bold text-white">LINK BOT TRADING</span>
          </div>
        </div>
        <div className="mt-6">
          <div className="menu-section">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold hover:bg-gray-800"
            >
              <div className="flex items-center">
                <RiDashboardLine className="text-xl mr-3" />
                <span>대시보드</span>
              </div>
            </Button>
          </div>
          <div className="menu-section">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
              onClick={() => toggleSubmenu('profile')}
            >
              <div className="flex items-center">
                <RiUserLine className="text-xl mr-3" />
                <span>내 정보</span>
              </div>
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['profile'] ? 'rotate-180' : ''}`} 
              />
            </Button>
            <div className={`${openMenus['profile'] ? 'block' : 'hidden'} pl-4 space-y-1`}>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                프로필 관리
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                보안 설정
              </Link>
            </div>
          </div>
          <div className="menu-section">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
              onClick={() => toggleSubmenu('staking')}
            >
              <div className="flex items-center">
                <RiCoinsLine className="text-xl mr-3" />
                <span>스테이킹</span>
              </div>
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['staking'] ? 'rotate-180' : ''}`} 
              />
            </Button>
            <div className={`${openMenus['staking'] ? 'block' : 'hidden'} pl-4 space-y-1`}>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                스테이킹 현황
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                언스테이킹
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                리워드 내역
              </Link>
            </div>
          </div>
          <div className="menu-section">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
              onClick={() => toggleSubmenu('wallet')}
            >
              <div className="flex items-center">
                <RiWallet3Line className="text-xl mr-3" />
                <span>지갑</span>
              </div>
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['wallet'] ? 'rotate-180' : ''}`} 
              />
            </Button>
            <div className={`${openMenus['wallet'] ? 'block' : 'hidden'} pl-4 space-y-1`}>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                입출금
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                거래내역
              </Link>
            </div>
          </div>
          <div className="menu-section">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
              onClick={() => toggleSubmenu('network')}
            >
              <div className="flex items-center">
                <RiTeamLine className="text-xl mr-3" />
                <span>네트워크</span>
              </div>
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['network'] ? 'rotate-180' : ''}`} 
              />
            </Button>
            <div className={`${openMenus['network'] ? 'block' : 'hidden'} pl-4 space-y-1`}>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                추천인 현황
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                조직도
              </Link>
            </div>
          </div>
          <div className="menu-section">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-800"
              onClick={() => toggleSubmenu('support')}
            >
              <div className="flex items-center">
                <RiCustomerServiceLine className="text-xl mr-3" />
                <span>고객센터</span>
              </div>
              <RiArrowDownSLine 
                className={`transition-transform ${openMenus['support'] ? 'rotate-180' : ''}`} 
              />
            </Button>
            <div className={`${openMenus['support'] ? 'block' : 'hidden'} pl-4 space-y-1`}>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                공지사항
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                1:1 문의
              </Link>
              <Link href="#" className="block px-4 py-2 text-sm font-semibold hover:bg-gray-800">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
} 