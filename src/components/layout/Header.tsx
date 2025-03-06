'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { Menu, X, Globe, Moon, Sun, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  transparent?: boolean
}

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState('한국어')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    setIsLanguageMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${transparent ? 'bg-transparent' : 'bg-black/80 backdrop-blur-sm border-b border-gray-800'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              LINK BOT TRADING
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
              특징
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              가격
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              회사 소개
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
              블로그
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
              >
                <Icon icon={Globe} size={18} />
                <span>{language}</span>
                <Icon icon={ChevronDown} size={16} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-900 border border-gray-800 rounded-md shadow-lg py-1 z-10">
                  <button 
                    onClick={() => changeLanguage('한국어')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    한국어
                  </button>
                  <button 
                    onClick={() => changeLanguage('English')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    English
                  </button>
                  <button 
                    onClick={() => changeLanguage('日本語')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    日本語
                  </button>
                  <button 
                    onClick={() => changeLanguage('中文')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    中文
                  </button>
                </div>
              )}
            </div>

            <Button 
              variant="outline" 
              onClick={() => router.push('/login')}
              className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
            >
              로그인
            </Button>
            <Button 
              onClick={() => router.push('/register')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              회원가입
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={toggleMenu}
          >
            <Icon icon={isMenuOpen ? X : Menu} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
                특징
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                가격
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                회사 소개
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                블로그
              </Link>
              
              {/* Language Selector */}
              <div className="py-2">
                <button 
                  onClick={toggleLanguageMenu}
                  className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                >
                  <Icon icon={Globe} size={18} />
                  <span>{language}</span>
                  <Icon icon={ChevronDown} size={16} />
                </button>
                
                {isLanguageMenuOpen && (
                  <div className="mt-2 bg-gray-900 border border-gray-800 rounded-md shadow-lg py-1">
                    <button 
                      onClick={() => changeLanguage('한국어')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      한국어
                    </button>
                    <button 
                      onClick={() => changeLanguage('English')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      English
                    </button>
                    <button 
                      onClick={() => changeLanguage('日本語')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      日本語
                    </button>
                    <button 
                      onClick={() => changeLanguage('中文')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                      中文
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/login')}
                  className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600"
                >
                  로그인
                </Button>
                <Button 
                  onClick={() => router.push('/register')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  회원가입
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
