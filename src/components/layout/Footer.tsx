'use client'

import Link from 'next/link'
import Image from 'next/image'
import { RiGithubFill, RiTwitterFill, RiDiscordFill, RiTelegramFill } from 'react-icons/ri'

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 및 회사 정보 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image 
                  src="/images/crypto-logo.svg" 
                  alt="LINK TRADING Logo" 
                  width={32} 
                  height={32} 
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-primary">LINK TRADING</span>
            </div>
            <p className="text-sm text-muted-foreground">
              암호화폐 트레이딩 솔루션을 제공하는 글로벌 리더
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">프로젝트 개요</Link></li>
              <li><Link href="/#business" className="text-muted-foreground hover:text-primary transition-colors">사업 모델</Link></li>
              <li><Link href="/#investment" className="text-muted-foreground hover:text-primary transition-colors">투자 계획</Link></li>
              <li><Link href="/#roadmap" className="text-muted-foreground hover:text-primary transition-colors">로드맵</Link></li>
            </ul>
          </div>

          {/* 리소스 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">리소스</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">자주 묻는 질문</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">이용약관</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">문의하기</Link></li>
            </ul>
          </div>

          {/* 소셜 미디어 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">소셜 미디어</h3>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <RiTwitterFill className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <RiTelegramFill className="w-5 h-5" />
                <span className="sr-only">Telegram</span>
              </Link>
              <Link href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <RiDiscordFill className="w-5 h-5" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <RiGithubFill className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LINK TRADING. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
