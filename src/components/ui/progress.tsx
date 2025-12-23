'use client'

import * as React from 'react'

export function Progress({ value = 0, className = '' }: { value?: number, className?: string }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-blue-600"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

