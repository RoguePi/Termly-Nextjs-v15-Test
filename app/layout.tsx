import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'Next.js v15 - Modern Web App',
  description: 'A beautiful and elegant Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script 
          src="https://app.termly.io/resource-blocker/a7f37c49-12f2-4a50-8508-38b56a79b7d1?"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}