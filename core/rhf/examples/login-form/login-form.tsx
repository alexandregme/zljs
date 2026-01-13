import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zljs/core";
import { FormProvider, FormInput } from "@zljs/rhf";
import { loginSchema } from "./login-form.schema";
import type { LoginFormData } from "./login-form.interface";

export const LoginForm = () => {
  const handleSubmit = (data: LoginFormData) => {
    alert(`Login successful!\nEmail: ${data.email}`);
  };

  return (
    <FormProvider<LoginFormData>
      onSubmit={handleSubmit}
      resolver={zodResolver(loginSchema)}
    >
      <div className="flex flex-col gap-4 max-w-xs">
        <h2 className="m-0 text-xl font-semibold">Login</h2>
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <Button type="submit">Login</Button>
      </div>
    </FormProvider>
  );
};
