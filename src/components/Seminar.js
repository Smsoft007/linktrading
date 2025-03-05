import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react";

export function Seminar() {
  const seminars = [
    {
      title: "암호화폐 투자 기초 세미나",
      date: "2024년 4월 15일",
      location: "서울 강남구",
      capacity: "50명 제한",
      description: "암호화폐 시장의 기본 개념과 투자 전략에 대한 입문 세미나"
    },
    {
      title: "알고리즘 트레이딩 심화 과정",
      date: "2024년 5월 20일",
      location: "서울 영등포구",
      capacity: "30명 제한",
      description: "LINK BOT 알고리즘의 작동 원리와 고급 트레이딩 전략 소개"
    },
    {
      title: "글로벌 암호화폐 시장 전망",
      date: "2024년 6월 10일",
      location: "부산 해운대구",
      capacity: "100명 제한",
      description: "2024년 하반기 글로벌 암호화폐 시장 전망과 투자 기회 분석"
    }
  ];

  return (
    <section id="seminar" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">투자자 세미나</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">LINK BOT 투자자를 위한 정기 세미나 일정입니다</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seminars.map((seminar, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle>{seminar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{seminar.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{seminar.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{seminar.capacity}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{seminar.description}</p>
                  <Button className="w-full">신청하기</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 