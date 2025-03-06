'use client'

import React, { createContext, useContext, useState } from 'react'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { AlertCircle } from 'lucide-react'

interface ErrorDialogContextType {
  showError: (title: string, message: string) => void
  hideError: () => void
}

const ErrorDialogContext = createContext<ErrorDialogContextType | undefined>(undefined)

export const ErrorDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const showError = (title: string, message: string) => {
    setTitle(title)
    setMessage(message)
    setOpen(true)
  }

  const hideError = () => {
    setOpen(false)
  }

  return (
    <ErrorDialogContext.Provider value={{ showError, hideError }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon icon={AlertCircle} size={20} className="text-red-500" />
              {title}
            </DialogTitle>
            <DialogDescription>
              {message}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={hideError}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ErrorDialogContext.Provider>
  )
}

export const useErrorDialog = () => {
  const context = useContext(ErrorDialogContext)
  if (context === undefined) {
    throw new Error('useErrorDialog must be used within an ErrorDialogProvider')
  }
  return context
}

export default useErrorDialog
