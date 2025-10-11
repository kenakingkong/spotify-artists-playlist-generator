import AnimatedToastList from "@/components/ui/AnimatedToastList";
import { ERRORS } from "@/lib/errors";
import { IToast, TToastTypes } from "@/types/toast";
import {
  createContext,
  createRef,
  ReactNode,
  useContext,
  useState,
} from "react";

export const DEFAULT_TOAST_LIFETIME = 5000;

type TToastContext = {
  toast: (msg: string, type: TToastTypes) => void;
  success: (msg: string) => void;
  error: (msg: string) => void;
  warning: (msg: string) => void;
  info: (msg: string) => void;
};

const ToastContext = createContext<TToastContext | undefined>(undefined);

type TToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: TToastProviderProps) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  function addToast(message: string, type: TToastTypes) {
    const id = Math.random().toString(36).substring(7);
    const nodeRef = createRef();
    const newToast: IToast = {
      id,
      message,
      type,
      nodeRef,
      duration: DEFAULT_TOAST_LIFETIME,
    };

    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => removeToast(id), DEFAULT_TOAST_LIFETIME);
  }

  function removeToast(id: string) {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  const value = {
    toast: addToast,
    success: (msg: string) => addToast(msg, "success"),
    error: (msg: string) => addToast(msg, "error"),
    warning: (msg: string) => addToast(msg, "warning"),
    info: (msg: string) => addToast(msg, "info"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 z-50 flex flex-col gap-1">
        <AnimatedToastList toasts={toasts} onClose={removeToast} />
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) throw new Error(ERRORS.USE_TOAST);

  return context;
}
