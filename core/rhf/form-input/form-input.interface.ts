export interface FormInputProps {
  name: string;
  label: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  disabled?: boolean;
}
