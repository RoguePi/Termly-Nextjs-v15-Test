'use client'

import { useEffect, useState } from 'react'

export default function TrackingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Wait for Termly to initialize before loading tracking elements
    const timer = setTimeout(() => {
      setMounted(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* YouTube embed - will be blocked by Termly */}
      <div style={{
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#667eea' }}>Featured Video</h2>
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/xnOwOBYaA3w" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
          data-termly-policy="marketing"
          style={{
            maxWidth: '100%',
            borderRadius: '10px'
          }}
        ></iframe>
      </div>
      
      {/* Facebook Pixel - will be blocked by Termly */}
      <img 
        src="https://www.facebook.com/tr?id=123456789&ev=PageView&noscript=1" 
        width="1" 
        height="1" 
        style={{display: 'none'}} 
        alt="" 
        data-termly-policy="marketing"
      />
    </>
  )
}