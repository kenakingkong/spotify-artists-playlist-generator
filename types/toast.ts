import { RefObject } from "react";

export type TToastTypes = "success" | "error" | "warning" | "info";

export interface IToast {
  id: string;
  message: string;
  type: TToastTypes;
  nodeRef: RefObject<any>;
  duration: number;
}
