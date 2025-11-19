import './globals.css'
import TermlyCMP from '../components/TermlyCMP'

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
      <body>
        <TermlyCMP />
        {children}
      </body>
    </html>
  )
}