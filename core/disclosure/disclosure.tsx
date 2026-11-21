import type { DisclosureProps } from "./disclosure.interface";
import { disclosure } from "./disclosure.styles";

// The native details element: opening and closing needs no state, and the
// browser already handles the keyboard and tells screen readers the state.
export const Disclosure = ({
  children,
  summary,
  defaultOpen = false,
  variant = "plain",
}: DisclosureProps) => {
  const { base, summary: summaryClass, content } = disclosure({ variant });

  return (
    <details className={base()} open={defaultOpen}>
      <summary data-testid="disclosure-summary" className={summaryClass()}>
        {summary}
      </summary>
      <div data-testid="disclosure-content" className={content()}>
        {children}
      </div>
    </details>
  );
};
