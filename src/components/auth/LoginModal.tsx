'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { authService } from '@/services/auth.service'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState('MINING')
  const [loginType, setLoginType] = useState('인어선택')
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [rememberCredentials, setRememberCredentials] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userId || !password) {
      toast.error('로그인 실패', {
        description: '아이디와 비밀번호를 모두 입력해주세요.'
      })
      return
    }
    
    if (loginType === '인어선택') {
      toast.error('로그인 실패', {
        description: '사용자 유형을 선택해주세요.'
      })
      return
    }
    
    setIsLoading(true)
    
    try {
      // API 호출
      const response = await authService.login({
        email: userId, // API는 email을 사용하지만 UI에서는 userId로 표시
        password: password
      })
      
      // 로그인 성공 처리
      if (response && response.token) {
        // 토큰 저장
        localStorage.setItem('token', response.token)
        
        // 사용자 정보 저장
        localStorage.setItem('user', JSON.stringify(response.user))
        
        // 아이디/비밀번호 기억하기
        if (rememberCredentials) {
          localStorage.setItem('rememberedUserId', userId)
        } else {
          localStorage.removeItem('rememberedUserId')
        }
        
        toast.success('로그인 성공', {
          description: '환영합니다!'
        })
        
        // 모달 닫기
        onClose()
        
        // 페이지 새로고침 (로그인 상태 반영)
        window.location.reload()
      }
    } catch (error) {
      console.error('로그인 오류:', error)
      toast.error('로그인 실패', {
        description: '아이디 또는 비밀번호가 올바르지 않습니다.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = () => {
    // 회원가입 페이지로 이동 또는 회원가입 모달 표시
    window.location.href = '/register'
  }
  
  // 컴포넌트 마운트 시 저장된 아이디 불러오기
  useState(() => {
    const savedUserId = localStorage.getItem('rememberedUserId')
    if (savedUserId) {
      setUserId(savedUserId)
      setRememberCredentials(true)
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px] p-0 overflow-hidden bg-[#0f1729] border-0'>
        <div className='bg-gradient-to-r from-blue-600 to-blue-400 h-1 w-full'></div>
        
        <div className='p-6'>
          <h2 className='text-center text-2xl font-bold text-white mb-4'>로그인</h2>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className='w-full mb-6'>
            <TabsList className='grid w-full grid-cols-2 mb-2'>
              <TabsTrigger 
                value='MINING' 
                className={`${activeTab === 'MINING' ? 'bg-[#1e40af] text-white' : 'bg-white text-[#1e293b]'} font-semibold`}
              >
                MINING
              </TabsTrigger>
              <TabsTrigger 
                value='POS' 
                className={`${activeTab === 'POS' ? 'bg-[#1e40af] text-white' : 'bg-white text-[#1e293b]'} font-semibold`}
              >
                POS
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className='text-center mb-6 space-y-1'>
            <p className='text-gray-300 text-sm'>마이닝 포스에서 자산을 극대화하세요!</p>
            <p className='text-gray-300 text-sm'>건전한 관리와 투명한 보상으로</p>
            <p className='text-gray-300 text-sm'>마케팅 가치를 함께만들어갑니다.</p>
          </div>
          
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-3'>
              <Select 
                value={loginType} 
                onValueChange={setLoginType}
              >
                <SelectTrigger className='w-full bg-[#1e293b] border-[#334155] text-gray-200'>
                  <SelectValue placeholder='인어선택' />
                </SelectTrigger>
                <SelectContent className='bg-[#1e293b] border-[#334155]'>
                  <SelectItem value='인어선택'>인어선택</SelectItem>
                  <SelectItem value='개인'>개인</SelectItem>
                  <SelectItem value='기업'>기업</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                type='text'
                placeholder='회원ID'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className='bg-[#1e293b] border-[#334155] text-gray-200 placeholder:text-gray-500'
              />
              
              <Input
                type='password'
                placeholder='비밀번호'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-[#1e293b] border-[#334155] text-gray-200 placeholder:text-gray-500'
              />
              
              <div className='flex items-center space-x-2'>
                <Checkbox 
                  id='remember' 
                  checked={rememberCredentials}
                  onCheckedChange={(checked) => setRememberCredentials(checked as boolean)}
                  className='data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500'
                />
                <Label htmlFor='remember' className='text-sm text-gray-300'>
                  아이디 비밀번호 기억하기
                </Label>
              </div>
            </div>
            
            <div className='pt-2 space-y-3'>
              <Button 
                type='submit' 
                className='w-full bg-blue-500 hover:bg-blue-600 text-white'
                disabled={isLoading}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
              
              <Button 
                type='button' 
                variant='outline' 
                onClick={handleRegister}
                className='w-full bg-[#1e293b] text-gray-300 border-[#334155] hover:bg-[#334155] hover:text-white'
              >
                회원가입
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
