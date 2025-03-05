import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Award, BarChart3 } from "lucide-react";

export function BusinessModel() {
  const revenueItems = [
    {
      icon: <TrendingUp className="h-16 w-16 text-blue-400" />,
      title: "거래차익",
      description: "암호화폐 시장의 가격 변동성을 활용한 알고리즘 트레이딩 수익"
    },
    {
      icon: <DollarSign className="h-16 w-16 text-blue-400" />,
      title: "운용 수수료",
      description: "투자자 자산 운용에 따른 관리 수수료"
    },
    {
      icon: <Award className="h-16 w-16 text-blue-400" />,
      title: "성과 보수",
      description: "목표 수익률 달성 시 발생하는 성과 기반 보수"
    },
    {
      icon: <BarChart3 className="h-16 w-16 text-blue-400" />,
      title: "재투자",
      description: "수익의 일부를 고수익 아이템 사업에 재투자"
    }
  ];

  return (
    <section id="business" className="py-32 bg-gray-900">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 premium-gradient-text">사업 모델 및 수익 구조</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {revenueItems.map((item, index) => (
            <Card key={index} className="premium-card">
              <CardHeader className="flex flex-col items-center pb-4">
                {item.icon}
                <CardTitle className="mt-6 text-2xl md:text-3xl text-gray-100">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-xl text-gray-300 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-24 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">투자 수익 구조</h3>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            USDT 투자에 따른 예상 수익률 제공
          </p>
        </div>
      </div>
    </section>
  );
} 