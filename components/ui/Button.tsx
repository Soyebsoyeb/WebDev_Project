import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:scale-[1.02] active:scale-[0.98] rounded-full shadow-sm hover:shadow-md': variant === 'primary',
            'bg-transparent border border-text-primary text-text-primary hover:bg-surface-elevation-1 rounded-full': variant === 'secondary',
            'bg-surface-elevation-1 text-text-secondary hover:bg-surface hover:text-text-primary rounded-lg': variant === 'tertiary',
            'h-12 px-8 py-2': size === 'default',
            'h-9 px-4': size === 'sm',
            'h-14 px-10 text-base': size === 'lg',
            'h-12 w-12': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
