import {
  configure,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { restoreBrowserStubs, stubElementRect } from "@test-utils";
import { DataGrid } from "@zljs/core";
import type { DataGridColumn } from "@zljs/core";

const COLUMNS: DataGridColumn[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
];

const FILTER_COLUMNS: DataGridColumn[] = [
  { field: "id", headerName: "ID", filter: true },
  { field: "name", headerName: "Name", filter: true },
];

const DATA = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

const applyNameFilter = async () => {
  await screen.findByRole("gridcell", { name: "John Doe" });
  const [, nameFilter] = document.querySelectorAll(
    ".ag-header-cell-filter-button",
  );

  fireEvent.click(nameFilter as Element);
  const input = await screen.findByRole("textbox", { name: "Valor do Filtro" });
  fireEvent.input(input, { target: { value: "jane" } });
  fireEvent.click(screen.getByRole("button", { name: "Aplicar" }));

  return screen.findByText("Name: jane");
};

// A real AG Grid in jsdom takes seconds when the whole suite runs in parallel.
// The findBy queries need the time too: their default is 1s, and the test fails on the first one that runs out.
vi.setConfig({ testTimeout: 15_000 });
configure({ asyncUtilTimeout: 10_000 });

afterEach(restoreBrowserStubs);

describe("<DataGrid /> - Default Props", () => {
  it("renders <DataGrid /> correctly", async () => {
    render(<DataGrid columns={COLUMNS} data={DATA} />);
    const cell = await screen.findByRole("gridcell", { name: "John Doe" });
    const grid = screen.getByRole("grid", { name: "Tabela de dados" });

    expect(grid).toBeInTheDocument();
    expect(cell).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Name" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Buscar na tabela" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: "2 registros" }),
    ).toBeInTheDocument();
  });

  it("renders <DataGrid /> with the row count before the grid is ready", async () => {
    render(<DataGrid columns={COLUMNS} data={DATA} />);
    const status = screen.getByRole("status", { name: "2 registros" });

    expect(status).toBeInTheDocument();
    expect(
      await screen.findByRole("gridcell", { name: "John Doe" }),
    ).toBeInTheDocument();
  });

  it("renders <DataGrid /> without its optional props by default", async () => {
    render(<DataGrid columns={COLUMNS} data={DATA} />);
    await screen.findByRole("gridcell", { name: "John Doe" });
    const filterButton = document.querySelector(
      ".ag-header-cell-filter-button",
    );

    expect(filterButton).not.toBeInTheDocument();
  });
});

