import type { FormProps } from "./form.interface";

export const Form = ({ children, onSubmit, disabled }: FormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={disabled} style={{ border: "none", padding: 0 }}>
        {children}
      </fieldset>
    </form>
  );
};
