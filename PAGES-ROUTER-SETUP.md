# Pages Router Branch Setup Guide

This guide shows how to create a separate branch with Pages Router implementation for Next.js 15/16.

## Step 1: Create New Branch

```bash
git checkout -b pages-router
```

## Step 2: Create Pages Directory Structure

```bash
mkdir pages
mkdir styles
```

## Step 3: Update TermlyConsent Component

Replace `components/TermlyConsent.tsx` with:

```tsx
import { useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/router'

const SCRIPT_SRC_BASE = 'https://app.termly.io'

interface TermlyCMPProps {
  websiteUUID: string
  autoBlock?: boolean
  masterConsentsOrigin?: string
}

export default function TermlyCMP({ autoBlock, masterConsentsOrigin, websiteUUID }: TermlyCMPProps) {
  const scriptSrc = useMemo(() => {
    const src = new URL(SCRIPT_SRC_BASE)
    src.pathname = `/resource-blocker/${websiteUUID}`
    if (autoBlock) {
      src.searchParams.set('autoBlock', 'on')
    }
    if (masterConsentsOrigin) {
      src.searchParams.set('masterConsentsOrigin', masterConsentsOrigin)
    }
    return src.toString()
  }, [autoBlock, masterConsentsOrigin, websiteUUID])

  const isScriptAdded = useRef(false)
  const scriptRef = useRef<HTMLScriptElement | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (isScriptAdded.current || typeof window === 'undefined') return
    
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`)
    if (existingScript) {
      isScriptAdded.current = true
      return
    }
    
    const script = document.createElement('script')
    script.src = scriptSrc
    script.async = true
    scriptRef.current = script
    document.head.appendChild(script)
    isScriptAdded.current = true
    
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        try {
          scriptRef.current.parentNode.removeChild(scriptRef.current)
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    }
  }, [scriptSrc])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Termly) {
      try {
        window.Termly.initialize()
      } catch (e) {
        // Ignore initialization errors
      }
    }
  }, [router.pathname, router.query])

  return null
}
```

## Step 4: Create _app.tsx

Create `pages/_app.tsx`:

```tsx
import type { AppProps } from 'next/app'
import TermlyCMP from '../components/TermlyConsent'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <TermlyCMP 
        websiteUUID="270c91dd-6788-48d0-823d-1e04be35bede"
        autoBlock={true}
      />
    </>
  )
}
```

## Step 5: Create _document.tsx

Create `pages/_document.tsx`:

```tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

## Step 6: Create index.tsx

Create `pages/index.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Next.js v15 - Pages Router</h1>
        <p>Modern web development with elegant design and powerful features</p>
        
        <div className="features">
          <div className="feature">
            <h3>⚡ Fast</h3>
            <p>Optimized performance</p>
          </div>
          <div className="feature">
            <h3>🎨 Beautiful</h3>
            <p>Modern design</p>
          </div>
          <div className="feature">
            <h3>📱 Responsive</h3>
            <p>Works everywhere</p>
          </div>
        </div>
        
        {/* YouTube embed - will be blocked by Termly */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>Featured Video</h2>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/xnOwOBYaA3w" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{
              maxWidth: '100%',
              borderRadius: '10px'
            }}
            data-categories="advertising"
          ></iframe>
        </div>
        
        {/* Policy Links */}
        <footer style={{
          marginTop: '3rem',
          padding: '2rem 0',
          borderTop: '1px solid #eee',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=1763a4cf-d4be-48ed-864f-f9d653d38d83" style={{ color: '#667eea', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=162b211b-1872-4580-831e-c8abb42cf0a7" style={{ color: '#667eea', textDecoration: 'none' }}>Cookie Policy</a>
            <a href="https://app.termly.io/policy-viewer/policy.html?policyUUID=c39e5888-b2d4-47c2-92b9-ba2e808ecab1" style={{ color: '#667eea', textDecoration: 'none' }}>Return Policy</a>
            <a href="#" className="termly-display-preferences">Consent Preferences</a>
          </div>
        </footer>
      </div>
      
      {/* Example third-party scripts - these will be blocked by Termly */}
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
    </main>
  )
}
```

## Step 7: Move globals.css

```bash
mv app/globals.css styles/globals.css
```

## Step 8: Remove App Directory (Optional)

```bash
# Only if you want to completely remove App Router
rm -rf app
```

Or keep both for comparison.

## Step 9: Update next.config.js (if needed)

Ensure your `next.config.js` doesn't have App Router specific settings.

## Step 10: Test the Pages Router Implementation

```bash
npm run dev
```

Visit http://localhost:3000 to test.

## Key Differences: Pages Router vs App Router

| Feature | App Router | Pages Router |
|---------|-----------|--------------|
| Directory | `app/` | `pages/` |
| Layout | `layout.tsx` | `_app.tsx` |
| Document | Built-in | `_document.tsx` |
| Client Directive | `'use client'` needed | Not needed |
| Suspense | Required for `useSearchParams` | Not required |
| Hooks | `usePathname`, `useSearchParams` | `useRouter` |
| Metadata | `export const metadata` | `<Head>` component |

## Commit Your Changes

```bash
git add .
git commit -m "Add Pages Router implementation with Termly"
git push origin pages-router
```

## Switch Between Branches

```bash
# Switch to App Router
git checkout main

# Switch to Pages Router
git checkout pages-router
```

## Notes

- Pages Router is simpler for Termly integration (no Suspense needed)
- App Router is the future of Next.js (recommended for new projects)
- Both implementations work with Next.js 15/16
- Keep both branches to compare implementations