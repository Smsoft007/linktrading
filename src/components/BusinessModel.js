import React from 'react';

function BusinessModel() {
  return (
    <section id="business" style={{ backgroundColor: 'rgba(108, 92, 231, 0.05)' }}>
      <div className="container">
        <div className="section-title">
          <h2>사업 모델 및 수익 구조</h2>
        </div>
        <div className="grid">
          <div className="card">
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>💹</div>
            <h3>거래차익</h3>
            <p>암호화폐 시장의 가격 변동성을 활용한 알고리즘 트레이딩 수익</p>
          </div>
          <div className="card">
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>💰</div>
            <h3>운용 수수료</h3>
            <p>투자자 자산 운용에 따른 관리 수수료</p>
          </div>
          <div className="card">
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏆</div>
            <h3>성과 보수</h3>
            <p>목표 수익률 달성 시 발생하는 성과 기반 보수</p>
          </div>
          <div className="card">
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>📈</div>
            <h3>재투자</h3>
            <p>수익의 일부를 고수익 아이템 사업에 재투자</p>
          </div>
        </div>
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <h3>투자 수익 구조</h3>
          <p>USDT 투자에 따른 예상 수익률 제공</p>
        </div>
      </div>
    </section>
  );
}

export default BusinessModel; 