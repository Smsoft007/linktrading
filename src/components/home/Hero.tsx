import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16">
      {/* 배경 */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-950 to-blue-950"></div>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 premium-gradient-text tracking-tight leading-none">
            LINK TRADING<br className="hidden sm:block" /> BUSINESS
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-8 sm:mb-12 leading-relaxed max-w-3xl">
            고빈도 알고리즘 트레이딩을 통한<br className="sm:hidden" /> 리스크 관리 기반의<br className="sm:hidden" /> 암호화폐 투자 솔루션
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center sm:justify-start">
            <Button className="premium-button text-lg sm:text-xl py-5 sm:py-7 px-8 sm:px-10 w-full sm:w-auto" size="lg" asChild>
              <a href="#investment">투자 시작하기</a>
            </Button>
            <Button className="text-lg sm:text-xl py-5 sm:py-7 px-8 sm:px-10 bg-gray-800 hover:bg-gray-700 border-blue-500 w-full sm:w-auto mt-4 sm:mt-0" size="lg" variant="outline" asChild>
              <a href="#about">자세히 알아보기</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 