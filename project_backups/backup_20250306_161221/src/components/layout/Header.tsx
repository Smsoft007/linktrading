'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  transparent?: boolean;
}

// 지원하는 언어 목록
const languages = [
  { code: 'KR', name: '한국어', flag: '/images/flags/kr.png' },
  { code: 'US', name: 'English', flag: '/images/flags/us.png' },
  { code: 'JP', name: '日本語', flag: '/images/flags/jp.png' },
  { code: 'CN', name: '中文', flag: '/images/flags/cn.png' },
];

const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [scrolled, setScrolled] = useState(false);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const changeLanguage = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    setIsLanguageMenuOpen(false);
    // 실제 언어 변경 로직은 여기에 추가
    console.log(`Language changed to ${language.name}`);
  };

  // 헤더 클래스 결정
  const headerClass = transparent 
    ? scrolled ? 'header-solid' : 'header-transparent'
    : 'header-solid';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${headerClass}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-40">
              <Image 
                src="/images/logo.png" 
                alt="LINK BOT TRADING" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              소개
            </Link>
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
              기능
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              가격
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              문의
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* 언어 선택 드롭다운 */}
            <div className="relative">
              <button 
                onClick={toggleLanguageMenu}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
              >
                <span className="language-flag">
                  <Image 
                    src={currentLanguage.flag} 
                    alt={currentLanguage.code} 
                    width={24} 
                    height={18} 
                    className="rounded-sm"
                  />
                </span>
                <span className="hidden md:inline ml-2">{currentLanguage.name}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="language-menu">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language)}
                      className={
                        currentLanguage.code === language.code 
                          ? 'language-item-active' 
                          : 'language-item'
                      }
                    >
                      <Image 
                        src={language.flag} 
                        alt={language.code} 
                        width={24} 
                        height={18} 
                        className="rounded-sm mr-2"
                      />
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/login">
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-900/20">
                로그인
              </Button>
            </Link>
            <Link href="/register" className="hidden md:block">
              <Button className="bg-blue-600 hover:bg-blue-700">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 