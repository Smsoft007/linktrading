import React from 'react';

function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-title">
          <h2>프로젝트 개요</h2>
        </div>
        <div className="grid">
          <div className="card">
            <h3>프로젝트 목표</h3>
            <p>고빈도 알고리즘 트레이딩 사업을 통해 리스크 관리 기반의 투자 및 암호화 화폐 시장에서의 수익 창출</p>
          </div>
          <div className="card">
            <h3>시장 성장성</h3>
            <p>2024년 글로벌 암호화 화폐 시장 규모 2조 USD 이상 예상</p>
          </div>
          <div className="card">
            <h3>경쟁 우위</h3>
            <p>기존 대형 트레이딩 업체와의 차별화된 알고리즘 기반의 트레이딩 전략</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About; 