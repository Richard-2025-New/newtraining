'use client'

import * as React from 'react'

export function Alert({ className = '', children }: { className?: string, children?: React.ReactNode }) {
  return (
    <div className={`flex items-start gap-3 p-3 border rounded-lg bg-white ${className}`}>
      {children}
    </div>
  )
}

export function AlertDescription({ className = '', children }: { className?: string, children?: React.ReactNode }) {
  return <div className={`text-sm text-gray-700 ${className}`}>{children}</div>
}

