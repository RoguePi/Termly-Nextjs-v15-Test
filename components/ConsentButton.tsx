'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    termly?: {
      openPreferences: () => void
    }
  }
}

export default function ConsentButton() {
  const [mounted, setMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const checkTermly = () => {
      if (typeof window !== 'undefined' && window.termly) {
        setIsLoaded(true)
      }
    }

    checkTermly()
    const interval = setInterval(checkTermly, 100)

    return () => clearInterval(interval)
  }, [mounted])

  const openPreferences = () => {
    if (typeof window !== 'undefined' && window.termly) {
      window.termly.openPreferences()
    }
  }

  if (!mounted || !isLoaded) return null

  return (
    <button 
      onClick={openPreferences}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 15px',
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        zIndex: 1000
      }}
    >
      Cookie Preferences
    </button>
  )
}