import React, { useState, useEffect } from 'react';
// import { AuthModal } from './Auth/AuthModal';
import { LoginModal } from './auth/LoginModal';

function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userName, setUserName] = useState('');

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 로그인 상태 확인
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token) {
        setIsLoggedIn(true);
        
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            setUserName(user.name || '사용자');
          } catch (e) {
            console.error('사용자 정보 파싱 오류:', e);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    
    // 페이지 새로고침
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 로그인 페이지로 이동
  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo-container">
          <a href="/" className="logo">
            <img src="/logo.png" alt="LINK TRADING" className="logo-image" />
            <div className="logo-text">
              <span className="logo-main">LINK TRADING</span>
              <span className="logo-slogan">Connecting Opportunities, Trading Success</span>
            </div>
          </a>
        </div>
        
        <button className="menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><a href="/" className="nav-item">홈</a></li>
            <li><a href="/about" className="nav-item">회사소개</a></li>
            <li><a href="/services" className="nav-item">서비스</a></li>
            <li><a href="/contact" className="nav-item">문의하기</a></li>
          </ul>
          
          <div className="user-menu">
            {isLoggedIn ? (
              <div className="user-profile">
                <span className="user-name">{userName}님</span>
                <div className="user-dropdown">
                  <a href="/dashboard" className="dropdown-item">대시보드</a>
                  <a href="/profile" className="dropdown-item">프로필</a>
                  <button onClick={handleLogout} className="dropdown-item">로그아웃</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={navigateToLogin} 
                className="login-button"
              >
                로그인
              </button>
            )}
          </div>
        </nav>
      </div>
      
      {/* LoginModal 사용 */}
      <LoginModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
}

export default Header; 