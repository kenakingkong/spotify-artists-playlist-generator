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
      className={classNames("input p-[10px]", props.className)}
    />
  );
}
