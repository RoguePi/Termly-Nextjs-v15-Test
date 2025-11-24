'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    Termly?: {
      initialize: () => void
    }
  }
}

const SCRIPT_SRC_BASE = 'https://app.termly.io'

interface TermlyCMPProps {
  autoBlock?: boolean
  masterConsentsOrigin?: string
  websiteUUID: string
}

function TermlyCMPInner({ autoBlock, masterConsentsOrigin, websiteUUID }: TermlyCMPProps) {
  const [mounted, setMounted] = useState(false)
  
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
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isScriptAdded.current) return
    
    // Delay script loading to after hydration
    const timer = setTimeout(() => {
      const script = document.createElement('script')
      script.src = scriptSrc
      document.head.appendChild(script)
      isScriptAdded.current = true
    }, 100)
    
    return () => clearTimeout(timer)
  }, [mounted, scriptSrc])

  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (mounted) {
      window.Termly?.initialize()
    }
  }, [mounted, pathname, searchParams])

  return null
}

export default function TermlyCMP(props: TermlyCMPProps) {
  return (
    <TermlyCMPInner {...props} />
  )
}