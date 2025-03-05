"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Globe, ChevronDown, TrendingUp, Shield, Zap, 
  User, LogOut, Settings, Bell, BarChart2, Wallet, Layout, Search
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/register');
  const isDashboard = pathname?.includes('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full ${
        isScrolled
          ? 'scrolled-header'
          : isAuthPage
          ? 'bg-transparent'
          : 'premium-header'
      } transition-all duration-300 py-4 px-6 fixed top-0 left-0 right-0 z-50`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 shadow-lg transition-all duration-300 group-hover:shadow-primary/50">
              <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-full m-0.5 flex items-center justify-center">
                <img src="/images/logo.png" alt="LINK BOT TRADING Logo" className="w-7 h-7 object-contain" />
              </div>
            </div>
            <span className="text-xl font-bold premium-text-gradient hidden md:block">LINK BOT TRADING</span>
          </Link>
          
          {!isAuthPage && (
            <nav className="hidden md:flex ml-10 space-x-8">
              <Link 
                href="/" 
                className={`text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors relative group ${
                  pathname === '/' ? 'text-primary dark:text-primary font-medium' : ''
                }`}
              >
                홈
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  pathname === '/' ? 'w-full' : 'w-0'
                }`}></span>
              </Link>
              <Link 
                href="/about" 
                className={`text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors relative group ${
                  pathname === '/about' ? 'text-primary dark:text-primary font-medium' : ''
                }`}
              >
                소개
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  pathname === '/about' ? 'w-full' : 'w-0'
                }`}></span>
              </Link>
              <Link 
                href="/services" 
                className={`text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors relative group ${
                  pathname === '/services' ? 'text-primary dark:text-primary font-medium' : ''
                }`}
              >
                서비스
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  pathname === '/services' ? 'w-full' : 'w-0'
                }`}></span>
              </Link>
              <Link 
                href="/contact" 
                className={`text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors relative group ${
                  pathname === '/contact' ? 'text-primary dark:text-primary font-medium' : ''
                }`}
              >
                문의하기
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  pathname === '/contact' ? 'w-full' : 'w-0'
                }`}></span>
              </Link>
              {isDashboard && (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors relative group ${
                      pathname === '/dashboard' ? 'text-primary dark:text-primary font-medium' : ''
                    }`}
                  >
                    대시보드
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                      pathname === '/dashboard' ? 'w-full' : 'w-0'
                    }`}></span>
                  </Link>
                  <Link 
                    href="/dashboard/trading" 
                    className={`text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors relative group ${
                      pathname === '/dashboard/trading' ? 'text-primary dark:text-primary font-medium' : ''
                    }`}
                  >
                    트레이딩
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                      pathname === '/dashboard/trading' ? 'w-full' : 'w-0'
                    }`}></span>
                  </Link>
                  <Link 
                    href="/dashboard/history" 
                    className={`text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors relative group ${
                      pathname === '/dashboard/history' ? 'text-primary dark:text-primary font-medium' : ''
                    }`}
                  >
                    거래내역
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                      pathname === '/dashboard/history' ? 'w-full' : 'w-0'
                    }`}></span>
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isAuthPage && (
            <div className="hidden md:flex relative">
              <Input
                type="text"
                placeholder="검색..."
                className="w-40 lg:w-64 h-9 pl-9 rounded-full bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-primary/20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              {!isAuthPage && (
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                    3
                  </Badge>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all">
                    <Avatar className="h-full w-full">
                      <AvatarImage src="/images/placeholder.png" alt={user.name || 'User'} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 p-2">
                  <div className="flex items-center gap-3 p-2 mb-1 rounded-md bg-gray-50 dark:bg-gray-800/50">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/images/placeholder.png" alt={user.name || 'User'} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name || 'User'}</span>
                      <span className="text-xs text-gray-500">{user.email || 'user@example.com'}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 my-1">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <div className="h-4 w-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                      </div>
                      <span>대시보드</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 my-1">
                    <Link href="/profile" className="flex items-center gap-2">
                      <div className="h-4 w-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <span>프로필</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 my-1">
                    <Link href="/settings" className="flex items-center gap-2">
                      <div className="h-4 w-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                      </div>
                      <span>설정</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => logout()} 
                    className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md p-2 my-1 text-red-600 dark:text-red-400"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                      </div>
                      <span>로그아웃</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            !isAuthPage && (
              <div className="flex items-center gap-2">
                <Button asChild variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-transparent">
                  <Link href="/login">로그인</Link>
                </Button>
                <Button asChild className="premium-button">
                  <Link href="/register">회원가입</Link>
                </Button>
              </div>
            )
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400">
                <Globe className="h-5 w-5" />
                <span className="sr-only">언어 선택</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-1 p-2 min-w-[150px]">
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 my-1 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/images/flags/kr.svg" alt="한국어" className="w-full h-full object-cover" />
                </div>
                <span>한국어</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 my-1 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/images/flags/us.svg" alt="English" className="w-full h-full object-cover" />
                </div>
                <span>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 my-1 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/images/flags/jp.svg" alt="日本語" className="w-full h-full object-cover" />
                </div>
                <span>日本語</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 my-1 flex items-center gap-2">
                <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                  <img src="/images/flags/cn.svg" alt="中文" className="w-full h-full object-cover" />
                </div>
                <span>中文</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-600 dark:text-gray-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && !isAuthPage && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg py-4 px-6 z-50 border-t border-gray-200 dark:border-gray-800">
          <div className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="검색..."
                className="w-full h-10 pl-10 rounded-lg bg-gray-100 dark:bg-gray-800 border-0"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 ${
                pathname === '/' ? 'text-primary dark:text-primary font-medium' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              홈
            </Link>
            <Link
              href="/about"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 ${
                pathname === '/about' ? 'text-primary dark:text-primary font-medium' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              소개
            </Link>
            <Link
              href="/services"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 ${
                pathname === '/services' ? 'text-primary dark:text-primary font-medium' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              서비스
            </Link>
            <Link
              href="/contact"
              className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 ${
                pathname === '/contact' ? 'text-primary dark:text-primary font-medium' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              문의하기
            </Link>
            {isDashboard && (
              <>
                <div className="h-px bg-gray-200 dark:bg-gray-800 my-2"></div>
                <Link
                  href="/dashboard"
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 ${
                    pathname === '/dashboard' ? 'text-primary dark:text-primary font-medium' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  대시보드
                </Link>
                <Link
                  href="/dashboard/trading"
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 ${
                    pathname === '/dashboard/trading' ? 'text-primary dark:text-primary font-medium' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  트레이딩
                </Link>
                <Link
                  href="/dashboard/history"
                  className={`text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2 ${
                    pathname === '/dashboard/history' ? 'text-primary dark:text-primary font-medium' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  거래내역
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
} 