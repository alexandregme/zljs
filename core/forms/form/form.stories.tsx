import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "./form";
import { Input } from "../input";
import { Checkbox } from "../checkbox";
import { Radio } from "../radio";
import { Select } from "../select";
import { Button } from "../../button";

const meta: Meta<typeof Form> = {
  title: "Forms/Form",
  component: Form,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4">
        <Input label="Username" placeholder="Enter your username" />
        <Button type="submit">Submit</Button>
      </div>
    ),
  },
};

export const WithMultipleFields: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4">
        <Input label="First Name" placeholder="Enter your first name" />
        <Input label="Last Name" placeholder="Enter your last name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Button type="submit">Submit</Button>
      </div>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <div className="flex flex-col gap-4">
        <Input label="Username" value="john_doe" />
        <Input label="Email" type="email" value="john@example.com" />
        <Button type="submit">Submit</Button>
      </div>
    ),
  },
};

export const CompleteExample: Story = {
  args: {
    onSubmit: (e) => {
      console.log("Form submitted!", e);
    },
    children: (
      <div className="flex flex-col gap-4">
        <Input label="Full Name" placeholder="Enter your full name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <Select
          label="Country"
          placeholder="Select your country"
          options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" },
          ]}
        />
        <div>
          <span>Gender</span>
          <Radio label="Male" name="gender" value="male" />
          <Radio label="Female" name="gender" value="female" />
          <Radio label="Other" name="gender" value="other" />
        </div>
        <Checkbox label="I agree to the terms and conditions" />
        <Checkbox label="Subscribe to newsletter" />
        <Button type="submit">Create Account</Button>
      </div>
    ),
  },
};
