import { useState } from "react";

const DEFAULT_DELAY = 2000;

export default function useCopy(text: string, delay = DEFAULT_DELAY) {
  const [copied, setCopied] = useState<boolean>(false);

  async function onCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), delay);
  }

  return { copied, onCopy };
}
