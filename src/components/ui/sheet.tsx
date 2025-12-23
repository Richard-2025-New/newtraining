'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

const SheetContext = React.createContext<{ open: boolean; setOpen: (open: boolean) => void } | null>(null)

export const Sheet = ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const state = open !== undefined ? open : isOpen
  const setState = onOpenChange || setIsOpen
  return <SheetContext.Provider value={{ open: state, setOpen: setState }}>{children}</SheetContext.Provider>
}

export const SheetTrigger = ({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) => {
  const context = React.useContext(SheetContext)
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, { onClick: () => context?.setOpen(true) })
  }
  return <button onClick={() => context?.setOpen(true)}>{children}</button>
}

export const SheetContent = ({ side = 'right', children, className }: { side?: 'left' | 'right'; children: React.ReactNode; className?: string }) => {
  const context = React.useContext(SheetContext)
  if (!context?.open) return null
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50" onClick={() => context.setOpen(false)} />
      <div className={cn("fixed z-50 bg-white p-6 shadow-lg transition duration-300 ease-in-out", side === 'left' ? 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r' : 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l', className)}>
        <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none" onClick={() => context.setOpen(false)}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </>
  )
}

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
)

export const SheetTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold text-foreground", className)} {...props} />
)
