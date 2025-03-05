'use client'

import { useState } from 'react'
import { Header } from './Header'
import { Sidebar, MobileSidebar } from './Sidebar'
import { Footer } from './Footer'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 데스크톱 사이드바 */}
      <div className="hidden md:block">
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>
      
      {/* 모바일 사이드바 */}
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      
      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* 내용 부분 */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  )
} 