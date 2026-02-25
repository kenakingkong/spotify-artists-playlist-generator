import { MouseEvent } from "react";
import classNames from "classnames";
import { IStep, STEPS } from "./config";
import { useWizardContext } from "./context";

export default function WizardHeader() {
  const store = useWizardContext();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const idx = (event.target as HTMLButtonElement).getAttribute("data-index");
    if (!idx) return;

    store?.nextStep(Number(idx));
  }

  return (
    <nav className="pb-4">
      <ul className="flex justify-between gap-2">
        {Object.values(STEPS).map((s: IStep) => (
          <button
            key={`nav-${s.id}`}
            data-index={s.index}
            onClick={handleClick}
            className={classNames(
              "text-sm flex items-center gap-1",
              store?.currStep == s.index && "underline underline-offset-4"
            )}
          >
            {s.index}. {s.shortLabel}
          </button>
        ))}
      </ul>
    </nav>
  );
}
