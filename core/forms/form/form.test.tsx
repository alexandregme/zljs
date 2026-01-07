import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Form } from "./form";

describe("<Form /> - Default Props", () => {
  it("renders Form correctly", () => {
    const { container } = render(
      <Form>
        <input type="text" data-testid="input" />
      </Form>,
    );

    expect(container.querySelector("form")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <Form>
        <input type="text" data-testid="input" />
      </Form>,
    );

    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("prevents default form submission", () => {
    const handleSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );

    const form = container.querySelector("form")!;
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});

describe("<Form /> - Custom Props", () => {
  it("calls onSubmit when form is submitted", () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables all form elements when disabled prop is true", () => {
    render(
      <Form disabled>
        <input type="text" data-testid="input" />
        <button type="submit">Submit</button>
      </Form>,
    );

    expect(screen.getByTestId("input")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not disable form elements when disabled prop is false", () => {
    render(
      <Form disabled={false}>
        <input type="text" data-testid="input" />
        <button type="submit">Submit</button>
      </Form>,
    );

    expect(screen.getByTestId("input")).not.toBeDisabled();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("does not call onSubmit when form is disabled", () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit} disabled>
        <button type="submit">Submit</button>
      </Form>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
