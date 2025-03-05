import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">LINK BOT</h3>
            <p className="text-sm text-muted-foreground">
              고빈도 알고리즘 트레이딩을 통한 암호화폐 투자 솔루션
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  프로젝트 개요
                </Link>
              </li>
              <li>
                <Link href="/#business" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  사업 모델
                </Link>
              </li>
              <li>
                <Link href="/#investment" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  투자 계획
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">정보</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#risk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  리스크 관리
                </Link>
              </li>
              <li>
                <Link href="/#roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  로드맵
                </Link>
              </li>
              <li>
                <Link href="/#seminar" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  세미나
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">문의</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                이메일: info@linkbot.com
              </li>
              <li className="text-sm text-muted-foreground">
                전화: 02-123-4567
              </li>
              <li className="text-sm text-muted-foreground">
                주소: 서울특별시 강남구
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} LINK BOT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 