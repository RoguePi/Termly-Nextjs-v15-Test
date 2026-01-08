# How to install Termly's Consent Management Platform in a Next.js 15/16 App Router

## Overview

This article provides step-by-step instructions for installing Termly's Consent Management Platform (CMP) in a Next.js application using version 15 or 16 with the App Router architecture.

**Important Note**: Next.js 15 and 16 with App Router require a specific implementation approach due to server-side rendering (SSR) compatibility requirements.

## Prerequisites

- Next.js 15.x or 16.x
- App Router architecture (not Pages Router)
- A Termly account with a configured website

## Installation Steps

### Step 1: Create the Termly Component

Create a new file `components/TermlyConsent.tsx` in your project:

```tsx
'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function TermlyConsent() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <Script
      src="https://app.termly.io/resource-blocker/YOUR_WEBSITE_UUID?autoBlock=on"
      strategy="afterInteractive"
    />
  )
}
```

**Replace `YOUR_WEBSITE_UUID`** with your actual website UUID from your Termly dashboard.

### Step 2: Add to Root Layout

In your `app/layout.tsx` file, import and add the Termly component:

```tsx
import TermlyConsent from '../components/TermlyConsent'
import './globals.css'

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
        <TermlyConsent />
      </body>
    </html>
  )
}
```

### Step 3: Basic Installation Complete!

That's it! Your Termly consent management is now installed. The consent banner will appear when users visit your website.

### Step 4: Configure Third-Party Scripts (Optional)

If you have third-party scripts, add them directly to your pages with proper configuration:

```tsx
export default function HomePage() {
  return (
    <main>
      <h1>Your Page Content</h1>
      
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

**Script Configuration:**
- Change `type="text/javascript"` to `type="text/plain"`
- Add `data-categories` attribute for proper categorization

## Key Implementation Details

### Why This Approach Works

- **Client-Side Only**: The `'use client'` directive ensures the component only runs in the browser
- **SSR Safe**: The `useState` and conditional rendering prevent server-side execution
- **Proper Timing**: `afterInteractive` strategy loads Termly after the page is interactive
- **Script Blocking**: Scripts with `type="text/plain"` remain blocked until consent

### Script Categories

Use these standard categories in your `data-categories` attribute:

- `analytics` - Google Analytics, Adobe Analytics, etc.
- `advertising` - Ad networks, retargeting pixels
- `functional` - Essential functionality scripts

## Testing Your Installation

1. **Clear browser cookies** or use incognito mode
2. **Load your website** - the consent banner should appear
3. **Check browser console** for any errors
4. **Inspect page source** - scripts should have `type="text/plain"`
5. **Accept consent categories** - scripts should activate and change to `type="text/javascript"`

## Troubleshooting

### Banner Not Appearing
- Verify your website UUID is correct
- Check browser console for JavaScript errors
- Ensure the TermlyConsent component is in your layout.tsx
- Confirm you're testing in incognito mode

### Scripts Not Being Blocked
- Verify scripts have `type="text/plain"` attribute
- Check that `data-categories` attributes are set correctly
- Ensure Termly component loads before other scripts

### SSR Errors
- Confirm `'use client'` is at the top of TermlyConsent.tsx
- Verify the conditional rendering with `isClient` state
- Check that no browser APIs are accessed during server rendering

## Next.js 15/16 Specific Notes

This implementation is specifically designed for Next.js 15 and 16 with App Router. The key differences from previous versions:

- Uses client-side only rendering to avoid SSR conflicts
- Implements proper hydration handling with state management
- Uses `afterInteractive` instead of `beforeInteractive` for safer loading

## Support

If you encounter issues with this implementation, please contact Termly support with:
- Your Next.js version
- Complete error messages from browser console
- Your website UUID
- Description of the specific issue

For additional help, visit our [support center](https://support.termly.io) or contact our support team.