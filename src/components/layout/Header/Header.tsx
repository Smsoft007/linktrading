import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Button from '@/components/common/Button';
import MobileMenu from './MobileMenu';
import { ROUTES } from '@/config/routes';
import styles from './Header.module.css';

interface HeaderProps {
  openAuthModal: (tab: 'login' | 'register') => void;
}

const Header: React.FC<HeaderProps> = ({ openAuthModal }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    router.push(ROUTES.HOME);
  };

  const navLinks = [
    { href: '/#about', label: '프로젝트 개요' },
    { href: '/#business', label: '사업 모델' },
    { href: '/#investment', label: '투자 계획' },
    { href: '/#risk', label: '리스크 관리' },
    { href: '/#roadmap', label: '로드맵' },
    { href: '/#seminar', label: '세미나' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href={ROUTES.HOME} className={styles.logo}>
            <Image src="/logo.png" alt="LINK BOT Logo" width={40} height={40} className={styles.logoImage} />
            <span className={styles.logoText}>LINK BOT</span>
          </Link>
          
          {isMobile ? (
            <button 
              className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.active : ''}`} 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          ) : (
            <div className={styles.navLinks}>
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={styles.navLink}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className={styles.userMenu}>
                  <Link href={ROUTES.DASHBOARD} className={styles.dashboardLink}>
                    내 계정
                  </Link>
                  <Button 
                    variant="text" 
                    size="small" 
                    onClick={handleLogout}
                  >
                    로그아웃
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={() => openAuthModal('login')}
                >
                  로그인
                </Button>
              )}
            </div>
          )}
        </nav>
      </div>
      
      {isMobile && (
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navLinks={navLinks}
          isAuthenticated={isAuthenticated}
          openAuthModal={openAuthModal}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default Header; 