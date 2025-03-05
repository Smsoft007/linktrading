import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Roadmap() {
  const roadmapItems = [
    {
      period: "1-3개월",
      title: "초기 단계",
      description: "알고리즘 초기 투자유치 및 트레이딩 시작",
      items: ["알고리즘 최적화", "초기 투자자 유치", "트레이딩 시스템 테스트"]
    },
    {
      period: "6-12개월",
      title: "성장 단계",
      description: "공식 서비스 런칭 및 투자 확장",
      items: ["공식 플랫폼 런칭", "투자 포트폴리오 확장", "마케팅 활동 강화"]
    },
    {
      period: "12개월 이후",
      title: "확장 단계",
      description: "Web3 DeFi 연계 확장 고려",
      items: ["DeFi 프로토콜 통합", "글로벌 시장 진출", "추가 서비스 개발"]
    }
  ];

  return (
    <section id="roadmap" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">실행 계획 (로드맵)</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* 중앙 라인 */}
          <div className="roadmap-line"></div>
          
          {roadmapItems.map((item, index) => (
            <div key={index} className={`relative mb-16 flex ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } flex-col md:gap-8`}>
              <div className="md:w-1/2 flex md:justify-end items-center z-10 mb-4 md:mb-0">
                <Badge variant="outline" className="bg-primary text-primary-foreground px-4 py-2 text-sm md:text-base">
                  {item.period}
                </Badge>
              </div>
              
              <div className="md:w-1/2 z-10">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{item.description}</p>
                    <ul className="space-y-2">
                      {item.items.map((listItem, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 