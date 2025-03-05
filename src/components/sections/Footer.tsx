'use client'

import { motion } from 'framer-motion'
import { FaTelegram, FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa'

const socialLinks = [
  { icon: FaTelegram, href: 'https://t.me/autousdt', label: '텔레그램' },
  { icon: FaGithub, href: 'https://github.com/autousdt', label: '깃허브' },
  { icon: FaDiscord, href: 'https://discord.gg/autousdt', label: '디스코드' },
  { icon: FaTwitter, href: 'https://twitter.com/autousdt', label: '트위터' }
]

const footerLinks = [
  {
    title: '서비스',
    links: [
      { label: '자동 거래', href: '#auto-trading' },
      { label: '실시간 모니터링', href: '#monitoring' },
      { label: '거래 전략', href: '#strategies' },
      { label: '가격 정책', href: '#pricing' }
    ]
  },
  {
    title: '회사 소개',
    links: [
      { label: '회사 소개', href: '/about' },
      { label: '이용약관', href: '/terms' },
      { label: '개인정보처리방침', href: '/privacy' },
      { label: '문의하기', href: '/contact' }
    ]
  },
  {
    title: '리소스',
    links: [
      { label: '도움말', href: '/help' },
      { label: '문서', href: '/docs' },
      { label: '블로그', href: '/blog' },
      { label: 'API', href: '/api' }
    ]
  }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gray-950 pt-24 pb-12 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.1),_transparent_70%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* 로고 및 설명 */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500">
                AUTO USDT
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                안전하고 효율적인 자동 거래 시스템으로 암호화폐 투자의 새로운 기준을 제시합니다.
                전문가들과 함께 성장하는 커뮤니티에 참여하세요.
              </p>
            </motion.div>

            {/* 소셜 링크 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-900/50 hover:bg-gray-900 flex items-center justify-center text-gray-400 hover:text-blue-500 transition-all hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="text-xl" />
                  </a>
                )
              })}
            </motion.div>
          </div>

          {/* 링크 섹션 */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (sectionIndex + 2) }}
            >
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-500 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 하단 저작권 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 mt-8 border-t border-gray-800/50"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              {currentYear} AUTO USDT. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/terms" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
                이용약관
              </a>
              <a href="/privacy" className="text-gray-400 hover:text-blue-500 transition-colors text-sm">
                개인정보처리방침
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
