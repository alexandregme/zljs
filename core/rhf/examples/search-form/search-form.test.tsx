import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchForm } from "./search-form";

describe("<SearchForm />", () => {
  it("renders search form correctly", () => {
    render(<SearchForm />);

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("has empty default value", () => {
    render(<SearchForm />);

    expect(screen.getByLabelText("Search")).toHaveValue("");
  });

  it("allows user to type search term", () => {
    render(<SearchForm />);

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "react hooks" } });

    expect(searchInput).toHaveValue("react hooks");
  });

  it("submits form with search value", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<SearchForm />);

    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "react hooks" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Searching for: react hooks");
    });

    alertMock.mockRestore();
  });
});
