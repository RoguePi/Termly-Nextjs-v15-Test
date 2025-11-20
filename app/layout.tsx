import './globals.css'
import TermlyCMP from '../components/TermlyCMP'
import { Suspense } from 'react'

export const metadata = {
  title: 'Next.js v16 - Modern Web App',
  description: 'A beautiful and elegant Next.js v16 application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Suspense fallback={null}>
          <TermlyCMP 
            websiteUUID="270c91dd-6788-48d0-823d-1e04be35bede"
            autoBlock={true}
          />
        </Suspense>
        {children}
      </body>
    </html>
  )
}