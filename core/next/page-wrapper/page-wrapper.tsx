import type { PageWrapperProps } from "./page-wrapper.interface";
import { pageWrapper } from "./page-wrapper.styles";

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const { base, content } = pageWrapper();

  return (
    <div className={base()}>
      <div className={content()}>{children}</div>
    </div>
  );
};
