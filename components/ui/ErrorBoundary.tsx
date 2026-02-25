import { Component, ReactNode } from "react";
import ErrorMessage from "./ErrorMessage";

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <ErrorMessage />;
    return this.props.children;
  }
}
