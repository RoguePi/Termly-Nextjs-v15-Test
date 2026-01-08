# How to Install Termly's Consent Management Platform in Next.js 15/16 App Router

## Overview
This guide shows you how to properly integrate Termly's consent management platform with Next.js 15 and 16 using the App Router architecture. The solution addresses SSR conflicts and ensures proper script blocking functionality.

## Why This Solution Works

**The Problem**: Next.js 15/16 App Router uses server-side rendering (SSR) where browser APIs like `window` and `document` don't exist. Termly's resource-blocker script expects these APIs, causing integration failures.

**The Solution**: We use a client-only component that:
1. **Prevents SSR execution** - Only runs in the browser after hydration
2. **Loads before other scripts** - Ensures Termly initializes first
3. **Uses proper timing** - `afterInteractive` strategy for safe loading
4. **Maintains script blocking** - Third-party scripts remain blocked until consent

## Step-by-Step Implementation

### Step 1: Create the Termly Component

Create `components/TermlyConsent.tsx`:

```tsx
'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

export default function TermlyConsent() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render on client-side to avoid SSR conflicts
  if (!isClient) return null

  return (
    <Script
      src="https://app.termly.io/resource-blocker/YOUR_WEBSITE_UUID?autoBlock=on"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Termly consent management loaded')
      }}
    />
  )
}
```

**Key Points:**
- `'use client'` directive ensures client-side only execution
- `useState` and `useEffect` prevent SSR rendering
- `afterInteractive` strategy loads after page is interactive
- Replace `YOUR_WEBSITE_UUID` with your actual Termly UUID

### Step 2: Add to Root Layout

Update your `app/layout.tsx`:

```tsx
import TermlyConsent from '../components/TermlyConsent'
import './globals.css'

export const metadata = {
  title: 'Your App',
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

**Important**: Place `<TermlyConsent />` at the end of the body to ensure it loads after your content but before other scripts.

### Step 3: Basic Implementation Complete!

That's it! Your Termly consent management is now installed and working. The consent banner will appear when users visit your site.

### Step 4: Adding Third-Party Scripts (Optional)

If you have third-party scripts like Google Analytics, Facebook Pixel, etc., add them directly to your pages:

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
    </main>
  )
}
```

**Script Configuration Rules:**
- Change `type="text/javascript"` to `type="text/plain"`
- Add `data-categories` attribute: `analytics`, `advertising`, or `functional`
- Termly will automatically manage these scripts based on user consent

## How It Works

1. **Page Loads**: Next.js renders the page server-side without Termly
2. **Hydration**: React takes over on the client-side
3. **Termly Loads**: TermlyConsent component loads the resource-blocker script
4. **Banner Appears**: Consent banner displays to users
5. **Scripts Managed**: If you have third-party scripts with `type="text/plain"`, Termly will manage them based on user consent

## Troubleshooting

### Banner Not Appearing
- Check browser console for errors
- Verify your website UUID is correct
- Ensure TermlyConsent component is in layout.tsx
- Confirm `'use client'` directive is present

### Scripts Not Blocking
- Verify scripts have `type="text/plain"`
- Check `data-categories` attributes are set
- Ensure Termly loads before other scripts
- Test in incognito mode to clear consent cookies

### SSR Errors
- Confirm `'use client'` is at the top of TermlyConsent.tsx
- Check that `isClient` state prevents SSR rendering
- Verify no browser APIs are called during SSR

### Hydration Mismatches
- Use `suppressHydrationWarning={true}` on body tag if needed
- Ensure consistent rendering between server and client
- Check that conditional rendering logic is correct

## Testing Your Implementation

1. **Clear Cookies**: Test in incognito mode
2. **Check Console**: Look for Termly load confirmation
3. **Inspect Scripts**: Verify `type="text/plain"` on blocked scripts
4. **Test Consent**: Accept categories and confirm scripts activate
5. **Cross-Browser**: Test on Chrome, Firefox, Safari

## Best Practices

- **Performance**: Place TermlyConsent at end of body for optimal loading
- **Categories**: Use standard categories (analytics, advertising, functional)
- **Testing**: Always test consent flow in incognito mode
- **Monitoring**: Monitor console for any integration errors
- **Updates**: Keep Termly UUID updated if you change domains

## Common Mistakes to Avoid

❌ **Don't** place Termly script in `<head>` with `beforeInteractive`
❌ **Don't** forget `'use client'` directive
❌ **Don't** use `type="text/javascript"` on scripts you want blocked
❌ **Don't** load Termly in a regular component without SSR protection

✅ **Do** use client-only component with state management
✅ **Do** place TermlyConsent in layout.tsx
✅ **Do** use `type="text/plain"` for blockable scripts
✅ **Do** test thoroughly in different browsers

## Support

If you encounter issues with this implementation:
1. Check the troubleshooting section above
2. Verify your Next.js version (15.x or 16.x)
3. Ensure you're using App Router (not Pages Router)
4. Contact Termly support with your specific error messages

This solution has been tested and verified to work with Next.js 15 and 16 App Router architecture.