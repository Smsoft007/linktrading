"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toastVariants = cva(
  "fixed flex items-center justify-between w-auto max-w-md gap-2 rounded-md border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "destructive border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-600 bg-green-50 text-green-600",
        warning: "border-yellow-600 bg-yellow-50 text-yellow-600",
        info: "border-blue-600 bg-blue-50 text-blue-600",
      },
      position: {
        topRight: "top-4 right-4",
        topLeft: "top-4 left-4",
        bottomRight: "bottom-4 right-4",
        bottomLeft: "bottom-4 left-4",
        topCenter: "top-4 left-1/2 -translate-x-1/2",
        bottomCenter: "bottom-4 left-1/2 -translate-x-1/2",
      }
    },
    defaultVariants: {
      variant: "default",
      position: "topRight",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  asChild?: boolean
  title?: string
  description?: string
  onClose?: () => void
  autoClose?: boolean
  autoCloseDelay?: number
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, position, asChild = false, title, description, onClose, autoClose = true, autoCloseDelay = 5000, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    
    React.useEffect(() => {
      if (autoClose && onClose) {
        const timer = setTimeout(() => {
          onClose()
        }, autoCloseDelay)
        
        return () => clearTimeout(timer)
      }
    }, [autoClose, onClose, autoCloseDelay])
    
    return (
      <Comp
        className={cn(toastVariants({ variant, position, className }))}
        ref={ref}
        {...props}
      >
        <div className="flex flex-col gap-1">
          {title && <p className="font-medium">{title}</p>}
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="rounded-full h-5 w-5 inline-flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <span className="sr-only">Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </Comp>
    )
  }
)
Toast.displayName = "Toast"

export interface ToastProviderProps {
  children: React.ReactNode
}

interface ToastContextValue {
  showToast: (props: Omit<ToastProps, "onClose" | "position" | "className">) => void
  hideToast: () => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = React.useState<ToastProps | null>(null)
  
  const showToast = (props: Omit<ToastProps, "onClose" | "position" | "className">) => {
    setToast({
      ...props,
      onClose: () => setToast(null),
      position: "topRight",
    })
  }
  
  const hideToast = () => {
    setToast(null)
  }
  
  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <Toast {...toast} />}
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export { Toast } 