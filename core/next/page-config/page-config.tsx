"use client";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import type { ReduxStore } from "../../redux";
import { usePageStore } from "../../state/page";
import type { PageConfigProps } from "./page-config.interface";

export const PageConfig = ({
  children,
  title,
  reducers,
  initPage,
}: PageConfigProps) => {
  const store = useStore() as ReduxStore;
  const dispatch = useDispatch();
  const setTitle = usePageStore((s) => s.setTitle);

  useEffect(() => {
    if (reducers) {
      store.setDynamicReducers(reducers);
    }
  }, [reducers]);

  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  useEffect(() => {
    if (initPage) {
      initPage(dispatch);
    }
  }, []);

  return <>{children}</>;
};
