import type { NotFoundProps } from "./not-found.interface";
import { container, code, title, message, link } from "./not-found.styles";

export const NotFound = ({
  title: notFoundTitle = "Page not found",
  message: notFoundMessage = "The page you are looking for does not exist.",
  backHref = "/",
}: NotFoundProps) => {
  return (
    <div className={container()}>
      <span className={code()}>404</span>
      <h1 className={title()}>{notFoundTitle}</h1>
      <p className={message()}>{notFoundMessage}</p>
      <a href={backHref} className={link()}>
        Go back home
      </a>
    </div>
  );
};
