'use client'

import { useEffect, useMemo, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const SCRIPT_SRC_BASE = 'https://app.termly.io'

export default function TermlyCMP({
  websiteUUID,
  autoBlock,
  masterConsentsOrigin,
}) {
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
  const scriptRef = useRef(null)

  useEffect(() => {
    if (isScriptAdded.current || typeof window === 'undefined') return

    // Prevent duplicate script injection
    const existingScript = document.querySelector(
      `script[src="${scriptSrc}"]`
    )

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
      if (scriptRef.current?.parentNode) {
        try {
          scriptRef.current.parentNode.removeChild(scriptRef.current)
        } catch (e) {
          console.warn('Failed to remove Termly script:', e)
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
        console.warn('Error initializing Termly:', e)
      }
    }
  }, [pathname, searchParams])

  return null
}
