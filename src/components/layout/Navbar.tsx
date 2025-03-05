'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage, languages } from '@/hooks/useLanguage'

const menuItems = [
  { label: '특징', href: '#features' },
  { label: '지갑', href: '#wallet' },
  { label: '시세', href: '#prices' }
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const { currentLanguage, setLanguage } = useLanguage()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
              GuRu
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://t.me/autousdt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              텔레그램
            </Link>
            {/* 언어 선택 */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={currentLanguage.flag}
                    alt={currentLanguage.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{currentLanguage.nativeName}</span>
              </button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-900/90 backdrop-blur-lg border border-gray-800/50 shadow-lg py-2 z-50"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setLanguage(language)
                          setIsLanguageOpen(false)
                        }}
                        className={`flex items-center space-x-3 w-full px-4 py-2 text-sm ${
                          currentLanguage.code === language.code
                            ? 'text-white bg-blue-500/20'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        } transition-colors`}
                      >
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={language.flag}
                            alt={language.name}
                            width={24}
                            height={24}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{language.nativeName}</span>
                        {currentLanguage.code === language.code && (
                          <motion.div
                            layoutId="activeLanguage"
                            className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-auto"
                          />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴 열기/닫기"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-950/80 backdrop-blur-lg z-40"
            onClick={() => setIsOpen(false)}
          >
            <div className="absolute inset-x-4 top-20 rounded-2xl bg-gray-900/90 border border-gray-800/50 p-6 space-y-6" onClick={e => e.stopPropagation()}>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block text-lg text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              {/* 모바일 언어 선택 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: menuItems.length * 0.1 }}
                className="pt-4 border-t border-gray-800/50"
              >
                <div className="flex flex-col space-y-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLanguage(language)
                        setIsOpen(false)
                      }}
                      className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${
                        currentLanguage.code === language.code
                          ? 'text-white bg-blue-500/20'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      } transition-colors`}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={language.flag}
                          alt={language.name}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span>{language.nativeName}</span>
                      {currentLanguage.code === language.code && (
                        <motion.div
                          layoutId="mobileActiveLanguage"
                          className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-auto"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}