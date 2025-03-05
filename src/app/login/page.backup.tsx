'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

// UI 컴포넌트 임포트
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'

// 서비스 및 유틸리티 임포트
import { useAuth } from '@/hooks/useAuth'
import { useWallet } from '@/hooks/useWallet'

// 타입 정의
interface LoginFormData {
  loginType: string;
  userId: string;
  password: string;
  rememberPassword: boolean;
}

// 언어 옵션 상수
const LANGUAGE_OPTIONS = [
  { value: '언어선택', label: '언어선택' },
  { value: '한국어', label: '한국어' },
  { value: 'English', label: 'English' },
  { value: '汉语', label: '汉语' },
  { value: '日本語', label: '日本語' },
  { value: 'Tiếng Việt', label: 'Tiếng Việt' },
  { value: 'ภาษาไทย', label: 'ภาษาไทย' }
];

// 로그인 페이지 컴포넌트
export default function LoginPage() {
  // 라우터 및 상태 관리
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const { createWallets } = useWallet();
  
  // 로컬 상태
  const [activeTab, setActiveTab] = useState<'MINING' | 'POS'>('MINING');
  const [formData, setFormData] = useState<LoginFormData>({
    loginType: '언어선택',
    userId: '',
    password: '',
    rememberPassword: false
  });

  // 저장된 사용자 ID 불러오기
  useEffect(() => {
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setFormData(prev => ({ ...prev, userId: savedUserId, rememberPassword: true }));
    }
  }, []);

  // 폼 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 선택 컴포넌트 값 변경 핸들러
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 체크박스 값 변경 핸들러
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 로그인 요청
      const result = await login({
        userId: formData.userId,
        password: formData.password,
        loginType: activeTab
      });
      
      // 로그인 성공 시
      if (result.success) {
        // 사용자 설정 저장
        if (formData.rememberPassword) {
          localStorage.setItem('userId', formData.userId);
        } else {
          localStorage.removeItem('userId');
        }
        
        // 관리자가 아닌 경우 지갑 생성
        if (result.userInfo && result.userInfo.ADMIN_YN === 'N') {
          try {
            await createWallets(formData.userId);
          } catch (err) {
            console.error('지갑 생성 중 오류가 발생했지만 로그인은 계속 진행합니다:', err);
          }
        }
        
        // 메인 페이지로 이동
        router.push('/main');
      }
    } catch (err) {
      // 오류는 useAuth 훅에서 처리됨
      console.error('로그인 처리 중 오류:', err);
    }
  };

  // 배경 컴포넌트
  const BackgroundEffect = () => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-[10px] opacity-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );

  // 로그인 폼 컴포넌트
  const LoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 언어 선택 */}
      <div className="space-y-2">
        <Label htmlFor="loginType" className="text-gray-300">언어 선택</Label>
        <Select
          value={formData.loginType}
          onValueChange={(value) => handleSelectChange('loginType', value)}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-200">
            <SelectValue placeholder="언어선택" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
            {LANGUAGE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* 사용자 ID 입력 */}
      <div className="space-y-2">
        <Label htmlFor="userId" className="text-gray-300">회원 ID</Label>
        <Input
          id="userId"
          name="userId"
          type="text"
          placeholder="회원ID"
          value={formData.userId}
          onChange={handleInputChange}
          className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
          required
        />
      </div>
      
      {/* 비밀번호 입력 */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-300">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleInputChange}
          className="bg-gray-800 border-gray-700 text-gray-200 placeholder:text-gray-500"
          required
        />
      </div>
      
      {/* 로그인 정보 저장 */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberPassword"
          checked={formData.rememberPassword}
          onCheckedChange={(checked) => 
            handleCheckboxChange('rememberPassword', checked === true)
          }
          className="data-[state=checked]:bg-blue-600 border-gray-600"
        />
        <Label
          htmlFor="rememberPassword"
          className="text-sm font-medium leading-none text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          아이디 비밀번호 기억하기
        </Label>
      </div>
      
      {/* 로그인 버튼 */}
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            로그인 중...
          </>
        ) : (
          '로그인'
        )}
      </Button>
    </form>
  );

  // 메인 렌더링
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 p-4">
      <BackgroundEffect />
      
      <Card className="w-full max-w-md bg-gray-900/80 backdrop-blur-md border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">로그인</CardTitle>
          <CardDescription className="text-center text-gray-400">
            계정에 로그인하여 서비스를 이용하세요
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* 탭 선택 */}
          <Tabs defaultValue="MINING" onValueChange={(value) => setActiveTab(value as 'MINING' | 'POS')} className="mb-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="MINING">MINING</TabsTrigger>
              <TabsTrigger value="POS">POS</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 text-center text-sm text-gray-400 space-y-1">
              <p>마이닝 포스에서 자산을 국제화하세요!!</p>
              <p>전전한 관리와 투명한 보상으로</p>
              <p>마케팅 가치를 향상시켜드립니다.</p>
            </div>
          </Tabs>
          
          {/* 에러 메시지 */}
          {error && (
            <Alert variant="destructive" className="mb-4 bg-red-950/50 border-red-800 text-red-200">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* 로그인 폼 */}
          <LoginForm />
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            variant="outline" 
            className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            onClick={() => router.push('/register')}
          >
            회원가입
          </Button>
          
          <div className="text-center text-sm text-gray-500">
            <Link href="/" className="text-blue-500 hover:text-blue-400">
              홈으로 돌아가기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 