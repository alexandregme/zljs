import { render, screen, within } from "@testing-library/react";
import { Heading } from "@zljs/core";
import { RootLayout } from "./root-layout";

describe("<RootLayout /> - Default Props", () => {
  it("renders <RootLayout /> correctly", () => {
    render(<RootLayout>Page content</RootLayout>);
    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent("Page content");
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
