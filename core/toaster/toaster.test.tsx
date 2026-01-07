import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Toaster } from "./toaster";

jest.mock("sonner", () => ({
  Toaster: jest.fn(() => null),
}));

import { Toaster as SonnerToaster } from "sonner";

describe("<Toaster />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Toaster without crashing", () => {
    const { container } = render(<Toaster />);

    expect(container).toBeInTheDocument();
  });

  it("passes correct props to SonnerToaster", () => {
    render(<Toaster />);

    expect(SonnerToaster).toHaveBeenCalledWith(
      {
        position: "bottom-right",
        richColors: true,
        closeButton: true,
        duration: 4000,
        expand: true,
        visibleToasts: 5,
      },
      undefined,
    );
  });
});
