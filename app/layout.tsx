import './globals.css'
import Script from 'next/script'

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
        <Script
          src="https://app.termly.io/resource-blocker/270c91dd-6788-48d0-823d-1e04be35bede?autoBlock=on"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}