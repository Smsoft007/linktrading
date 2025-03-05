import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/hooks/useAuth'
import { ErrorDialogProvider } from '@/components/ErrorDialog'
import { Toaster } from '@/components/ui/sonner'
import { ToastProvider } from '@/components/ui/toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LINK BOT TRADING BUSINESS',
  description: '고빈도 알고리즘 트레이딩을 통한 안정적인 수익 창출 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className} h-full w-full`}>
        <AuthProvider>
          <ToastProvider>
            <ErrorDialogProvider>
              <div className="flex flex-col min-h-screen w-full">
                {children}
              </div>
              <Toaster />
            </ErrorDialogProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
