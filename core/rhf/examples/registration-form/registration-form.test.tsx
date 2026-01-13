import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RegistrationForm } from "./registration-form";

describe("<RegistrationForm />", () => {
  it("renders registration form correctly", () => {
    render(<RegistrationForm />);

    expect(
      screen.getByRole("heading", { name: "Create Account" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Account" }),
    ).toBeInTheDocument();
  });

  it("allows user to fill in all fields", () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    expect(screen.getByLabelText("First Name")).toHaveValue("John");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Doe");
    expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
    expect(screen.getByLabelText("Password")).toHaveValue("password123");
    expect(screen.getByLabelText("Confirm Password")).toHaveValue(
      "password123",
    );
  });

  it("submits form with valid data", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Registration successful!\nWelcome, John!",
      );
    });

    alertMock.mockRestore();
  });
});
