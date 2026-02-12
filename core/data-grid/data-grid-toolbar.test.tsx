import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataGridToolbar } from "./data-grid-toolbar";
import { GridApi } from "ag-grid-community";

const createMockGridApi = (): GridApi =>
  ({
    setGridOption: vi.fn(),
  }) as unknown as GridApi;

describe("<DataGridToolbar /> - Default Props", () => {
  it("renders toolbar correctly", () => {
    render(<DataGridToolbar gridApi={null} />);

    expect(screen.getByTestId("data-grid-toolbar")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<DataGridToolbar gridApi={null} />);

    expect(screen.getByPlaceholderText("Buscar...")).toBeInTheDocument();
  });

  it("renders search button", () => {
    render(<DataGridToolbar gridApi={null} />);

    expect(screen.getByText("Buscar")).toBeInTheDocument();
  });

  it("renders clear button", () => {
    render(<DataGridToolbar gridApi={null} />);

    expect(screen.getByText("Limpar")).toBeInTheDocument();
  });
});

describe("<DataGridToolbar /> - Search Functionality", () => {
  it("calls setGridOption when search button is clicked", () => {
    const mockApi = createMockGridApi();
    render(<DataGridToolbar gridApi={mockApi} />);

    const searchInput = screen.getByPlaceholderText("Buscar...");
    fireEvent.change(searchInput, { target: { value: "John" } });

    const searchButton = screen.getByText("Buscar");
    fireEvent.click(searchButton);

    expect(mockApi.setGridOption).toHaveBeenCalledWith(
      "quickFilterText",
      "John",
    );
  });

  it("calls setGridOption when Enter key is pressed", () => {
    const mockApi = createMockGridApi();
    render(<DataGridToolbar gridApi={mockApi} />);

    const searchInput = screen.getByPlaceholderText("Buscar...");
    fireEvent.change(searchInput, { target: { value: "Jane" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    expect(mockApi.setGridOption).toHaveBeenCalledWith(
      "quickFilterText",
      "Jane",
    );
  });

  it("does not call setGridOption on non-Enter key", () => {
    const mockApi = createMockGridApi();
    render(<DataGridToolbar gridApi={mockApi} />);

    const searchInput = screen.getByPlaceholderText("Buscar...");
    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.keyDown(searchInput, { key: "a" });

    expect(mockApi.setGridOption).not.toHaveBeenCalled();
  });

  it("clears search when clear button is clicked", () => {
    const mockApi = createMockGridApi();
    render(<DataGridToolbar gridApi={mockApi} />);

    const searchInput = screen.getByPlaceholderText("Buscar...");
    fireEvent.change(searchInput, { target: { value: "test" } });

    const clearButton = screen.getByText("Limpar");
    fireEvent.click(clearButton);

    expect(mockApi.setGridOption).toHaveBeenCalledWith("quickFilterText", "");
    expect(searchInput).toHaveValue("");
  });

  it("does not throw when gridApi is null", () => {
    render(<DataGridToolbar gridApi={null} />);

    const searchButton = screen.getByText("Buscar");
    expect(() => fireEvent.click(searchButton)).not.toThrow();

    const clearButton = screen.getByText("Limpar");
    expect(() => fireEvent.click(clearButton)).not.toThrow();
  });
});
