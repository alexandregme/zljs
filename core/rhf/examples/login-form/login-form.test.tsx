import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "./login-form";

describe("<LoginForm />", () => {
  it("renders login form correctly", () => {
    render(<LoginForm />);

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("allows user to fill in email and password", () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("submits form with valid data", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Login successful!\nEmail: test@example.com",
      );
    });

    alertMock.mockRestore();
  });
});
