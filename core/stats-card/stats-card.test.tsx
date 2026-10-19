import { render, screen } from "@testing-library/react";
import { StatsCard } from "./stats-card";

describe("<StatsCard /> - Default Props", () => {
  it("renders <StatsCard /> correctly", () => {
    render(<StatsCard label="Total" value={100} color="blue" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-blue-100");
  });

  it("renders <StatsCard /> with label", () => {
    render(<StatsCard label="Total" value={100} color="blue" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveTextContent("Total");
  });

  it("renders <StatsCard /> with value", () => {
    render(<StatsCard label="Total" value={100} color="blue" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveTextContent("100");
  });
});

describe("<StatsCard /> - Custom Props", () => {
  it("renders <StatsCard /> with value as string", () => {
    render(<StatsCard label="Status" value="OK" color="blue" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveTextContent("OK");
  });

  it("renders <StatsCard /> with color red", () => {
    render(<StatsCard label="Errors" value={10} color="red" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveClass("bg-red-100");
  });
});
