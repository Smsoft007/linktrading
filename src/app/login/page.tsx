'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Header from '@/components/layout/Header'
import { Lock, User, ArrowRight } from 'lucide-react'

// 로그인 폼 유효성 검증 스키마
const loginSchema = z.object({
  username: z.string().min(1, '아이디를 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
})

// 로그인 폼 타입
type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // 폼 설정
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  // 폼 제출 처리
  const onSubmit = async (data: LoginFormValues) => {
    setLoginError(null)
    setIsLoading(true)
    
    try {
      // useAuth 훅의 login 함수 사용
      const result = await login({
        username: data.username,
        password: data.password
      })
      
      if (result.success) {
        // 로그인 성공 시 메인 페이지로 이동
        router.push('/main')
      } else {
        // 로그인 실패 처리
        setLoginError(result.message || '로그인에 실패했습니다')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      setLoginError(err.message || '로그인 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 page-transition">
      <Header />
      <div className="flex flex-1 items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-md">
          <Card className="premium-card border-0 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 z-0"></div>
            <CardHeader className="relative z-10 space-y-1 pb-6 pt-8">
              <div className="flex justify-center mb-6">
                <div className="relative w-20 h-20 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 shadow-lg hover-glow">
                  <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-full m-0.5 flex items-center justify-center">
                    <img 
                      src="/images/logo.png" 
                      alt="LINK BOT TRADING Logo" 
                      className="w-14 h-14 object-contain"
                    />
                  </div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center premium-text-gradient">LINK BOT TRADING</CardTitle>
              <CardDescription className="text-center text-gray-400">
                계정 정보를 입력하여 로그인하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 px-8">
              {loginError && (
                <Alert variant="destructive" className="mb-6 bg-red-500/10 text-red-500 border border-red-500/20">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">아이디</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="아이디를 입력하세요" 
                              {...field} 
                              className="premium-input h-12 pl-10"
                            />
                          </FormControl>
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">비밀번호</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="비밀번호를 입력하세요" 
                              {...field} 
                              className="premium-input h-12 pl-10"
                            />
                          </FormControl>
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="premium-button w-full h-12 mt-4 flex items-center justify-center gap-2 group" 
                    disabled={isLoading}
                  >
                    {isLoading ? '로그인 중...' : (
                      <>
                        <span>로그인</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="relative z-10 flex flex-col space-y-4 pb-8 px-8">
              <div className="text-sm text-center text-gray-400">
                계정이 없으신가요?{' '}
                <Link href="/register" className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors">
                  회원가입
                </Link>
              </div>
              <div className="flex items-center justify-center mt-4">
                <div className="h-px bg-gray-700 flex-1"></div>
                <span className="px-4 text-xs text-gray-500">OR</span>
                <div className="h-px bg-gray-700 flex-1"></div>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <Button variant="outline" className="w-full border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google 로그인
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 