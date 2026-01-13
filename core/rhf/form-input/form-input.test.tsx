import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "../form-provider";
import { FormInput } from "./form-input";

describe("<FormInput /> - Default Props", () => {
  it("renders FormInput correctly", () => {
    render(
      <FormProvider onSubmit={() => {}}>
        <FormInput name="email" label="Email" />
      </FormProvider>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders FormInput with type text by default", () => {
    render(
      <FormProvider onSubmit={() => {}}>
        <FormInput name="username" label="Username" />
      </FormProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });
});

describe("<FormInput /> - Custom Props", () => {
  it("renders FormInput with placeholder", () => {
    render(
      <FormProvider onSubmit={() => {}}>
        <FormInput name="email" label="Email" placeholder="Enter email" />
      </FormProvider>,
    );

    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Enter email",
    );
  });

  it("renders FormInput with type password", () => {
    render(
      <FormProvider onSubmit={() => {}}>
        <FormInput name="password" label="Password" type="password" />
      </FormProvider>,
    );

    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("renders FormInput as disabled", () => {
    render(
      <FormProvider onSubmit={() => {}}>
        <FormInput name="email" label="Email" disabled />
      </FormProvider>,
    );

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("submits form with input value", async () => {
    const handleSubmit = jest.fn();
    render(
      <FormProvider onSubmit={handleSubmit}>
        <FormInput name="email" label="Email" />
        <button type="submit">Submit</button>
      </FormProvider>,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(handleSubmit.mock.calls[0][0]).toEqual({
        email: "test@example.com",
      });
    });
  });

  it("displays validation error from zod schema", async () => {
    const schema = z.object({
      email: z.string().email("Invalid email format"),
    });

    render(
      <FormProvider onSubmit={() => {}} resolver={zodResolver(schema)}>
        <FormInput name="email" label="Email" />
        <button type="submit">Submit</button>
      </FormProvider>,
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Invalid email format",
      );
    });
  });
});
