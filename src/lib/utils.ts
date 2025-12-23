import { type ClassValue, clsx } from "clsx"

// Simple alternative to tailwind-merge for now
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}