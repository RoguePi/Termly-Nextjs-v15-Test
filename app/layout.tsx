import './globals.css'
import ClientTermly from '../components/ClientTermly'

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
        <ClientTermly />
        {children}
      </body>
    </html>
  )
}