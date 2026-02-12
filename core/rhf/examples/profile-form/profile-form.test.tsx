import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProfileForm } from "./profile-form";

describe("<ProfileForm />", () => {
  it("renders profile form correctly", () => {
    render(<ProfileForm />);

    expect(
      screen.getByRole("heading", { name: "Edit Profile" }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save Changes" }),
    ).toBeInTheDocument();
  });

  it("has default values populated", () => {
    render(<ProfileForm />);

    expect(screen.getByLabelText("Username")).toHaveValue("johndoe");
    expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
  });

  it("allows user to update username", () => {
    render(<ProfileForm />);

    const usernameInput = screen.getByLabelText("Username");
    fireEvent.change(usernameInput, { target: { value: "newusername" } });

    expect(usernameInput).toHaveValue("newusername");
  });

  it("submits form with valid data", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<ProfileForm />);

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "newusername" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save Changes" }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Profile updated!\nUsername: newusername",
      );
    });

    alertMock.mockRestore();
  });
});
