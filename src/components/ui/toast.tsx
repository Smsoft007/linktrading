'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Icon } from '@/components/ui/icon'
import { X } from 'lucide-react'

// Simple toast context and provider
interface Toast {
  id: string
  title?: string
  message: string
  type?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
}

interface ToastContextType {
  toast: (message: string, options?: { 
    title?: string; 
    type?: 'default' | 'success' | 'error' | 'warning';
    duration?: number;
  }) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<Toast & { visible: boolean }>>([])

  const toast = (message: string, options?: { 
    title?: string; 
    type?: 'default' | 'success' | 'error' | 'warning';
    duration?: number;
  }) => {
    const id = Math.random().toString(36).substring(2, 9)
    const duration = options?.duration || 5000
    
    setToasts((prev) => [
      ...prev, 
      { 
        id, 
        message, 
        type: options?.type || 'default', 
        title: options?.title,
        duration,
        visible: true 
      }
    ])
    
    // Auto-dismiss after duration
    setTimeout(() => {
      setToasts((prev) => 
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      )
      
      // Remove from array after animation completes
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 300)
    }, duration)
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
        {toasts.map(({ id, title, message, type, visible }) => (
          <div
            key={id}
            className={`
              ${visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'} 
              transform transition-all duration-300 ease-in-out
              max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto 
              flex ring-1 ring-black ring-opacity-5
              ${type === 'error' ? 'border-l-4 border-red-500' : ''}
              ${type === 'success' ? 'border-l-4 border-green-500' : ''}
              ${type === 'warning' ? 'border-l-4 border-yellow-500' : ''}
            `}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-1">
                  {title && (
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {title}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setToasts((prev) => 
                    prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
                  )
                  
                  setTimeout(() => {
                    setToasts((prev) => prev.filter((t) => t.id !== id))
                  }, 300)
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
              >
                <Icon icon={X} size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Export dummy components to maintain API compatibility
export const Toast = () => null
export const ToastClose = () => null
export const ToastTitle = () => null
export const ToastDescription = () => null
