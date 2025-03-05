import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function Investment() {
  const investmentPlans = [
    { grade: "스타터", minimum: "1,000 USDT", roi: "30%", period: "3개월" },
    { grade: "프리미엄", minimum: "5,000 USDT", roi: "35%", period: "6개월" },
    { grade: "엘리트", minimum: "10,000 USDT", roi: "40%", period: "12개월" }
  ];

  return (
    <section id="investment" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">투자유치 계획</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>목표 투자</CardTitle>
            </CardHeader>
            <CardContent>
              <p>초기 트레이딩 자본 및 운영 비용 포함</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>예상 ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <p>월평균 30% ~ 40% 이상 목표</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle>투자 등급별 수익률</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>투자 등급</TableHead>
                  <TableHead>최소 투자액</TableHead>
                  <TableHead>예상 월 수익률</TableHead>
                  <TableHead>계약 기간</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investmentPlans.map((plan, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{plan.grade}</TableCell>
                    <TableCell>{plan.minimum}</TableCell>
                    <TableCell>{plan.roi}</TableCell>
                    <TableCell>{plan.period}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 