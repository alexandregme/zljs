import { fireEvent, render, screen } from "@testing-library/react";
import { DataGridStatusBar } from "./data-grid-status-bar";

const ACTIVE_FILTERS = [
  { column: "name", headerName: "Nome", value: "Ana" },
  { column: "role", headerName: "Perfil", value: "Admin" },
];

const DEFAULT_PROPS = {
  totalRows: 10,
  displayedRows: 10,
  activeFilters: [],
  onClearFilter: vi.fn(),
  onClearAll: vi.fn(),
};

describe("<DataGridStatusBar /> - Default Props", () => {
  it("renders <DataGridStatusBar /> correctly", () => {
    render(<DataGridStatusBar {...DEFAULT_PROPS} />);
    const status = screen.getByRole("status", { name: "10 registros" });

    expect(status).toHaveTextContent("10 registros");
  });

  it("renders <DataGridStatusBar /> without filters by default", () => {
    render(<DataGridStatusBar {...DEFAULT_PROPS} />);

    expect(screen.queryByText("Filtros:")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Limpar todos" }),
    ).not.toBeInTheDocument();
  });
});

describe("<DataGridStatusBar /> - Custom Props", () => {
  it("renders <DataGridStatusBar /> with displayedRows", () => {
    render(<DataGridStatusBar {...DEFAULT_PROPS} displayedRows={3} />);
    const status = screen.getByRole("status", { name: "3 / 10 registros" });

    expect(status).toBeInTheDocument();
  });

  it("renders <DataGridStatusBar /> with activeFilters", () => {
    render(
      <DataGridStatusBar {...DEFAULT_PROPS} activeFilters={ACTIVE_FILTERS} />,
    );
    const removeButton = screen.getByRole("button", {
      name: "Remover filtro Nome",
    });

    expect(removeButton).toBeInTheDocument();
    expect(screen.getByText("Nome: Ana")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remover filtro Perfil" }),
    ).toBeInTheDocument();
  });

  it("calls onClearFilter and onClearAll when <DataGridStatusBar /> is used", () => {
    const onClearFilter = vi.fn();
    const onClearAll = vi.fn();
    render(
      <DataGridStatusBar
        {...DEFAULT_PROPS}
        activeFilters={ACTIVE_FILTERS}
        onClearFilter={onClearFilter}
        onClearAll={onClearAll}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Remover filtro Perfil" }),
    );
    fireEvent.click(screen.getByRole("button", { name: "Limpar todos" }));

    expect(onClearFilter).toHaveBeenCalledTimes(1);
    expect(onClearFilter).toHaveBeenCalledWith("role");
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });
});

describe("<DataGridStatusBar /> - Styles", () => {
  it("renders <DataGridStatusBar /> with the displayed rows in the primary color", () => {
    render(<DataGridStatusBar {...DEFAULT_PROPS} displayedRows={3} />);
    const displayedRows = screen.getByText("3");

    expect(displayedRows).toHaveClass("text-zl-primary");
  });
});
