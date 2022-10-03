import classnames from "classnames";
import React, { FC, useEffect } from "react";

interface IToastProps {
  message?: string;
  timer?: number;
  isAutoClosed?: boolean;
  isOpen?: boolean;
  type?: string;
  hide?: () => void;
}

const Toast: FC<IToastProps> = ({
  message,
  timer = 3000,
  isAutoClosed = true,
  isOpen,
  hide,
  type,
}) => {
  useEffect(() => {
    if (isAutoClosed && isOpen) {
      setTimeout(() => {
        hide();
      }, timer);
    }
  }, [isOpen]);

  const toastWrapperClassname = classnames(
    "flex justify-center fixed bottom-5 left-1/2 items-center p-4  w-full max-w-xs rounded-lg shadow duration-300 -translate-x-1/2",
    {
      ["opacity-0"]: !isOpen,
      ["bg-red-500"]: type === "error",
      ["bg-yellow-300"]: type === "warn",
      ["bg-sky-500"]: type === "info",
      ["bg-green-500"]: type === "success",
    }
  );

  return (
    <div id="toast-danger" className={toastWrapperClassname} role="alert">
      <span className="text-white">{message}</span>
    </div>
  );
};

export default Toast;
