import React, { FC, useEffect, useState } from 'react';
import Toast from '../components/Toast/Toast';
import { ToastContext } from '../context/ToastContext';

interface ToastType {
  isOpen: boolean;
  message?: string;
  type?: string;
}

const ToastProvider: FC = ({ children }) => {
  const [state, setState] = useState<ToastType>({ isOpen: false });

  const show = ({ text, type }) => {
    setState({ isOpen: true, message: text, type });
  };

  const hide = () => {
    setState({ isOpen: false });
  };

  const error = (message) => {
    show({ type: 'error', text: message });
  };

  const warn = (message) => {
    show({ type: 'warning', text: message });
  };

  const info = (message) => {
    show({ type: 'info', text: message });
  };

  const success = (message) => {
    show({ type: 'success', text: message });
  };

  const { message, isOpen, type } = state;

  return (
    <ToastContext.Provider
      value={{
        error,
        warn,
        info,
        success,
        hide,
      }}
    >
      {children}
      <Toast message={message} isOpen={isOpen} type={type} hide={hide} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
