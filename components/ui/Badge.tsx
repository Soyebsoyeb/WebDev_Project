import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'info' | 'error';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-surface-elevation-1 text-text-primary": variant === 'default',
          "bg-[#E8F5E9] text-[var(--color-success)]": variant === 'success',
          "bg-[#FFF8E1] text-[var(--color-warning)]": variant === 'warning',
          "bg-[#E1F5FE] text-[var(--color-info)]": variant === 'info',
          "bg-[#FFEBEE] text-[var(--color-error)]": variant === 'error',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
