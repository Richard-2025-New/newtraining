'use client'

import * as React from 'react'

interface RadioGroupProps {
  value: string
  onValueChange: (val: string) => void
  children: React.ReactNode
  className?: string
}

export function RadioGroup({ value, onValueChange, children, className = '' }: RadioGroupProps) {
  return <div className={className} data-value={value} onChange={(e) => {
    const t = e.target as HTMLInputElement
    if (t && t.type === 'radio' && t.value) onValueChange(t.value)
  }}>{children}</div>
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function RadioGroupItem({ className = '', ...props }: RadioGroupItemProps) {
  return (
    <input
      type="radio"
      className={`h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
}

