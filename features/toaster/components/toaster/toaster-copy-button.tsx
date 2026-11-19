"use client";
import { useState } from "react";
import { Button } from "../../../../core/button";
import { toasterCopiedLabel, toasterCopyLabel } from "./toaster.const";
import { toaster } from "./toaster.styles";

export const ToasterCopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const { copyButton } = toaster();

  const copy = () =>
    navigator.clipboard.writeText(text).then(
      () => setCopied(true),
      // Without permission the browser refuses, and the button stays on Copy.
      () => undefined,
    );

  return (
    <span className={copyButton()}>
      <Button
        color="ghost"
        size="sm"
        icon={copied ? "Check" : undefined}
        onClick={copy}
      >
        {copied ? toasterCopiedLabel : toasterCopyLabel}
      </Button>
    </span>
  );
};
