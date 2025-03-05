"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { XCircle } from "lucide-react";

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export function ErrorDialog({
  isOpen,
  onClose,
  title = "오류 발생",
  message,
}: ErrorDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
        <AlertDialogHeader className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
          <AlertDialogTitle className="text-xl font-bold text-white">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-gray-300 mt-2 text-base">
          {message}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// 전역 에러 다이얼로그 상태 관리를 위한 컨텍스트
interface ErrorDialogContextType {
  showError: (message: string, title?: string) => void;
  hideError: () => void;
}

const ErrorDialogContext = React.createContext<ErrorDialogContextType | undefined>(
  undefined
);

export function ErrorDialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [errorTitle, setErrorTitle] = React.useState("오류 발생");
  const [errorMessage, setErrorMessage] = React.useState("");

  const showError = React.useCallback((message: string, title?: string) => {
    setErrorMessage(message);
    if (title) setErrorTitle(title);
    setIsOpen(true);
  }, []);

  const hideError = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ErrorDialogContext.Provider value={{ showError, hideError }}>
      {children}
      <ErrorDialog
        isOpen={isOpen}
        onClose={hideError}
        title={errorTitle}
        message={errorMessage}
      />
    </ErrorDialogContext.Provider>
  );
}

// 커스텀 훅
export function useErrorDialog() {
  const context = React.useContext(ErrorDialogContext);
  if (context === undefined) {
    throw new Error("useErrorDialog must be used within an ErrorDialogProvider");
  }
  return context;
} 