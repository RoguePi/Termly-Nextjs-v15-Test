'use client'

import { useEffect, useState } from 'react'

export default function ConsentButton() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkTermly = () => {
      if (typeof window !== 'undefined' && window.termly) {
        setIsLoaded(true)
      }
    }

    checkTermly()
    const interval = setInterval(checkTermly, 100)

    return () => clearInterval(interval)
  }, [])

  const openPreferences = () => {
    if (typeof window !== 'undefined' && window.termly) {
      window.termly.openPreferences()
    }
  }

  if (!isLoaded) return null

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