describe("<DataGrid /> - Custom Props", () => {
  it("renders <DataGrid /> with all its props", async () => {
    render(
      <DataGrid
        columns={COLUMNS}
        data={DATA}
        showSearch={false}
        aria-label="Users"
      />,
    );
    await screen.findByRole("gridcell", { name: "John Doe" });
    const grid = screen.getByRole("grid", { name: "Users" });

    expect(grid).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: "Buscar na tabela" }),
    ).not.toBeInTheDocument();
  });

  it("renders <DataGrid /> with empty data", async () => {
    render(<DataGrid columns={COLUMNS} data={[]} />);
    const message = await screen.findAllByText("Sem linhas para mostrar");

    expect(message.length).toBeGreaterThan(0);
    expect(
      screen.getByRole("status", { name: "0 registros" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("gridcell")).not.toBeInTheDocument();
  });

  it("renders <DataGrid /> with all the column options", async () => {
    const columns: DataGridColumn[] = [
      { field: "id", headerName: "ID", pinned: "left", width: 120 },
      {
        field: "name",
        headerName: "Name",
        filter: true,
        cellRenderer: ({ value }) => <strong>{`Rendered ${value}`}</strong>,
      },
      {
        field: "price",
        headerName: "Price",
        pinned: "right",
        valueFormatter: ({ value }) => `R$ ${value}`,
        cellStyle: () => ({ fontWeight: 700 }),
      },
    ];
    render(
      <DataGrid columns={columns} data={[{ id: 1, name: "Ann", price: 5 }]} />,
    );
    const rendered = await screen.findByText("Rendered Ann");
    const formatted = await screen.findByRole("gridcell", { name: "R$ 5" });
    const idHeader = screen.getByRole("columnheader", { name: "ID" });
    const priceHeader = screen.getByRole("columnheader", { name: "Price" });

    expect(rendered).toBeInTheDocument();
    expect(formatted).toHaveStyle({ fontWeight: "700" });
    expect(idHeader).toHaveStyle({ width: "120px" });
    expect(idHeader.closest(".ag-grid-pinned-left-cells")).toBeInTheDocument();
    expect(
      priceHeader.closest(".ag-grid-pinned-right-cells"),
    ).toBeInTheDocument();
    expect(
      document.querySelectorAll(".ag-header-cell-filter-button"),
    ).toHaveLength(1);
  });

  it("filters <DataGrid /> when the search button is clicked", async () => {
    render(<DataGrid columns={COLUMNS} data={DATA} />);
    await screen.findByRole("gridcell", { name: "John Doe" });
    const search = screen.getByRole("textbox", { name: "Buscar na tabela" });

    fireEvent.change(search, { target: { value: "jane" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(
      await screen.findByRole("status", { name: "1 / 2 registros" }),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByRole("gridcell", { name: "John Doe" }),
      ).not.toBeInTheDocument();
    });
  });

  it("filters <DataGrid /> when Enter is pressed in the search", async () => {
    render(<DataGrid columns={COLUMNS} data={DATA} />);
    await screen.findByRole("gridcell", { name: "John Doe" });
    const search = screen.getByRole("textbox", { name: "Buscar na tabela" });

    fireEvent.change(search, { target: { value: "jane" } });
    fireEvent.keyDown(search, { key: "Enter" });

    expect(
      await screen.findByRole("status", { name: "1 / 2 registros" }),
    ).toBeInTheDocument();
  });

  it("clears the search of <DataGrid /> when the clear button is clicked", async () => {
    render(<DataGrid columns={COLUMNS} data={DATA} />);
    await screen.findByRole("gridcell", { name: "John Doe" });
    const search = screen.getByRole("textbox", { name: "Buscar na tabela" });

    fireEvent.change(search, { target: { value: "jane" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));
    await screen.findByRole("status", { name: "1 / 2 registros" });
    fireEvent.click(screen.getByRole("button", { name: "Limpar" }));

    expect(
      await screen.findByRole("status", { name: "2 registros" }),
    ).toBeInTheDocument();
    expect(search).toHaveValue("");
  });

  it("renders <DataGrid /> with an active filter", async () => {
    stubElementRect();
    render(<DataGrid columns={FILTER_COLUMNS} data={DATA} />);
    const tag = await applyNameFilter();

    expect(tag).toBeInTheDocument();
    expect(
      await screen.findByRole("status", { name: "1 / 2 registros" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Remover filtro Name" }),
    ).toBeInTheDocument();
  });

  it("clears a filter of <DataGrid /> when its remove button is clicked", async () => {
    stubElementRect();
    render(<DataGrid columns={FILTER_COLUMNS} data={DATA} />);
    const tag = await applyNameFilter();

    fireEvent.click(
      screen.getByRole("button", { name: "Remover filtro Name" }),
    );

    expect(
      await screen.findByRole("status", { name: "2 registros" }),
    ).toBeInTheDocument();
    expect(tag).not.toBeInTheDocument();
  });

  it("clears the filters and the search of <DataGrid /> when Limpar todos is clicked", async () => {
    stubElementRect();
    render(<DataGrid columns={FILTER_COLUMNS} data={DATA} />);
    const tag = await applyNameFilter();
    const search = screen.getByRole("textbox", { name: "Buscar na tabela" });

    fireEvent.change(search, { target: { value: "zzz" } });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));
    await screen.findByRole("status", { name: "0 / 2 registros" });
    fireEvent.click(screen.getByRole("button", { name: "Limpar todos" }));

    expect(
      await screen.findByRole("status", { name: "2 registros" }),
    ).toBeInTheDocument();
    expect(tag).not.toBeInTheDocument();
    expect(search).toHaveValue("");
  });
});
