import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export default function ErrorMessage({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) {
  return (
    <span
      role="alert"
      className={classNames("block text-sm text-red", className)}
      {...props}
    >
      {children || "Something went wrong :/"}
    </span>
  );
}
