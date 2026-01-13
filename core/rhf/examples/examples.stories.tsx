import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormProvider } from "@zljs/rhf";
import { LoginForm } from "./login-form";
import { RegistrationForm } from "./registration-form";
import { SearchForm } from "./search-form";
import { ProfileForm } from "./profile-form";

const meta: Meta<typeof FormProvider> = {
  title: "RHF/Examples",
  component: FormProvider,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormProvider>;

export const Login: Story = {
  render: () => <LoginForm />,
};

export const Registration: Story = {
  render: () => <RegistrationForm />,
};

export const Search: Story = {
  render: () => <SearchForm />,
};

export const Profile: Story = {
  render: () => <ProfileForm />,
};
