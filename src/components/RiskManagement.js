import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RiskManagement() {
  return (
    <section id="risk" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">리스크 관리</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>분산 투자</CardTitle>
            </CardHeader>
            <CardContent>
              <p>다양한 암호화폐에 분산 투자하여 단일 자산 리스크를 최소화합니다. 시장 상황에 따라 자산 배분 비율을 조정합니다.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>손절매 전략</CardTitle>
            </CardHeader>
            <CardContent>
              <p>모든 거래에 자동 손절매 전략을 적용하여 하락장에서의 손실을 제한합니다. 최대 손실률을 사전에 설정합니다.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>변동성 관리</CardTitle>
            </CardHeader>
            <CardContent>
              <p>시장 변동성에 따라 포지션 크기를 조절하고, 극단적 변동성 상황에서는 자동으로 포지션을 축소합니다.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 