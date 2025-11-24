'use client'

import { useEffect, useState, Suspense } from 'react'
import TermlyCMP from './TermlyCMP'

export default function ClientTermly() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <TermlyCMP 
        websiteUUID="270c91dd-6788-48d0-823d-1e04be35bede"
        autoBlock={true}
      />
    </Suspense>
  )
}