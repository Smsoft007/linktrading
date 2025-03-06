import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LINK BOT TRADING | 암호화폐 알고리즘 트레이딩",
  description: "고빈도 알고리즘 트레이딩을 통한 리스크 관리 기반의 암호화폐 투자 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="data:," />
      </head>
      <body className={`${inter.variable} min-h-screen bg-background text-foreground`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 