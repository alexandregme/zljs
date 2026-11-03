import { fireEvent, render, screen } from "@testing-library/react";
import { DataGridToolbar } from "./data-grid-toolbar";

const DEFAULT_PROPS = {
  searchTerm: "",
  onSearchTermChange: vi.fn(),
  onSearch: vi.fn(),
  onClear: vi.fn(),
};

describe("<DataGridToolbar /> - Default Props", () => {
  it("renders <DataGridToolbar /> correctly", () => {
    render(<DataGridToolbar {...DEFAULT_PROPS} />);
    const search = screen.getByRole("textbox", { name: "Buscar na tabela" });

    expect(search).toHaveAttribute("placeholder", "Buscar...");
    expect(search).toHaveValue("");
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Limpar" })).toBeInTheDocument();
  });
});

describe("<DataGridToolbar /> - Custom Props", () => {
  it("renders <DataGridToolbar /> with searchTerm", () => {
    render(<DataGridToolbar {...DEFAULT_PROPS} searchTerm="Ana" />);
    const search = screen.getByRole("textbox", { name: "Buscar na tabela" });

    expect(search).toHaveValue("Ana");
  });

  it("calls onSearchTermChange when <DataGridToolbar /> is typed in", () => {
    const onSearchTermChange = vi.fn();
    render(
      <DataGridToolbar
        {...DEFAULT_PROPS}
        onSearchTermChange={onSearchTermChange}
      />,
    );
    const search = screen.getByRole("textbox", { name: "Buscar na tabela" });

    fireEvent.change(search, { target: { value: "Ana" } });

    expect(onSearchTermChange).toHaveBeenCalledWith("Ana");
  });

  it("calls onSearch when <DataGridToolbar /> is submitted", () => {
    const onSearch = vi.fn();
    render(<DataGridToolbar {...DEFAULT_PROPS} onSearch={onSearch} />);
    const search = screen.getByRole("textbox", { name: "Buscar na tabela" });

    fireEvent.keyDown(search, { key: "a" });
    expect(onSearch).not.toHaveBeenCalled();

    fireEvent.keyDown(search, { key: "Enter" });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));
    expect(onSearch).toHaveBeenCalledTimes(2);
  });

  it("calls onClear when <DataGridToolbar /> is cleared", () => {
    const onClear = vi.fn();
    render(<DataGridToolbar {...DEFAULT_PROPS} onClear={onClear} />);
    const clear = screen.getByRole("button", { name: "Limpar" });

    fireEvent.click(clear);

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
