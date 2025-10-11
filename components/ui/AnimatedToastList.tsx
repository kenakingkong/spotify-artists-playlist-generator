import { IToast } from "@/types/toast";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Toast from "./Toast";

const TRANSITION_TIMEOUT = 300;

interface IAnimatedToastListProps {
  toasts: Array<IToast>;
  onClose: (id: string) => void;
}

export default function AnimatedToastList({
  toasts,
  onClose,
}: IAnimatedToastListProps) {
  return (
    <TransitionGroup component={null}>
      {toasts.map((toast) => (
        <CSSTransition
          key={toast.id}
          nodeRef={toast.nodeRef}
          timeout={TRANSITION_TIMEOUT}
          classNames="toast-transition"
          unmountOnExit
        >
          <div ref={toast.nodeRef}>
            <Toast toast={toast} onClose={onClose} />
          </div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
