import './globals.css'
import Script from 'next/script'
import TermlyCMP from '../components/TermlyCMP'
import { Suspense } from "react";

export const metadata = {
  title: 'Next.js v15 - Modern Web App',
  description: 'A beautiful and elegant Next.js application',
  other: {
    'permissions-policy': 'unload=()'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
        <Suspense fallback={null}>
          <TermlyCMP websiteUUID="270c91dd-6788-48d0-823d-1e04be35bede" autoBlock />
              
        <Script 
          id="audioeye-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(){var b=function(){window.__AudioEyeSiteHash = "35bd0fbd79a49fdf33a0f3bc89f13a83"; var a=document.createElement("script");a.src="https://wsv3cdn.audioeye-services.com/aem.js?h=35bd0fbd79a49fdf33a0f3bc89f13a83";a.type="text/javascript";a.crossOrigin="anonymous";a.setAttribute("async","");document.getElementsByTagName("body")[0].appendChild(a)};"complete"!==document.readyState?window.addEventListener?window.addEventListener("load",b):window.attachEvent&&window.attachEvent("onload",b):b()}();`
          }}
        />
         </Suspense>
      </body>
    </html>
  )
}
