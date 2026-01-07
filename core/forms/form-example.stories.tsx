import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button";
import { Form } from "./form";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";
import { Select } from "./select";

const meta: Meta<typeof Form> = {
  title: "Forms/Examples",
  component: Form,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

const RegistrationFormExample = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    gender: "",
    agreeTerms: false,
    newsletter: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.country) {
      newErrors.country = "Please select a country";
    }
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setIsSubmitting(true);
      console.log("Form submitted:", formData);
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Registration successful!");
      }, 1500);
    }
  };

  return (
    <Form onSubmit={handleSubmit} disabled={isSubmitting}>
      <div className="flex flex-col gap-4 max-w-md">
        <h2 className="m-0 text-xl font-semibold">Create Account</h2>

        <Input
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          error={errors.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />

        <Input
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          error={errors.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          error={errors.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          error={errors.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <Select
          label="Country"
          placeholder="Select your country"
          value={formData.country}
          error={errors.country}
          options={[
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" },
            { value: "au", label: "Australia" },
            { value: "de", label: "Germany" },
          ]}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        />

        <div>
          <span className="block mb-2">Gender</span>
          <div className="flex gap-4">
            <Radio
              label="Male"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <Radio
              label="Female"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
            <Radio
              label="Other"
              name="gender"
              value="other"
              checked={formData.gender === "other"}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            />
          </div>
        </div>

        <Checkbox
          label="I agree to the terms and conditions"
          checked={formData.agreeTerms}
          error={errors.agreeTerms}
          onChange={(e) =>
            setFormData({ ...formData, agreeTerms: e.target.checked })
          }
        />

        <Checkbox
          label="Subscribe to newsletter"
          checked={formData.newsletter}
          onChange={(e) =>
            setFormData({ ...formData, newsletter: e.target.checked })
          }
        />

        <Button type="submit">
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </Form>
  );
};

export const RegistrationForm: Story = {
  render: () => <RegistrationFormExample />,
};

const LoginFormExample = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login submitted:", { email, password, rememberMe });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 max-w-xs">
        <h2 className="m-0 text-xl font-semibold">Login</h2>

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          error={errors.email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          error={errors.password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />

        <Button type="submit">Login</Button>
      </div>
    </Form>
  );
};

export const LoginForm: Story = {
  render: () => <LoginFormExample />,
};

const ContactFormExample = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    contactMethod: "email",
  });

  const handleSubmit = () => {
    console.log("Contact form submitted:", formData);
    alert("Message sent!");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 max-w-md">
        <h2 className="m-0 text-xl font-semibold">Contact Us</h2>

        <Input
          label="Name"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <Select
          label="Subject"
          placeholder="Select a subject"
          value={formData.subject}
          options={[
            { value: "general", label: "General Inquiry" },
            { value: "support", label: "Technical Support" },
            { value: "billing", label: "Billing Question" },
            { value: "feedback", label: "Feedback" },
          ]}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
        />

        <div>
          <span className="block mb-2">Preferred Contact Method</span>
          <div className="flex gap-4">
            <Radio
              label="Email"
              name="contactMethod"
              value="email"
              checked={formData.contactMethod === "email"}
              onChange={(e) =>
                setFormData({ ...formData, contactMethod: e.target.value })
              }
            />
            <Radio
              label="Phone"
              name="contactMethod"
              value="phone"
              checked={formData.contactMethod === "phone"}
              onChange={(e) =>
                setFormData({ ...formData, contactMethod: e.target.value })
              }
            />
          </div>
        </div>

        <Button type="submit">Send Message</Button>
      </div>
    </Form>
  );
};

export const ContactForm: Story = {
  render: () => <ContactFormExample />,
};
