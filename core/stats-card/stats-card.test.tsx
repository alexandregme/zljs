import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { StatsCard } from "./stats-card";

describe("<StatsCard /> - Default Props", () => {
  it("renders StatsCard correctly", () => {
    render(<StatsCard label="Total" value={100} color="blue" />);

    expect(screen.getByTestId("stats-card")).toBeInTheDocument();
  });

  it("renders label correctly", () => {
    render(<StatsCard label="Produtos OK" value={50} color="green" />);

    expect(screen.getByText("Produtos OK")).toBeInTheDocument();
  });

  it("renders value correctly", () => {
    render(<StatsCard label="Total" value={123} color="blue" />);

    expect(screen.getByText("123")).toBeInTheDocument();
  });
});

describe("<StatsCard /> - Custom Props", () => {
  it("renders with blue color", () => {
    render(<StatsCard label="Total" value={100} color="blue" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveClass("bg-blue-100");
  });

  it("renders with red color", () => {
    render(<StatsCard label="Errors" value={10} color="red" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveClass("bg-red-100");
  });

  it("renders with yellow color", () => {
    render(<StatsCard label="Warnings" value={5} color="yellow" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveClass("bg-yellow-100");
  });

  it("renders with green color", () => {
    render(<StatsCard label="Success" value={200} color="green" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveClass("bg-green-100");
  });

  it("renders with gray color", () => {
    render(<StatsCard label="Total" value={50} color="gray" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveClass("bg-gray-100");
  });

  it("renders with orange color", () => {
    render(<StatsCard label="Pending" value={15} color="orange" />);
    const card = screen.getByTestId("stats-card");

    expect(card).toHaveClass("bg-orange-100");
  });

  it("renders string value", () => {
    render(<StatsCard label="Status" value="OK" color="green" />);

    expect(screen.getByText("OK")).toBeInTheDocument();
  });
});
