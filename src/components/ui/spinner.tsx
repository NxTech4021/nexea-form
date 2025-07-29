import * as React from "react"

import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "lg" | "md" | "sm"
}

export function Spinner({ className, size = "md", ...props }: SpinnerProps) {
  const sizeClasses = {
    lg: "h-6 w-6",
    md: "h-4 w-4",
    sm: "h-3 w-3"
  }

  return (
    <div
      aria-label="Loading"
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
      role="status"
      {...props}
    />
  )
} 