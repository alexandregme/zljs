import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Error } from "./error";

describe("<Error /> - Default Props", () => {
  it("renders Error correctly", () => {
    render(<Error message="This field is required" />);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders Error with error role", () => {
    render(<Error message="Invalid email" />);
    const error = screen.getByRole("alert");

    expect(error).toBeInTheDocument();
  });
});

describe("<Error /> - Custom Props", () => {
  it("renders nothing when message is empty", () => {
    const { container } = render(<Error message="" />);

    expect(container.firstChild).toBeNull();
  });
});
