'use client';

import React, { useEffect, useRef } from 'react';

interface StarryBackgroundProps {
  starCount?: number;
  speed?: number;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({
  starCount = 100,
  speed = 0.05
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기를 창 크기에 맞게 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 초기 설정
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 별 색상 배열
    const starColors = [
      'rgba(255, 255, 255, opacity)', // 흰색
      'rgba(173, 216, 230, opacity)', // 연한 파란색
      'rgba(255, 223, 186, opacity)', // 연한 주황색
      'rgba(173, 255, 186, opacity)', // 연한 녹색
      'rgba(186, 173, 255, opacity)', // 연한 보라색
    ];

    // 별 생성
    const stars: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speed: number;
      color: string;
      twinkleSpeed: number;
      twinkleDirection: number;
      moveX: number;
      moveY: number;
    }[] = [];
    
    for (let i = 0; i < starCount; i++) {
      const colorIndex = Math.floor(Math.random() * starColors.length);
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5, // 최소 크기 증가
        opacity: Math.random() * 0.5 + 0.3, // 초기 불투명도 조정
        speed: Math.random() * speed + 0.01,
        color: starColors[colorIndex],
        twinkleSpeed: Math.random() * 0.01 + 0.003, // 깜빡임 속도
        twinkleDirection: Math.random() > 0.5 ? 1 : -1, // 깜빡임 방향
        moveX: (Math.random() - 0.5) * 0.2, // X축 이동 속도
        moveY: (Math.random() - 0.5) * 0.2  // Y축 이동 속도
      });
    }

    // 애니메이션 함수
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 별 그리기
      stars.forEach(star => {
        // 별 깜빡임 효과
        star.opacity += star.twinkleSpeed * star.twinkleDirection;
        
        // 불투명도 방향 전환
        if (star.opacity <= 0.1 || star.opacity >= 0.9) {
          star.twinkleDirection *= -1;
        }
        
        // 불투명도 범위 제한
        star.opacity = Math.max(0.1, Math.min(0.9, star.opacity));
        
        // 별 이동 (사인파를 이용한 부드러운 움직임)
        star.x += star.moveX * Math.sin(time * star.speed);
        star.y += star.moveY * Math.cos(time * star.speed);
        
        // 화면 경계 처리
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // 별 그리기
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        
        // 색상 적용
        const color = star.color.replace('opacity', star.opacity.toString());
        ctx.fillStyle = color;
        ctx.fill();
        
        // 큰 별에 글로우 효과 추가
        if (star.size > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = color.replace('opacity', (star.opacity * 0.3).toString());
          ctx.fill();
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // 클린업 함수
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarryBackground; 