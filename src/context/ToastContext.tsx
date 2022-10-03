import { useContext, createContext } from 'react';

interface ToastParams {
  isOpen?: boolean;
  message?: string;
  type?: string;
}

export type ToastContextType = {
  error?: (ToastParams) => void;
  warn?: (ToastParams) => void;
  info?: (ToastParams) => void;
  success?: (ToastParams) => void;
  hide?: () => void;
};

export const ToastContext = createContext<ToastContextType>({});

export const useToast = () => useContext(ToastContext);
