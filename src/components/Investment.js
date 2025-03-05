import React from 'react';

function Investment() {
  return (
    <section id="investment">
      <div className="container">
        <div className="section-title">
          <h2>투자유치 계획</h2>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="card">
            <h3>목표 투자</h3>
            <p>초기 트레이딩 자본 및 운영 비용 포함</p>
          </div>
          <div className="card">
            <h3>예상 ROI</h3>
            <p>월평균 30% ~ 40% 이상 목표</p>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>투자 등급</th>
              <th>최소 투자액</th>
              <th>예상 월 수익률</th>
              <th>계약 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>스타터</td>
              <td>1,000 USDT</td>
              <td>30%</td>
              <td>3개월</td>
            </tr>
            <tr>
              <td>프리미엄</td>
              <td>5,000 USDT</td>
              <td>35%</td>
              <td>6개월</td>
            </tr>
            <tr>
              <td>엘리트</td>
              <td>10,000 USDT</td>
              <td>40%</td>
              <td>12개월</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Investment; 