import { render, screen } from "@testing-library/react";
import { Error } from "@zljs/core";

const MESSAGE = "This field is required";

describe("<Error /> - Default Props", () => {
  it("renders <Error /> correctly", () => {
    render(<Error message={MESSAGE} />);
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent(MESSAGE);
  });

  it("renders <Error /> without id by default", () => {
    render(<Error message={MESSAGE} />);
    const error = screen.getByRole("alert");

    expect(error).not.toHaveAttribute("id");
  });
});

describe("<Error /> - Custom Props", () => {
  it("renders <Error /> with id", () => {
    render(<Error id="email-error" message={MESSAGE} />);
    const error = screen.getByRole("alert");

    expect(error).toHaveAttribute("id", "email-error");
  });

  it("renders <Error /> without an alert when message is empty", () => {
    render(<Error message="" />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

describe("<Error /> - Styles", () => {
  it("renders <Error /> with the theme color", () => {
    render(<Error message={MESSAGE} />);
    const error = screen.getByRole("alert");

    expect(error).toHaveClass("text-zl-danger");
  });
});
