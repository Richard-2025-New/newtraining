import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export function Rating({ value, max = 5, size = 'md', showText = false, className }: RatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      {[...Array(max)].map((_, i) => {
        const filled = i < Math.floor(value)
        const half = i === Math.floor(value) && value % 1 !== 0
        
        return (
          <div key={i} className="relative">
            <Star
              className={cn(
                sizes[size],
                'text-gray-300',
                filled && 'text-yellow-400 fill-current',
                half && 'text-yellow-400'
              )}
            />
            {half && (
              <Star
                className={cn(
                  sizes[size],
                  'text-yellow-400 fill-current absolute top-0 left-0',
                  'clip-path-[inset(0_50%_0_0)]'
                )}
              />
            )}
          </div>
        )
      })}
      {showText && (
        <span className="text-sm text-gray-600 ml-1">{value.toFixed(1)}</span>
      )}
    </div>
  )
}