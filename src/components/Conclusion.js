import React from 'react';
import { Button } from "@/components/ui/button";

export function Conclusion() {
  return (
    <section id="conclusion" className="py-20 bg-primary/5">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">지금 LINK BOT과 함께 시작하세요</h2>
          <p className="text-lg text-muted-foreground mb-8">
            고빈도 알고리즘 트레이딩의 힘을 활용하여 암호화폐 시장에서 안정적인 수익을 창출하세요.
            LINK BOT의 전문 팀과 함께라면 변동성 높은 시장에서도 체계적인 투자가 가능합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="#investment">투자 시작하기</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#about">더 알아보기</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 