import { render, screen, within } from "@testing-library/react";
import { Heading } from "@zljs/core";
import { RootLayout } from "./root-layout";

// Vercel Web Analytics has no element of its own: it adds its script to the
// document head, and the script stays there between tests.
const analyticsScript = () =>
  document.head.querySelector('script[data-sdkn^="@vercel/analytics"]');

afterEach(() => {
  analyticsScript()?.remove();
});

describe("<RootLayout /> - Default Props", () => {
  it("renders <RootLayout /> correctly", () => {
    render(<RootLayout>Page content</RootLayout>);
    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent("Page content");
    expect(analyticsScript()).toBeInTheDocument();
    // Outside production the script logs every view to the console: off.
    expect(analyticsScript()).toHaveAttribute("data-debug", "false");
  });
});

describe("<RootLayout /> - Custom Props", () => {
  it("renders <RootLayout /> with children as an element", () => {
    render(
      <RootLayout>
        <Heading>Orders</Heading>
      </RootLayout>,
    );
    const main = screen.getByRole("main");

    expect(
      within(main).getByRole("heading", { name: "Orders" }),
    ).toBeInTheDocument();
  });
});
