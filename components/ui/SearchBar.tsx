import classNames from "classnames";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function SearchBar(
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <input
      {...props}
      type="search"
      className={classNames(
        "w-full p-2 rounded border border-black/30 bg-black/5 focus:border-black/50 ring-black/50 text-sm",
        props.className
      )}
    />
  );
}
