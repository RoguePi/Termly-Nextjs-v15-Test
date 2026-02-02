'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Termly?: {
      initialize?: () => void
    }
  }
}

export default function TermsAndConditionsPage(): JSX.Element {
  useEffect(() => {
    // Re-initialize Termly on client-side navigation
    window.Termly?.initialize?.()
  }, [])

  return (
    <main
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '48px 20px',
      }}
    >
      <h1>Terms and Conditions</h1>

      {/* Termly Embed Container */}
      <div
  className="termly-embed"
  data-id="ab92a232-8859-45a8-bd07-d11b2a04ff0e"
/>
    </main>
  )
}
