import React, { InputHTMLAttributes, forwardRef } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, helperText, ...props }, ref) => {
    // Base styles
    const baseStyles = 'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
    
    // Error styles
    const errorStyles = error ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
    
    // Combine all styles
    const combinedClassName = `${baseStyles} ${errorStyles} ${className}`
    
    return (
      <div className="w-full">
        <input
          className={combinedClassName}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p className={`mt-1 text-xs ${error ? 'text-destructive' : 'text-muted-foreground'}`}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
