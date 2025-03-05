import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [investmentData, setInvestmentData] = useState({
    totalInvested: 5000,
    currentValue: 6250,
    profit: 1250,
    roi: 25,
    transactions: [
      { id: 1, date: '2024-03-01', type: '입금', amount: 3000, status: '완료' },
      { id: 2, date: '2024-03-15', type: '입금', amount: 2000, status: '완료' },
      { id: 3, date: '2024-04-01', type: '출금', amount: 500, status: '처리 중' }
    ]
  });

  useEffect(() => {
    // 로그인 상태가 아니면 홈으로 리다이렉트
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  return (
    <>
      <Head>
        <title>대시보드 | LINK BOT</title>
      </Head>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">대시보드</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>총 투자금</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{investmentData.totalInvested.toLocaleString()} USDT</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>현재 가치</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{investmentData.currentValue.toLocaleString()} USDT</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>수익률</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-500">+{investmentData.roi}%</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>최근 거래 내역</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">날짜</th>
                    <th className="text-left py-2">유형</th>
                    <th className="text-left py-2">금액</th>
                    <th className="text-left py-2">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentData.transactions.map((tx) => (
                    <tr key={tx.id} className="border-b">
                      <td className="py-2">{tx.date}</td>
                      <td className="py-2">{tx.type}</td>
                      <td className="py-2">{tx.amount.toLocaleString()} USDT</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === '완료' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Button>추가 투자하기</Button>
        </div>
      </div>
    </>
  );
} 