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
});
