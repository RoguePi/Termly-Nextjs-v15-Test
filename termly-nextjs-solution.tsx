// WORKING SOLUTION: Termly + Next.js 15/16 App Router Integration

'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

declare global {
  interface Window {
    termly?: any;
    Termly?: {
      initialize: () => void
    }
  }
}

// 1. Client-only Termly Component
export function TermlyConsent({ websiteUuid }: { websiteUuid: string }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Script
      src={`https://app.termly.io/resource-blocker/${websiteUuid}?autoBlock=on`}
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Termly loaded successfully')
      }}
    />
  )
}

// 2. Layout.tsx Implementation
export function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <TermlyConsent websiteUuid="YOUR_WEBSITE_UUID" />
      </body>
    </html>
  )
}

// 3. Third-party Scripts Component (SSR-safe)
export function ThirdPartyScripts() {
  const [canLoadScripts, setCanLoadScripts] = useState(false)

  useEffect(() => {
    // Wait for Termly to initialize
    const checkTermly = () => {
      if (typeof window !== 'undefined' && window.termly) {
        setCanLoadScripts(true)
      } else {
        setTimeout(checkTermly, 100)
      }
    }
    checkTermly()
  }, [])

  if (!canLoadScripts) return null

  return (
    <>
      {/* Google Analytics */}
      <script 
        type="text/plain" 
        data-categories="analytics" 
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
      />
      <script type="text/plain" data-categories="analytics" dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `
      }}></script>
      
      {/* Facebook Pixel */}
      <script 
        type="text/plain" 
        data-categories="advertising"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
          `
        }}
      />
      
      {/* Google Ads */}
      <script type="text/plain" data-categories="advertising" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890"></script>
      
      {/* Twitter Pixel */}
      <script type="text/plain" data-categories="advertising" dangerouslySetInnerHTML={{
        __html: `
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('init','o1234');
          twq('track','PageView');
        `
      }}></script>
      
      {/* LinkedIn Insight Tag */}
      <script type="text/plain" data-categories="advertising" src="https://snap.licdn.com/li.lms-analytics/insight.min.js"></script>
      
      {/* Hotjar */}
      <script type="text/plain" data-categories="analytics" dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:1234567,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `
      }}></script>
    </>
  )
}

// 4. Alternative: Dynamic Import Approach
export function TermlyDynamic({ websiteUuid }: { websiteUuid: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadTermly = async () => {
      const script = document.createElement('script')
      script.src = `https://app.termly.io/resource-blocker/${websiteUuid}?autoBlock=on`
      script.async = true
      
      script.onload = () => {
        console.log('Termly loaded and ready')
      }
      
      document.head.appendChild(script)
    }

    loadTermly()
  }, [websiteUuid])

  return null
}

// 5. Usage in Page Component
export default function HomePage() {
  return (
    <main>
      <h1>My Next.js 15 App</h1>
      <ThirdPartyScripts />
    </main>
  )
}