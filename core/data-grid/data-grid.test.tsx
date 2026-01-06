import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataGrid } from "./data-grid";
import { DataGridColumn } from "./data-grid.interface";

jest.mock("ag-grid-react", () => ({
  AgGridReact: ({
    columnDefs,
    rowData,
  }: {
    columnDefs: { field: string; headerName: string }[];
    rowData: Record<string, unknown>[];
  }) => (
    <div data-testid="ag-grid-mock">
      <div data-testid="columns">
        {columnDefs.map((col) => (
          <span key={col.field} data-testid={`header-${col.field}`}>
            {col.headerName}
          </span>
        ))}
      </div>
      <div data-testid="rows">
        {rowData.map((row, idx) => (
          <div key={idx} data-testid={`row-${idx}`}>
            {columnDefs.map((col) => (
              <span key={col.field} data-testid={`cell-${idx}-${col.field}`}>
                {String(row[col.field])}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
}));

const mockColumns: DataGridColumn[] = [
  { field: "id", header: "ID" },
  { field: "name", header: "Name" },
  { field: "email", header: "Email" },
];

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

describe("<DataGrid /> - Default Props", () => {
  it("renders DataGrid correctly", () => {
    render(<DataGrid columns={mockColumns} data={mockData} />);
    const grid = screen.getByTestId("data-grid");

    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("ag-theme-alpine");
  });

  it("renders column headers correctly", () => {
    render(<DataGrid columns={mockColumns} data={mockData} />);

    expect(screen.getByTestId("header-id")).toHaveTextContent("ID");
    expect(screen.getByTestId("header-name")).toHaveTextContent("Name");
    expect(screen.getByTestId("header-email")).toHaveTextContent("Email");
  });

  it("renders data rows correctly", () => {
    render(<DataGrid columns={mockColumns} data={mockData} />);

    expect(screen.getByTestId("cell-0-name")).toHaveTextContent("John Doe");
    expect(screen.getByTestId("cell-1-email")).toHaveTextContent(
      "jane@example.com",
    );
  });
});

describe("<DataGrid /> - Edge Cases", () => {
  it("renders empty grid when data is empty", () => {
    render(<DataGrid columns={mockColumns} data={[]} />);
    const grid = screen.getByTestId("data-grid");

    expect(grid).toBeInTheDocument();
    expect(screen.getByTestId("header-id")).toHaveTextContent("ID");
    expect(screen.getByTestId("rows").children).toHaveLength(0);
  });

  it("renders grid with single column", () => {
    const singleColumn: DataGridColumn[] = [{ field: "name", header: "Name" }];
    render(<DataGrid columns={singleColumn} data={mockData} />);

    expect(screen.getByTestId("header-name")).toHaveTextContent("Name");
    expect(screen.getByTestId("cell-0-name")).toHaveTextContent("John Doe");
  });
});
