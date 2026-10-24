"use client";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { useRouter } from "next/compat/router.js";
import { usePageStore } from "../state/page";
import type { ExtendedStore } from "../state/global-state";
import type { PageWrapperProps } from "./page-wrapper.interface";

export const PageWrapper = ({
  reducers,
  title,
  initPage,
  children,
}: PageWrapperProps) => {
  const store = useStore() as ExtendedStore;
  const dispatch = useDispatch();
  const router = useRouter();
  const setTitle = usePageStore((s) => s.setTitle);

  useEffect(() => {
    if (reducers) {
      store.setDynamicReducers?.(reducers);
    }
  }, [reducers]);

  useEffect(() => {
    setTitle(title);
  }, [router?.asPath, title, setTitle]);

  useEffect(() => {
    if (initPage) {
      initPage(dispatch);
    }
  }, []);

  return <>{children}</>;
};
