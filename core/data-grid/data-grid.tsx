import {
  AllCommunityModule,
  GridApi,
  ModuleRegistry,
  themeAlpine,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useCallback } from "react";
import { DataGridProps } from "./data-grid.interface";
import { DataGridToolbar } from "./data-grid-toolbar";
import { DataGridStatusBar, ActiveFilter } from "./data-grid-status-bar";

ModuleRegistry.registerModules([AllCommunityModule]);

// Tailwind color palette (AG Grid needs resolved hex values, not CSS vars)
const tailwind = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
  },
  blue: {
    100: "#dbeafe",
  },
};

const customTheme = themeAlpine.withParams({
  headerBackgroundColor: tailwind.slate[700],
  headerTextColor: tailwind.slate[50],
  oddRowBackgroundColor: tailwind.slate[50],
  rowHoverColor: tailwind.sky[100],
  selectedRowBackgroundColor: tailwind.blue[100],
  borderColor: tailwind.slate[200],
  headerColumnBorder: { color: tailwind.slate[600] },
  fontSize: 13,
  headerHeight: 36,
  rowHeight: 32,
  cellHorizontalPadding: 8,
});

export const DataGrid = <
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  data,
}: DataGridProps<T>) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [displayedRows, setDisplayedRows] = useState(0);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  const updateFilterState = useCallback(
    (api: GridApi) => {
      // Update displayed rows count
      setDisplayedRows(api.getDisplayedRowCount());

      // Get active filters
      const filterModel = api.getFilterModel();
      const filters: ActiveFilter[] = [];

      if (filterModel) {
        Object.entries(filterModel).forEach(([colId, model]) => {
          const colDef = columns.find((c) => c.field === colId);
          const headerName = colDef?.headerName || colId;

          // Extract filter value based on filter type
          const filterValue =
            (model as { filter?: string; values?: string[] })?.filter ||
            (model as { values?: string[] })?.values?.join(", ") ||
            JSON.stringify(model);

          filters.push({
            column: colId,
            headerName,
            value: filterValue,
          });
        });
      }

      setActiveFilters(filters);
    },
    [columns],
  );

  const handleGridReady = (params: { api: GridApi }) => {
    setGridApi(params.api);
    setDisplayedRows(params.api.getDisplayedRowCount());
  };

  const handleFilterChanged = useCallback(() => {
    if (gridApi) {
      updateFilterState(gridApi);
    }
  }, [gridApi, updateFilterState]);

  const handleModelUpdated = useCallback(() => {
    if (gridApi) {
      setDisplayedRows(gridApi.getDisplayedRowCount());
    }
  }, [gridApi]);

  return (
    <div
      data-testid="data-grid"
      className="grid grid-rows-[auto,auto,1fr] grid-cols-1 h-full w-full"
    >
      <DataGridToolbar gridApi={gridApi} />
      <DataGridStatusBar
        totalRows={data.length}
        displayedRows={displayedRows}
        activeFilters={activeFilters}
        gridApi={gridApi}
      />
      <div className="ag-grid h-full w-full z-0">
        <AgGridReact
          theme={customTheme}
          columnDefs={columns}
          rowData={data}
          domLayout="normal"
          autoSizeStrategy={{ type: "fitCellContents" }}
          onGridReady={handleGridReady}
          onFilterChanged={handleFilterChanged}
          onModelUpdated={handleModelUpdated}
          defaultColDef={{
            filterParams: {
              buttons: ["reset", "apply"],
            },
          }}
        />
      </div>
    </div>
  );
};
