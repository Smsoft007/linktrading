import React from 'react';

function Roadmap() {
  return (
    <section id="roadmap">
      <div className="container">
        <div className="section-title">
          <h2>실행 계획 (로드맵)</h2>
        </div>
        <div className="roadmap">
          <div className="roadmap-item">
            <div className="roadmap-date">1-3개월</div>
            <div className="roadmap-content">
              <h3>초기 단계</h3>
              <p>알고리즘 초기 투자유치 및 트레이딩 시작</p>
              <ul>
                <li>알고리즘 최적화</li>
                <li>초기 투자자 유치</li>
                <li>트레이딩 시스템 테스트</li>
              </ul>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="roadmap-date">6-12개월</div>
            <div className="roadmap-content">
              <h3>성장 단계</h3>
              <p>공식 서비스 런칭 및 투자 확장</p>
              <ul>
                <li>공식 플랫폼 런칭</li>
                <li>투자 포트폴리오 확장</li>
                <li>마케팅 활동 강화</li>
              </ul>
            </div>
          </div>
          <div className="roadmap-item">
            <div className="roadmap-date">12개월 이후</div>
            <div className="roadmap-content">
              <h3>확장 단계</h3>
              <p>Web3 DeFi 연계 확장 고려</p>
              <ul>
                <li>DeFi 프로토콜 통합</li>
                <li>글로벌 시장 진출</li>
                <li>추가 서비스 개발</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Roadmap; 