import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zljs/core";
import { FormProvider, FormInput } from "@zljs/rhf";
import { registrationSchema } from "./registration-form.schema";
import type { RegistrationFormData } from "./registration-form.interface";

export const RegistrationForm = () => {
  const handleSubmit = (data: RegistrationFormData) => {
    alert(`Registration successful!\nWelcome, ${data.firstName}!`);
  };

  return (
    <FormProvider<RegistrationFormData>
      onSubmit={handleSubmit}
      resolver={zodResolver(registrationSchema)}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <h2 className="m-0 text-xl font-semibold">Create Account</h2>
        <div className="flex gap-4">
          <FormInput name="firstName" label="First Name" placeholder="John" />
          <FormInput name="lastName" label="Last Name" placeholder="Doe" />
        </div>
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="john@example.com"
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="Min 8 characters"
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Repeat password"
        />
        <Button type="submit">Create Account</Button>
      </div>
    </FormProvider>
  );
};
