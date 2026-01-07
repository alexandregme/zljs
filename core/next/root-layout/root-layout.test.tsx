import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RootLayout } from "./root-layout";

describe("<RootLayout /> - Default Props", () => {
  it("renders children correctly", () => {
    render(
      <RootLayout>
        <div>Test content</div>
      </RootLayout>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders main element", () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>,
    );

    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
