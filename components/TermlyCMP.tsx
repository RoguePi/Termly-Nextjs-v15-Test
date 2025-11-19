'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    termly: any
  }
}

const SCRIPT_SRC_BASE = 'https://app.termly.io'
const websiteUUID = '270c91dd-6788-48d0-823d-1e04be35bede'
const autoBlock = true

export default function TermlyCMP() {
  useEffect(() => {
    const src = new URL(SCRIPT_SRC_BASE)
    src.pathname = `/resource-blocker/${websiteUUID}`
    if (autoBlock) {
      src.searchParams.set('autoBlock', 'on')
    }

    const script = document.createElement('script')
    script.id = 'termly-jssdk'
    script.src = src.toString()
    
    if (!document.getElementById('termly-jssdk')) {
      document.head.appendChild(script)
    }

    return () => {
      const existingScript = document.getElementById('termly-jssdk')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  return null
}