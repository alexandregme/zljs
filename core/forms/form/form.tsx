import type { FormProps } from "./form.interface";
import { fieldset } from "./form.styles";

export const Form = ({ children, onSubmit, disabled }: FormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={disabled} className={fieldset()}>
        {children}
      </fieldset>
    </form>
  );
};
