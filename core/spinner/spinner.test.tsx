import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";

vi.mock("lucide-react", () => ({
  LoaderCircle: ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg
      data-testid="spinner-icon"
      className={className as string}
      {...props}
    />
  ),
}));

describe("<Spinner />", () => {
  it("renders the spinning icon", () => {
    render(<Spinner />);

    expect(screen.getByTestId("spinner-icon")).toBeInTheDocument();
  });

  it("has animate-spin class", () => {
    render(<Spinner />);

    expect(screen.getByTestId("spinner-icon")).toHaveClass("animate-spin");
  });

  it("accepts custom className", () => {
    render(<Spinner className="w-10 h-10" />);

    expect(screen.getByTestId("spinner-icon")).toHaveClass("w-10");
  });
});
