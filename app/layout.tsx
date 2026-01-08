import './globals.css'
import TermlyCMP from '../components/TermlyConsent'

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
      <head />
      <body suppressHydrationWarning={true}>
        {children}
        <TermlyCMP 
          websiteUUID="270c91dd-6788-48d0-823d-1e04be35bede"
          autoBlock={true}
        />
      </body>
    </html>
  )
}