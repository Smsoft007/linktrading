'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { DashboardContent } from '@/components/dashboard/DashboardContent'
import { useAuth } from '@/hooks/useAuth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  RiDashboardLine, 
  RiWallet3Line,
  RiUserSettingsLine,
  RiTeamLine,
  RiNotification3Line,
  RiBarChartLine
} from 'react-icons/ri'
import Script from 'next/script'

export default function MainPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')

  // 인증 상태 확인 후 로그인 여부에 따라 리다이렉트
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  // 로딩 중이거나 사용자가 없는 경우 로딩 화면 표시
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">페이지 로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ECharts 라이브러리 로드 */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.5.0/echarts.min.js" 
        strategy="afterInteractive"
      />
      
      <DashboardLayout>
        <div className="p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">안녕하세요, {user.name}님</h1>
          <p className="text-gray-500 mb-6">LINK BOT TRADING BUSINESS 플랫폼 대시보드입니다.</p>
          
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <RiDashboardLine className="hidden md:block" />
                <span>대시보드</span>
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center gap-2">
                <RiWallet3Line className="hidden md:block" />
                <span>자산</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <RiTeamLine className="hidden md:block" />
                <span>조직도</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <RiBarChartLine className="hidden md:block" />
                <span>통계</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <RiNotification3Line className="hidden md:block" />
                <span>알림</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <RiUserSettingsLine className="hidden md:block" />
                <span>프로필</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <DashboardContent />
            </TabsContent>
            
            <TabsContent value="wallet">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">자산 관리</h3>
                <p>자산 관리 기능은 준비 중입니다.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="team">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">조직도</h3>
                <p>조직도 기능은 준비 중입니다.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">통계</h3>
                <p>통계 기능은 준비 중입니다.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">알림</h3>
                <p>알림 기능은 준비 중입니다.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">프로필</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">사용자 ID</p>
                    <p className="font-medium">{user.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">이름</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">이메일</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">역할</p>
                    <p className="font-medium">{user.role}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </>
  )
} 