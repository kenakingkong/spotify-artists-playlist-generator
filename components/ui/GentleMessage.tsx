import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function GentleMessage(
  props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
) {
  return (
    <span
      role="alert"
      {...props}
      className={classNames("block text-sm text-gray", props.className)}
    />
  );
}
