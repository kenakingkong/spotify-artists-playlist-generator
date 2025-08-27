import { CSSTransition, TransitionGroup } from "react-transition-group";
import { STEP_COMPONENTS, STEPS, useWizardContext } from "./context";
import { useRef } from "react";

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

  const { step } = useWizardContext();
  const StepComponent = STEP_COMPONENTS[step as keyof typeof STEPS];

  return (
    <div className="py-4">
      <TransitionGroup component={null}>
        <CSSTransition
          // key={step}
          nodeRef={nodeRef}
          timeout={TRANSITION_TIMEOUT}
          classNames={{
            enter: TRANSITION_CLASSES.ENTER,
            enterActive: TRANSITION_CLASSES.ENTER_ACTIVE,
            exit: TRANSITION_CLASSES.EXIT,
            exitActive: TRANSITION_CLASSES.EXIT_ACTIVE,
          }}
        >
          <div ref={nodeRef} className="">
            <StepComponent />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}
