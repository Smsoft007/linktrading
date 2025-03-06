'use client';

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import Header from '@/components/layout/Header'

// Custom SVG icon components to replace lucide-react
const IconLock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const IconAlertCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = useState<Partial<LoginFormValues>>({})

  const validateForm = (): boolean => {
    const errors: Partial<LoginFormValues> = {}
    let isValid = true

    // Email validation
    if (!formValues.email) {
      errors.email = '이메일을 입력해주세요.'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = '유효한 이메일 주소를 입력해주세요.'
      isValid = false
    }

    // Password validation
    if (!formValues.password) {
      errors.password = '비밀번호를 입력해주세요.'
      isValid = false
    } else if (formValues.password.length < 8) {
      errors.password = '비밀번호는 8자 이상이어야 합니다.'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user types
    if (formErrors[name as keyof LoginFormValues]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Call the login function from useAuth with credentials object
      await login({ 
        email: formValues.email, 
        password: formValues.password 
      })
      
      // Redirect to dashboard on successful login
      router.push('/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header transparent />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-md mx-auto">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">로그인</CardTitle>
              <CardDescription className="text-center text-gray-400">
                계정에 로그인하여 봇 트레이딩을 시작하세요
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {error && (
                <Alert className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                  <div className="flex items-center gap-2">
                    <IconAlertCircle />
                    <AlertDescription>{error}</AlertDescription>
                  </div>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">이메일</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <IconUser />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formValues.email}
                      onChange={handleInputChange}
                      error={!!formErrors.email}
                      className="pl-10"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">비밀번호</label>
                    <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                      비밀번호 찾기
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <IconLock />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formValues.password}
                      onChange={handleInputChange}
                      error={!!formErrors.password}
                      className="pl-10"
                    />
                  </div>
                  {formErrors.password && (
                    <p className="text-sm text-red-500">{formErrors.password}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-300">로그인 상태 유지</label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  isLoading={isLoading}
                >
                  {!isLoading && (
                    <span className="flex items-center">
                      로그인
                      <IconArrowRight className="ml-2" />
                    </span>
                  )}
                  {isLoading && '처리 중...'}
                </Button>
              </form>
              
              <div className="mt-4 text-center text-sm">
                <span className="text-gray-400">소셜 계정으로 로그인</span>
                <div className="flex justify-center space-x-4 mt-2">
                  <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#4285F4"/>
                      <path d="M4.547 14.927l3.043-2.348c-.82-1.338-2.318-2.348-4.558-2.348-3.046 0-5.527 2.481-5.527 5.527s2.481 5.527 5.527 5.527c2.24 0 3.738-1.01 4.558-2.348l-3.043-2.348c-.506.67-1.182 1.095-2.015 1.095-1.372 0-2.483-1.112-2.483-2.484s1.111-2.483 2.483-2.483c.833 0 1.509.425 2.015 1.095z" fill="#34A853"/>
                      <path d="M0 10.356h8.327v3.451H4.547c.506.67 1.182 1.095 2.015 1.095 1.372 0 2.483-1.112 2.483-2.484s-1.111-2.483-2.483-2.483c-.833 0-1.509.425-2.015 1.095l-3.043-2.348C2.318 6.344 3.816 5.334 6.056 5.334c3.046 0 5.527 2.481 5.527 5.527s-2.481 5.527-5.527 5.527c-2.24 0-3.738-1.01-4.558-2.348l3.043-2.348z" fill="#FBBC05"/>
                      <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#EA4335"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" fill="#1877F2"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#ffffff"/>
                    </svg>
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-400">
                계정이 없으신가요?{' '}
                <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                  회원가입
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default LoginPage 