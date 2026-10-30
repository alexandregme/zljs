import { render, screen } from "@testing-library/react";
import { Icon } from "@zljs/core";
import { iconNames } from "./icon.const";

describe("<Icon /> - Default Props", () => {
  it("renders <Icon /> correctly", () => {
    render(<Icon name="X" />);
    const icon = screen.getByTestId("X");

    expect(icon).toBeInTheDocument();
    expect(icon.querySelector("svg")).toBeInTheDocument();
  });

  it("renders <Icon /> with size md by default", () => {
    render(<Icon name="X" />);
    const icon = screen.getByTestId("X");

    expect(icon.querySelector("svg")).toHaveAttribute("width", "16");
  });

  it("renders <Icon /> without aria-label by default", () => {
    render(<Icon name="X" />);
    const icon = screen.getByTestId("X");

    expect(icon).not.toHaveAttribute("aria-label");
    expect(icon).not.toHaveAttribute("role");
  });

  it("renders <Icon /> brand svg hidden from assistive technology by default", () => {
    render(<Icon name="SiWhatsapp" />);
    const icon = screen.getByTestId("SiWhatsapp");

    expect(icon.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("<Icon /> - Custom Props", () => {
  it.each(iconNames)("renders <Icon /> with name %s", (name) => {
    render(<Icon name={name} />);
    const icon = screen.getByTestId(name);

    expect(icon.querySelector("svg")).toBeInTheDocument();
  });

  it("renders <Icon /> empty with an unknown name", () => {
    const { container } = render(
      <Icon name={"InvalidIcon" as unknown as "Check"} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders <Icon /> with size sm", () => {
    render(<Icon name="X" size="sm" />);
    const icon = screen.getByTestId("X");

    expect(icon.querySelector("svg")).toHaveAttribute("width", "12");
  });

  it("renders <Icon /> with aria-label", () => {
    render(<Icon name="SiWhatsapp" aria-label="WhatsApp" />);
    const icon = screen.getByRole("img", { name: "WhatsApp" });

    expect(icon).toBeInTheDocument();
  });
});
