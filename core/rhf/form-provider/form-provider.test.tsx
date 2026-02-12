import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FormProvider } from "./form-provider";

describe("<FormProvider /> - Default Props", () => {
  it("renders FormProvider correctly", () => {
    render(
      <FormProvider onSubmit={() => {}}>
        <input data-testid="child-input" />
      </FormProvider>,
    );

    expect(screen.getByTestId("child-input")).toBeInTheDocument();
  });

  it("renders children inside a form element", () => {
    render(
      <FormProvider onSubmit={() => {}}>
        <button type="submit">Submit</button>
      </FormProvider>,
    );

    const form = screen.getByRole("button").closest("form");
    expect(form).toBeInTheDocument();
  });
});

describe("<FormProvider /> - Custom Props", () => {
  it("calls onSubmit when form is submitted", async () => {
    const handleSubmit = vi.fn();
    render(
      <FormProvider onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </FormProvider>,
    );

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("provides default values to the form", async () => {
    const handleSubmit = vi.fn();
    render(
      <FormProvider onSubmit={handleSubmit} defaultValues={{ name: "John" }}>
        <button type="submit">Submit</button>
      </FormProvider>,
    );

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        { name: "John" },
        expect.anything(),
      );
    });
  });
});
