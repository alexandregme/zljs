import { render, screen } from "@testing-library/react";
import { PageWrapper } from "./page-wrapper";

describe("<PageWrapper /> - Default Props", () => {
  it("renders <PageWrapper /> correctly", () => {
    render(
      <PageWrapper>
        <h1>Sign in</h1>
      </PageWrapper>,
    );
    const content = screen.getByRole("heading", { level: 1, name: "Sign in" });

    expect(content).toBeInTheDocument();
  });
});
