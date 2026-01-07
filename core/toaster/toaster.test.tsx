import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toaster } from "./toaster";

describe("<Toaster /> - Default Props", () => {
  it("renders Toaster without crashing", () => {
    const { container } = render(<Toaster />);

    expect(container).toBeInTheDocument();
  });
});
