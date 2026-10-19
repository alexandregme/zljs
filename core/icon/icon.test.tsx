import { render, screen } from "@testing-library/react";
import { Icon } from "./icon";
import { iconNames } from "./icon.const";

describe("<Icon /> - Default Props", () => {
  it("renders <Icon /> correctly", () => {
    render(<Icon name="X" />);
    const icon = screen.getByTestId("X");

    expect(icon).toBeInTheDocument();
    expect(icon.querySelector("svg")).toBeInTheDocument();
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
});
