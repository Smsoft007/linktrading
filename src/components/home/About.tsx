import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-32 bg-gray-950">
      <div className="container">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 premium-gradient-text">프로젝트 개요</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="premium-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-100">프로젝트 목표</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-gray-300 leading-relaxed">고빈도 알고리즘 트레이딩 사업을 통해 리스크 관리 기반의 투자 및 암호화 화폐 시장에서의 수익 창출</p>
            </CardContent>
          </Card>
          
          <Card className="premium-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-100">시장 성장성</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-gray-300 leading-relaxed">2024년 글로벌 암호화 화폐 시장 규모 2조 USD 이상 예상</p>
            </CardContent>
          </Card>
          
          <Card className="premium-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-100">경쟁 우위</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-gray-300 leading-relaxed">기존 대형 트레이딩 업체와의 차별화된 알고리즘 기반의 트레이딩 전략</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 