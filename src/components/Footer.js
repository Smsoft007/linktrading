import React from 'react';
import { FaTelegram, FaTwitter, FaDiscord, FaMedium } from 'react-icons/fa';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-logo">
          <img src={logo} alt="LINK BOT Logo" className="footer-logo-image" />
          <span className="footer-logo-text">LINK BOT</span>
        </div>
        
        <div className="footer-links">
          <a href="#about">프로젝트 개요</a>
          <a href="#business">사업 모델</a>
          <a href="#investment">투자 계획</a>
          <a href="#risk">리스크 관리</a>
          <a href="#roadmap">로드맵</a>
          <a href="#seminar">세미나</a>
        </div>
        <div className="social-icons">
          <a href="#" className="social-icon"><FaTelegram /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaDiscord /></a>
          <a href="#" className="social-icon"><FaMedium /></a>
        </div>
        <p className="copyright">© 2024 LINK BOT TRADING BUSINESS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 