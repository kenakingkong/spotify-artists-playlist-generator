import { MouseEvent } from "react";
import classNames from "classnames";
import { IStep, STEPS, useWizardContext } from "./context";

export default function WizardHeader() {
  const { step, forceStep } = useWizardContext();

  const NAVIGABLE_STEPS = [STEPS.ARTISTS, STEPS.SONGS, STEPS.PLAYLIST];

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const id = (event.target as HTMLButtonElement).getAttribute("data-id");
    if (!id) return;

    forceStep(id);
  }

  return (
    <nav className="py-4">
      <ul className="flex justify-between gap-2">
        {NAVIGABLE_STEPS.map((s: IStep) => (
          <button
            key={`nav-${s.id}`}
            data-id={s.id}
            onClick={handleClick}
            className={classNames(
              "text-sm flex items-center gap-1",
              step == s.id && "underline underline-offset-4"
            )}
          >
            {s.index}. {s.shortLabel}
          </button>
        ))}
      </ul>
    </nav>
  );
}
