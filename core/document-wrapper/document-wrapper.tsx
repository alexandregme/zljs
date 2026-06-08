import type { DocumentWrapperProps } from "./document-wrapper.interface";

export const DocumentWrapper = ({
  children,
  lang = "pt-BR",
  className,
}: DocumentWrapperProps) => {
  return (
    <html lang={lang}>
      <body className={className}>{children}</body>
    </html>
  );
};
