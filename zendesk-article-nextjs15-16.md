# How to install Termly's Consent Management Platform in Next.js 15/16

This article provides step-by-step instructions for installing Termly's Consent Management Platform (CMP) in Next.js 15 or 16 applications.

## Choose Your Implementation

Next.js offers two routing architectures. Choose the one your project uses:

1. **App Router** (Recommended for new projects) - Uses `app/` directory
2. **Pages Router** (Legacy) - Uses `pages/` directory

**Not sure which you're using?** Check your project structure:
- If you have an `app/` directory with `layout.tsx`, you're using App Router
- If you have a `pages/` directory with `_app.tsx`, you're using Pages Router

---

## App Router Implementation

### Prerequisites

- Next.js version 15.x or 16.x with App Router
- A Termly account with a configured website
- Your Termly website UUID from your dashboard

## Installation Steps

### Step 1: Create the Termly Component

Create a new file at `components/TermlyConsent.tsx`:

```tsx
'use client'

import { useEffect, useMemo, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

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

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Termly) {
      try {
        window.Termly.initialize()
      } catch (e) {
        // Ignore initialization errors
      }
    }
  }, [pathname, searchParams])

  return null
}
```

This component dynamically loads the Termly consent script and reinitializes it on route changes.

### Step 2: Add to Root Layout

Update your `app/layout.tsx` file:

```tsx
import './globals.css'
import TermlyCMP from '../components/TermlyConsent'
import { Suspense } from 'react'

export const metadata = {
  title: 'Your App Title',
  description: 'Your app description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
        <Suspense fallback={null}>
          <TermlyCMP 
            websiteUUID="YOUR_WEBSITE_UUID"
            autoBlock={true}
          />
        </Suspense>
      </body>
    </html>
  )
}
```

This wraps your app with the Termly component inside a Suspense boundary (required for App Router).

**Important:** Replace `YOUR_WEBSITE_UUID` with your actual Termly website UUID from your dashboard.

### Step 3: Configure Third-Party Scripts (Optional)

If you have third-party scripts like Google Analytics or Facebook Pixel, configure them with the proper attributes:

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>Your Content</h1>
      
      {/* Google Analytics Example */}
      <script 
        type="text/plain" 
        data-categories="analytics" 
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
      />
      <script 
        type="text/plain" 
        data-categories="analytics" 
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `
        }}
      />
      
      {/* Facebook Pixel Example */}
      <script 
        type="text/plain" 
        data-categories="marketing"
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

**Script Configuration:**
- Change `type="text/javascript"` to `type="text/plain"`
- Add `data-categories` attribute with one of: `analytics`, `marketing`, `advertising`, or `functional`

### Step 4: Add Consent Preferences Link (Optional)

Add a link to allow users to manage their consent preferences:

```tsx
<a href="#" className="termly-display-preferences">Consent Preferences</a>
```

## Key Implementation Details

### Why This Approach Works

This implementation is specifically designed for Next.js 15/16 App Router:

- **Client-Side Only**: The `'use client'` directive ensures the component only runs in the browser
- **SSR Safe**: Checks for `window` object prevent server-side execution errors
- **Suspense Boundary**: Required for `useSearchParams()` in App Router
- **Script Management**: Prevents duplicate script loading and handles cleanup
- **Route Changes**: Automatically reinitializes Termly on navigation

### Component Props

- `websiteUUID` (required): Your Termly website UUID
- `autoBlock` (optional): Enable automatic script blocking (default: false)
- `masterConsentsOrigin` (optional): For multi-domain consent sharing

### Script Categories

Use these standard categories in your `data-categories` attribute:

- `analytics` - Google Analytics, Adobe Analytics, etc.
- `marketing` - Facebook Pixel, Google Ads, etc.
- `advertising` - Ad networks, retargeting pixels
- `functional` - Essential functionality scripts

## Testing Your Installation

1. **Clear browser cookies** or use incognito mode
2. **Load your website** - the consent banner should appear
3. **Check browser console** for any errors
4. **Inspect page source** - scripts should have `type="text/plain"`
5. **Accept consent** - scripts should activate and change to `type="text/javascript"`
6. **Test navigation** - banner should persist across page changes

## Troubleshooting

### Banner Not Appearing

- Verify your website UUID is correct in the TermlyCMP component
- Check browser console for JavaScript errors
- Ensure the component is wrapped in `<Suspense>` boundary
- Confirm you're testing in incognito mode (to clear previous consent)

### Scripts Not Being Blocked

- Verify scripts have `type="text/plain"` attribute
- Check that `data-categories` attributes are set correctly
- Ensure `autoBlock={true}` is set in the TermlyCMP component
- Test in incognito mode to clear consent cookies

### SSR Errors

- Confirm `'use client'` is at the top of TermlyConsent.tsx
- Verify the component is wrapped in `<Suspense fallback={null}>`
- Check that no browser APIs are accessed during server rendering

### Hydration Mismatches

- Add `suppressHydrationWarning={true}` to the `<body>` tag if needed
- Ensure consistent rendering between server and client
- Verify conditional rendering logic is correct

### useSearchParams Error

- Ensure the TermlyCMP component is wrapped in a `<Suspense>` boundary
- The Suspense boundary must be in the layout.tsx file

## Next.js 15/16 Specific Notes

This implementation addresses specific challenges in Next.js 15/16:

- **App Router Architecture**: Uses proper client-side rendering patterns
- **Server Components**: Prevents SSR conflicts with browser APIs
- **Concurrent Rendering**: Handles React 18+ concurrent features
- **Route Changes**: Reinitializes Termly on client-side navigation
- **Suspense Requirements**: Properly wraps components using `useSearchParams()`

## Additional Resources

- [Termly Dashboard](https://app.termly.io)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Next.js App Router Guide](https://nextjs.org/docs/app)

## Support

If you encounter issues with this implementation:

1. Verify you're using Next.js 15.x or 16.x
2. Confirm you're using App Router (not Pages Router)
3. Check that all code is copied exactly as shown
4. Review the troubleshooting section above
5. Contact Termly support with specific error messages

This solution has been tested and verified to work with Next.js 15 and 16 App Router architecture.

---

## Pages Router Implementation

If your project uses the Pages Router (legacy `pages/` directory), follow these instructions instead:

### Pages Router Implementation

**Step 1:** Create the Termly component at `components/TermlyConsent.tsx`:

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
    document.head.appendChild(script)
    isScriptAdded.current = true
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

This component dynamically loads the Termly consent script and reinitializes it on route changes using Pages Router hooks.

**Step 2:** Add to `pages/_app.tsx`:

```tsx
import type { AppProps } from 'next/app'
import TermlyCMP from '../components/TermlyConsent'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <TermlyCMP 
        websiteUUID="YOUR_WEBSITE_UUID"
        autoBlock={true}
      />
    </>
  )
}
```

This wraps all pages with the Termly component (no Suspense needed in Pages Router).

**Key Differences from App Router:**
- Uses `useRouter` from `next/router` instead of `usePathname` and `useSearchParams`
- No `'use client'` directive needed (Pages Router is client-side by default)
- No Suspense boundary required
- Added to `pages/_app.tsx` instead of `app/layout.tsx`
- Simpler implementation with fewer SSR considerations

**Note:** For new projects, we recommend using App Router as it's the current standard for Next.js development.