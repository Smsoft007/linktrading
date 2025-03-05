import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="description" content="LINK BOT TRADING BUSINESS - 고빈도 알고리즘 트레이딩을 통한 암호화폐 투자 솔루션" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 