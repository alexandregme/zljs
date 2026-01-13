import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@zljs/core";
import { FormProvider, FormInput } from "@zljs/rhf";
import { profileSchema } from "./profile-form.schema";
import type { ProfileFormData } from "./profile-form.interface";

export const ProfileForm = () => {
  const handleSubmit = (data: ProfileFormData) => {
    alert(`Profile updated!\nUsername: ${data.username}`);
  };

  return (
    <FormProvider<ProfileFormData>
      onSubmit={handleSubmit}
      resolver={zodResolver(profileSchema)}
      defaultValues={{
        username: "johndoe",
        email: "john@example.com",
      }}
    >
      <div className="flex flex-col gap-4 max-w-xs">
        <h2 className="m-0 text-xl font-semibold">Edit Profile</h2>
        <FormInput name="username" label="Username" />
        <FormInput name="email" label="Email" type="email" />
        <Button type="submit">Save Changes</Button>
      </div>
    </FormProvider>
  );
};
