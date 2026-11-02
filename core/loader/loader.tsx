"use client";

import { useAppStore } from "../state/zustand/app";
import { Spinner } from "../spinner";
import type { LoaderProps } from "./loader.interface";
import { loader } from "./loader.styles";

export const Loader = ({ label = "Loading" }: LoaderProps) => {
  const fetching = useAppStore((s) => s.fetching);

  if (!fetching) return null;

  return (
    <div className={loader()}>
      <Spinner size="lg" label={label} />
    </div>
  );
};
