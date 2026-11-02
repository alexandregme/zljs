import { Heading } from "../../heading";
import { Text } from "../../text";
import { Link } from "../link";
import type { NotFoundProps } from "./not-found.interface";
import { notFound } from "./not-found.styles";

export const NotFound = ({
  title = "Page not found",
  message = "The page you are looking for does not exist.",
  backHref = "/",
  backLabel = "Go back home",
}: NotFoundProps) => {
  const { base, code, content } = notFound();

  return (
    <div className={base()}>
      <span className={code()}>404</span>
      <div className={content()}>
        <Heading>{title}</Heading>
        <Text color="muted">{message}</Text>
      </div>
      <Link href={backHref}>{backLabel}</Link>
    </div>
  );
};
