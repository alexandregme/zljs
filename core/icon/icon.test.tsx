import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Icon } from "./icon";
import { iconNames } from "./icon.const";

describe("iconNames", () => {
  it("exports an array of icon names", () => {
    expect(Array.isArray(iconNames)).toBe(true);
    expect(iconNames.length).toBeGreaterThan(0);
  });
});

describe("<Icon /> - Default Props", () => {
  it("renders icon correctly", () => {
    render(<Icon name="X" />);

    const iconElement = screen.getByTestId("X");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });
});

describe("<Icon /> - Invalid Icon", () => {
  it("renders empty fragment for unknown icon name", () => {
    const { container } = render(
      <Icon name={"InvalidIcon" as unknown as "Check"} />,
    );

    expect(container.innerHTML).toBe("");
  });
});

describe("<Icon /> - Custom Props", () => {
  it("renders different icon when name changes", () => {
    render(<Icon name="Check" />);

    const iconElement = screen.getByTestId("Check");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders WhatsApp brand icon", () => {
    render(<Icon name="SiWhatsapp" />);

    const iconElement = screen.getByTestId("SiWhatsapp");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders Pencil icon", () => {
    render(<Icon name="Pencil" />);

    const iconElement = screen.getByTestId("Pencil");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders Trash2 icon", () => {
    render(<Icon name="Trash2" />);

    const iconElement = screen.getByTestId("Trash2");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders Save icon", () => {
    render(<Icon name="Save" />);

    const iconElement = screen.getByTestId("Save");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders RefreshCw icon", () => {
    render(<Icon name="RefreshCw" />);

    const iconElement = screen.getByTestId("RefreshCw");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });
});
