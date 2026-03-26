import { IToast } from "@/types/toast";

interface IToastProps {
  toast: IToast;
  onClose: (id: string) => void;
}

export default function Toast({ toast, onClose }: IToastProps) {
  const { id, message, type, duration } = toast;

  return (
    <div
      role="alert"
      data-type={type}
      className="toast relative overflow-hidden"
    >
      {/* Content */}
      <div className="w-full flex items-center gap-2">
        <p className="flex-1 line-clamp-2">{message}</p>
        <button
          onClick={() => onClose(id)}
          className="hover:opacity-70 transition-opacity leading-[100%] cursor-pointer"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-white/30"
        style={{
          animation: `toast-progress ${duration}ms linear`,
        }}
      />
    </div>
  );
}
