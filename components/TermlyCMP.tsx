'use client'

import { useEffect } from 'react'

interface TermlyCMPProps {
  autoBlock?: boolean
  masterConsentsOrigin?: string
  websiteUUID: string
}

export default function TermlyCMP({ autoBlock, masterConsentsOrigin, websiteUUID }: TermlyCMPProps) {
  useEffect(() => {
    const script = document.createElement('script')
    let src = `https://app.termly.io/resource-blocker/${websiteUUID}`
    if (autoBlock) {
      src += '?autoBlock=on'
    }
    if (masterConsentsOrigin) {
      src += autoBlock ? '&' : '?'
      src += `masterConsentsOrigin=${masterConsentsOrigin}`
    }
    script.src = src
    document.head.appendChild(script)
  }, [websiteUUID, autoBlock, masterConsentsOrigin])

  return null
}