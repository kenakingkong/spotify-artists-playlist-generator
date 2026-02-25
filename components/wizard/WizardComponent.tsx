import { useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { STEP_COMPONENTS } from "./config";
import { useWizardContext } from "./context";

const TRANSITION_TIMEOUT = 100;

const TRANSITION_CLASSES = {
  ENTER: "opacity-0 translate-x-8",
  ENTER_ACTIVE:
    "opacity-100 translate-x-0 transition-all duration-300 ease-out",
  EXIT: "opacity-100 translate-x-0",
  EXIT_ACTIVE: "opacity-0 -translate-x-8 transition-all duration-300 ease-in",
};

export default function WizardComponent() {
  const nodeRef = useRef<HTMLDivElement>(null);

  const store = useWizardContext();
  const stepKey = String(store?.currStep) as keyof typeof STEP_COMPONENTS;
  const StepComponent = STEP_COMPONENTS[stepKey] || STEP_COMPONENTS["0"];

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        nodeRef={nodeRef}
        timeout={TRANSITION_TIMEOUT}
        classNames={{
          enter: TRANSITION_CLASSES.ENTER,
          enterActive: TRANSITION_CLASSES.ENTER_ACTIVE,
          exit: TRANSITION_CLASSES.EXIT,
          exitActive: TRANSITION_CLASSES.EXIT_ACTIVE,
        }}
      >
        <div ref={nodeRef}>
          <StepComponent />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}
