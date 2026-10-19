"use client";

import { useAppStore } from "../state/app";
import { Spinner } from "../spinner";
import type { LoaderProps } from "./loader.interface";
import { overlay } from "./loader.styles";

export const Loader = ({ label = "Loading" }: LoaderProps) => {
  const fetching = useAppStore((s) => s.fetching);

  if (!fetching) return null;

  return (
    <div role="status" aria-label={label} className={overlay()}>
      <Spinner size="lg" />
    </div>
  );
};
