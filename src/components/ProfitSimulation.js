import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ProfitSimulation() {
  const [investment, setInvestment] = useState(1000);
  const [period, setPeriod] = useState(12);
  const [result, setResult] = useState(null);

  const calculateProfit = () => {
    // 월 평균 수익률 2.5%로 가정 (연 30%)
    const monthlyRate = 0.025;
    let totalAmount = investment;
    
    for (let i = 0; i < period; i++) {
      totalAmount += totalAmount * monthlyRate;
    }
    
    const profit = totalAmount - investment;
    const roi = (profit / investment) * 100;
    
    setResult({
      totalAmount: totalAmount.toFixed(2),
      profit: profit.toFixed(2),
      roi: roi.toFixed(2)
    });
  };

  return (
    <section id="simulation" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">수익 시뮬레이션</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">투자 금액과 기간을 입력하여 예상 수익을 확인해보세요</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-center">투자 수익 계산기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="investment">투자 금액 (USDT)</Label>
                  <Input
                    id="investment"
                    type="number"
                    min="100"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">투자 기간 (개월)</Label>
                  <Input
                    id="period"
                    type="number"
                    min="1"
                    max="60"
                    value={period}
                    onChange={(e) => setPeriod(Number(e.target.value))}
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <Button onClick={calculateProfit} className="w-full">수익 계산하기</Button>
              
              {result && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">예상 결과 (월 평균 2.5% 수익률 기준)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">총 자산</p>
                      <p className="text-xl font-bold">{result.totalAmount} USDT</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">순수익</p>
                      <p className="text-xl font-bold text-green-500">+{result.profit} USDT</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">수익률</p>
                      <p className="text-xl font-bold text-green-500">+{result.roi}%</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-8 text-sm text-muted-foreground text-center">
            <p>* 위 시뮬레이션은 예상치이며, 실제 수익은 시장 상황에 따라 달라질 수 있습니다.</p>
            <p>* 과거 성과가 미래 수익을 보장하지 않습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 