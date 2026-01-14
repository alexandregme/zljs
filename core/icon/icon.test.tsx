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
    render(<Icon name="BiX" />);

    const iconElement = screen.getByTestId("BiX");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });
});

describe("<Icon /> - Custom Props", () => {
  it("renders different icon when name changes", () => {
    render(<Icon name="BiCheck" />);

    const iconElement = screen.getByTestId("BiCheck");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders WhatsApp icon", () => {
    render(<Icon name="BiLogoWhatsapp" />);

    const iconElement = screen.getByTestId("BiLogoWhatsapp");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders Edit icon", () => {
    render(<Icon name="BiEdit" />);

    const iconElement = screen.getByTestId("BiEdit");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders Trash icon", () => {
    render(<Icon name="BiTrash" />);

    const iconElement = screen.getByTestId("BiTrash");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders Save icon", () => {
    render(<Icon name="BiSave" />);

    const iconElement = screen.getByTestId("BiSave");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });

  it("renders Refresh icon", () => {
    render(<Icon name="BiRefresh" />);

    const iconElement = screen.getByTestId("BiRefresh");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement.querySelector("svg")).toBeInTheDocument();
  });
});
