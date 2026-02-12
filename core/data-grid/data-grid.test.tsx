import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { DataGrid } from "./data-grid";
import { DataGridColumn } from "./data-grid.interface";

const mockGridApi = {
  setGridOption: vi.fn(),
  getDisplayedRowCount: vi.fn(() => 0),
};

vi.mock("ag-grid-react", () => ({
  AgGridReact: (props: {
    columnDefs: {
      field: string;
      headerName: string;
      cellRenderer?: (params: { data?: Record<string, unknown> }) => ReactNode;
    }[];
    rowData: Record<string, unknown>[];
    onGridReady?: (params: { api: unknown }) => void;
  }) => {
    const MockGrid = () => {
      useEffect(() => {
        props.onGridReady?.({ api: mockGridApi });
      }, []);

      return (
        <div data-testid="ag-grid-mock">
          <div data-testid="columns">
            {props.columnDefs.map((col) => (
              <span key={col.field} data-testid={`header-${col.field}`}>
                {col.headerName}
              </span>
            ))}
          </div>
          <div data-testid="rows">
            {props.rowData.map((row, idx) => (
              <div key={idx} data-testid={`row-${idx}`}>
                {props.columnDefs.map((col) => (
                  <span
                    key={col.field}
                    data-testid={`cell-${idx}-${col.field}`}
                  >
                    {col.cellRenderer
                      ? col.cellRenderer({ data: row })
                      : String(row[col.field])}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    };
    return <MockGrid />;
  },
}));

const mockColumns: DataGridColumn[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "email", headerName: "Email" },
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
    expect(grid).toHaveClass("grid");
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

  it("renders toolbar by default", () => {
    render(<DataGrid columns={mockColumns} data={mockData} />);

    expect(screen.getByTestId("data-grid-toolbar")).toBeInTheDocument();
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
    const singleColumn: DataGridColumn[] = [
      { field: "name", headerName: "Name" },
    ];
    render(<DataGrid columns={singleColumn} data={mockData} />);

    expect(screen.getByTestId("header-name")).toHaveTextContent("Name");
    expect(screen.getByTestId("cell-0-name")).toHaveTextContent("John Doe");
  });

  it("hides toolbar when showSearch is false", () => {
    render(
      <DataGrid columns={mockColumns} data={mockData} showSearch={false} />,
    );

    expect(screen.queryByTestId("data-grid-toolbar")).not.toBeInTheDocument();
  });
});

describe("<DataGrid /> - Custom Columns", () => {
  it("renders custom cell content when cellRenderer is provided", () => {
    const columns: DataGridColumn[] = [
      { field: "name", headerName: "Name" },
      {
        field: "action",
        headerName: "Action",
        cellRenderer: ({ data }) => (
          <span>{`Contact ${String(data?.name)}`}</span>
        ),
      },
    ];
    const data = [{ name: "John Doe", action: "whatsapp" }];

    render(<DataGrid columns={columns} data={data} />);

    expect(screen.getByText("Contact John Doe")).toBeInTheDocument();
  });
});
