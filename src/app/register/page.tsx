'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/hooks/use-toast'

// 이메일 도메인 옵션
const EMAIL_DOMAINS = [
  { value: '', label: '직접 입력' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'nate.com', label: 'nate.com' },
  { value: 'hanmail.net', label: 'hanmail.net' },
]

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [passwordCheck, setPasswordCheck] = useState(false)
  
  // 폼 상태
  const [formData, setFormData] = useState({
    D_COUNTRY: '185', // 기본값 한국
    D_UID: '',
    D_PASS: '',
    D_PASS_CH: '',
    D_NAME: '',
    D_HP: '',
    D_EMAIL: '',
    email_domain: '',
    D_CENCODE: '',
    D_SID: '',
    D_RID: '',
    B_CODE: '',
    B_OWNER: '',
    B_IDNO: '',
    terms: false
  })

  // 오류 상태
  const [formErrors, setFormErrors] = useState({
    D_UID: false,
    D_PASS: false,
    D_PASS_CH: false,
    D_NAME: false,
    D_HP: false,
    D_EMAIL: false,
    D_CENCODE: false,
    D_SID: false,
    D_RID: false,
  })

  // 검색 다이얼로그 상태
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [searchType, setSearchType] = useState<'sponsor' | 'recommender'>('sponsor')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  
  // 약관 다이얼로그 상태
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  
  // 국가, 센터, 은행 목록
  const [countries, setCountries] = useState<any[]>([])
  const [centers, setCenters] = useState<any[]>([])
  const [banks, setBanks] = useState<any[]>([])
  
  // 참조 설정
  const searchInputRef = useRef<HTMLInputElement>(null)

  // 초기 데이터 로딩
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // API 호출을 시뮬레이션합니다 - 실제 구현에서는 아래 부분을 실제 API 호출로 교체해야 합니다
        
        // 국가 목록 로드
        const countryList = [
          { Q_CODE: '185', Q_KNAME: '대한민국' },
          { Q_CODE: '392', Q_KNAME: '일본' },
          { Q_CODE: '156', Q_KNAME: '중국' },
          { Q_CODE: '840', Q_KNAME: '미국' },
        ]
        setCountries(countryList)
        
        // 센터 목록 로드
        const centerList = [
          { C_CODE: '01', C_NAME: '서울 센터' },
          { C_CODE: '02', C_NAME: '부산 센터' },
          { C_CODE: '03', C_NAME: '대구 센터' },
        ]
        setCenters(centerList)
        
        // 은행 목록 로드
        const bankList = [
          { B_CODE: '001', B_NAME: '국민은행' },
          { B_CODE: '002', B_NAME: '우리은행' },
          { B_CODE: '003', B_NAME: '신한은행' },
        ]
        setBanks(bankList)
      } catch (error) {
        console.error('Failed to load initial data:', error)
        setError('초기 데이터를 불러오는데 실패했습니다.')
      }
    }
    
    loadInitialData()
  }, [])

  // 아이디 중복 확인
  const checkIdAvailability = async () => {
    if (!formData.D_UID || formData.D_UID.length < 4) {
      setFormErrors({ ...formErrors, D_UID: true })
      toast({
        title: "오류",
        description: "아이디는 최소 4자 이상이어야 합니다.",
        variant: "destructive"
      })
      return
    }
    
    try {
      setIsLoading(true)
      // 실제 API 호출이 필요합니다 - 여기서는 예시로 시뮬레이션합니다
      const isAvailable = Math.random() > 0.3 // 70% 확률로 사용 가능한 ID로 표시
      
      if (isAvailable) {
        toast({
          title: "성공",
          description: "사용 가능한 아이디입니다.",
        })
        // ID 입력 필드 비활성화
        const inputElement = document.getElementById('D_UID') as HTMLInputElement
        if (inputElement) inputElement.disabled = true
      } else {
        toast({
          title: "오류",
          description: "이미 사용 중인 아이디입니다.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "오류",
        description: "아이디 확인 중 오류가 발생했습니다.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 비밀번호 확인 검사
  const checkPassword = () => {
    const passwordsMatch = formData.D_PASS === formData.D_PASS_CH
    setPasswordCheck(!passwordsMatch)
    setFormErrors({
      ...formErrors,
      D_PASS_CH: !passwordsMatch
    })
  }

  // 폼 입력값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value
    })
    
    // 특정 필드의 변경에 대한 추가 처리
    if (id === 'D_PASS_CH') {
      checkPassword()
    }
  }

  // 체크박스 변경 처리
  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      terms: checked
    })
  }
  
  // 이메일 도메인 변경 처리
  const handleDomainChange = (value: string) => {
    setFormData({
      ...formData,
      email_domain: value
    })
  }

  // 검색 다이얼로그 열기
  const openSearchDialog = (type: 'sponsor' | 'recommender') => {
    setSearchType(type)
    setSearchQuery('')
    setSearchResults([])
    setSearchDialogOpen(true)
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, 100)
  }

  // 검색 실행
  const performSearch = async () => {
    if (!searchQuery || searchQuery.length < 4) {
      toast({
        title: "오류",
        description: "검색어는 최소 4자 이상이어야 합니다.",
        variant: "destructive"
      })
      return
    }
    
    try {
      setIsLoading(true)
      // 실제 API 호출 대신 예시 데이터
      const results = [
        { D_UID: 'user1', D_NAME: '사용자1' },
        { D_UID: 'user2', D_NAME: '사용자2' },
        { D_UID: 'user3', D_NAME: '사용자3' },
      ]
      setSearchResults(results)
    } catch (error) {
      toast({
        title: "오류",
        description: "검색 중 오류가 발생했습니다.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 검색 결과 선택
  const selectSearchResult = (uid: string) => {
    if (searchType === 'sponsor') {
      setFormData({
        ...formData,
        D_SID: uid
      })
    } else {
      setFormData({
        ...formData,
        D_RID: uid
      })
    }
    setSearchDialogOpen(false)
  }

  // 회원가입 실행
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 필수 필드 유효성 검사
    if (!formData.D_UID || formData.D_UID.length < 4) {
      toast({
        title: "오류",
        description: "아이디를 확인해주세요.",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.D_PASS || formData.D_PASS.length < 4) {
      toast({
        title: "오류",
        description: "비밀번호를 확인해주세요.",
        variant: "destructive"
      })
      return
    }
    
    if (formData.D_PASS !== formData.D_PASS_CH) {
      toast({
        title: "오류",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.D_NAME) {
      toast({
        title: "오류",
        description: "이름을 입력해주세요.",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.D_HP) {
      toast({
        title: "오류",
        description: "전화번호를 입력해주세요.",
        variant: "destructive"
      })
      return
    }
    
    const emailFull = formData.email_domain 
      ? `${formData.D_EMAIL}@${formData.email_domain}`
      : formData.D_EMAIL
      
    if (!emailFull.includes('@')) {
      toast({
        title: "오류",
        description: "이메일을 올바르게 입력해주세요.",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.D_CENCODE) {
      toast({
        title: "오류",
        description: "센터를 선택해주세요.",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.D_SID) {
      toast({
        title: "오류",
        description: "후원인을 입력해주세요.",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.D_RID) {
      toast({
        title: "오류",
        description: "추천인을 입력해주세요.",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.terms) {
      toast({
        title: "오류",
        description: "약관에 동의해주세요.",
        variant: "destructive"
      })
      return
    }
    
    try {
      setIsLoading(true)
      setError(null)
      
      // 회원가입 데이터 준비
      const registerData = {
        username: formData.D_UID,
        password: formData.D_PASS,
        name: formData.D_NAME,
        email: emailFull,
        phone: formData.D_HP,
        country: formData.D_COUNTRY,
        center: formData.D_CENCODE,
        sponsor: formData.D_SID,
        recommender: formData.D_RID,
        bankCode: formData.B_CODE,
        bankOwner: formData.B_OWNER,
        bankAccount: formData.B_IDNO
      }
      
      // 실제 API 연동을 위해 useAuth의 register 함수 활용
      const result = await register({
        username: registerData.username,
        password: registerData.password,
        name: registerData.name,
        email: registerData.email
      })
      
      if (result.success) {
        toast({
          title: "성공",
          description: "회원가입이 완료되었습니다. 로그인 페이지로 이동합니다."
        })
        
        // 로그인 페이지로 리다이렉트
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setError(result.message || '회원가입 중 오류가 발생했습니다.')
        toast({
          title: "오류",
          description: result.message || '회원가입 중 오류가 발생했습니다.',
          variant: "destructive"
        })
      }
    } catch (error: any) {
      setError(error.message || '회원가입 중 오류가 발생했습니다.')
      toast({
        title: "오류",
        description: error.message || '회원가입 중 오류가 발생했습니다.',
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center border-b pb-2">
          <Link 
            href="/login" 
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl"
          >
            X
          </Link>
          <CardTitle className="text-2xl font-bold py-2">회원가입</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            {/* 국가 선택 */}
            <div className="mb-4">
              <Select 
                value={formData.D_COUNTRY} 
                onValueChange={(value) => setFormData({...formData, D_COUNTRY: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="국가 선택" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.Q_CODE} value={country.Q_CODE}>
                      {country.Q_KNAME}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* 아이디(사용자 ID) */}
            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  id="D_UID"
                  placeholder="* 아이디"
                  value={formData.D_UID}
                  onChange={handleInputChange}
                  className={formErrors.D_UID ? "border-red-500" : ""}
                />
                <Button 
                  type="button" 
                  onClick={checkIdAvailability}
                  disabled={isLoading || formData.D_UID.length < 4}
                >
                  중복확인
                </Button>
              </div>
              {formErrors.D_UID && (
                <p className="text-red-500 text-sm mt-1">아이디는 최소 4자 이상이어야 합니다.</p>
              )}
            </div>
            
            {/* 이름 */}
            <div className="mb-4">
              <Input
                id="D_NAME"
                placeholder="* 이름"
                value={formData.D_NAME}
                onChange={handleInputChange}
                className={formErrors.D_NAME ? "border-red-500" : ""}
              />
              {formErrors.D_NAME && (
                <p className="text-red-500 text-sm mt-1">이름을 입력해주세요.</p>
              )}
            </div>
            
            {/* 비밀번호 */}
            <div className="mb-4">
              <Input
                id="D_PASS"
                type="password"
                placeholder="* 비밀번호"
                value={formData.D_PASS}
                onChange={handleInputChange}
                className={formErrors.D_PASS ? "border-red-500" : ""}
              />
              {formErrors.D_PASS && (
                <p className="text-red-500 text-sm mt-1">비밀번호는 최소 4자 이상이어야 합니다.</p>
              )}
            </div>
            
            {/* 비밀번호 확인 */}
            <div className="mb-4">
              <Input
                id="D_PASS_CH"
                type="password"
                placeholder="* 비밀번호 확인"
                value={formData.D_PASS_CH}
                onChange={handleInputChange}
                onBlur={checkPassword}
                className={formErrors.D_PASS_CH ? "border-red-500" : ""}
              />
              {passwordCheck && (
                <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
            
            {/* 전화번호 */}
            <div className="mb-4">
              <Input
                id="D_HP"
                placeholder="* 전화번호"
                value={formData.D_HP}
                onChange={handleInputChange}
                className={formErrors.D_HP ? "border-red-500" : ""}
              />
              {formErrors.D_HP && (
                <p className="text-red-500 text-sm mt-1">올바른 전화번호를 입력해주세요.</p>
              )}
            </div>
            
            {/* 이메일 */}
            <div className="mb-4">
              <div className="flex gap-2">
                <Input
                  id="D_EMAIL"
                  placeholder="* 이메일"
                  value={formData.D_EMAIL}
                  onChange={handleInputChange}
                  className={`rounded-l-lg rounded-r-none ${formErrors.D_EMAIL ? "border-red-500" : ""}`}
                />
                <div className="flex-1">
                  <Select 
                    value={formData.email_domain} 
                    onValueChange={handleDomainChange}
                  >
                    <SelectTrigger className="w-full rounded-l-none">
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMAIL_DOMAINS.map((domain) => (
                        <SelectItem key={domain.value} value={domain.value}>
                          {domain.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formErrors.D_EMAIL && (
                <p className="text-red-500 text-sm mt-1">올바른 이메일을 입력해주세요.</p>
              )}
            </div>
            
            {/* 센터 코드 */}
            <div className="mb-4">
              <Select 
                value={formData.D_CENCODE} 
                onValueChange={(value) => setFormData({...formData, D_CENCODE: value})}
              >
                <SelectTrigger className={formErrors.D_CENCODE ? "border-red-500" : ""}>
                  <SelectValue placeholder="* 센터 선택" />
                </SelectTrigger>
                <SelectContent>
                  {centers.map((center) => (
                    <SelectItem key={center.C_CODE} value={center.C_CODE}>
                      {center.C_NAME}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* 후원인/추천인 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Button 
                  type="button" 
                  className="w-full mb-2"
                  onClick={() => openSearchDialog('sponsor')}
                >
                  후원인 검색
                </Button>
                <Input
                  id="D_SID"
                  placeholder="후원인"
                  value={formData.D_SID}
                  readOnly
                  className={formErrors.D_SID ? "border-red-500" : ""}
                />
              </div>
              <div>
                <Button 
                  type="button" 
                  className="w-full mb-2"
                  onClick={() => openSearchDialog('recommender')}
                >
                  추천인 검색
                </Button>
                <Input
                  id="D_RID"
                  placeholder="추천인"
                  value={formData.D_RID}
                  readOnly
                  className={formErrors.D_RID ? "border-red-500" : ""}
                />
              </div>
            </div>
            
            <hr className="my-4 border-gray-200" />
            
            {/* 은행 정보 */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Select 
                  value={formData.B_CODE} 
                  onValueChange={(value) => setFormData({...formData, B_CODE: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="은행 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.B_CODE} value={bank.B_CODE}>
                        {bank.B_NAME}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  id="B_OWNER"
                  placeholder="예금주"
                  value={formData.B_OWNER}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <Input
                id="B_IDNO"
                placeholder="계좌번호"
                value={formData.B_IDNO}
                onChange={handleInputChange}
              />
            </div>
            
            <hr className="my-4 border-gray-200" />
            
            {/* 약관 동의 */}
            <div className="flex items-center justify-center mb-4 space-x-2">
              <Checkbox 
                id="terms" 
                checked={formData.terms}
                onCheckedChange={handleCheckboxChange}
              />
              <label htmlFor="terms" className="text-sm">
                서비스 이용약관에 동의합니다.
              </label>
            </div>
            
            <div className="text-center mb-4">
              <span 
                className="text-blue-600 hover:underline cursor-pointer text-sm"
                onClick={() => setTermsDialogOpen(true)}
              >
                약관 내용 보기
              </span>
            </div>
            
            {/* 에러 메시지 */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* 제출 버튼 */}
            <Button 
              type="submit" 
              className="w-full py-6" 
              disabled={isLoading}
            >
              {isLoading ? '처리 중...' : '회원가입'}
            </Button>
            
            {/* 로그인 링크 */}
            <div className="mt-4 text-center">
              <Link href="/login" className="text-blue-600 hover:underline">
                이미 계정이 있으신가요? 로그인하기
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* 검색 다이얼로그 */}
      <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {searchType === 'sponsor' ? '후원인 검색' : '추천인 검색'}
            </DialogTitle>
            <DialogDescription>
              검색할 아이디를 입력하세요 (최소 4자 이상)
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2">
            <Input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어 입력"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  performSearch()
                }
              }}
            />
            <Button type="button" onClick={performSearch} disabled={isLoading}>
              검색
            </Button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="border rounded-md max-h-60 overflow-auto">
              <div className="flex font-semibold border-b p-2">
                <div className="flex-1">아이디</div>
                <div className="w-20"></div>
              </div>
              
              {searchResults.map((result) => (
                <div key={result.D_UID} className="flex border-b p-2 items-center">
                  <div className="flex-1">{result.D_UID}</div>
                  <div className="w-20">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => selectSearchResult(result.D_UID)}
                    >
                      선택
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                닫기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 약관 다이얼로그 */}
      <Dialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>이용약관</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-bold mb-2">개인정보 처리방침</h4>
              <div className="bg-gray-50 p-3 rounded-md h-40 overflow-auto text-sm">
                본 서비스는 회원님의 개인정보를 중요시하며, 정보통신망 이용촉진 및 정보보호 등에 관한 법률을 준수하고 있습니다.
                회사는 개인정보처리방침을 통하여 회원님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-2">서비스 이용약관</h4>
              <div className="bg-gray-50 p-3 rounded-md h-40 overflow-auto text-sm">
                본 약관은 서비스 이용에 관한 제반 사항과 회원의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
                회사는 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" onClick={() => setTermsDialogOpen(false)}>
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 