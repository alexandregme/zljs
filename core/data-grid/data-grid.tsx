import { AG_GRID_LOCALE_BR } from "@ag-grid-community/locale";
import type { ColDef, GridApi } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import type { DataGridProps } from "./data-grid.interface";
import { DataGridToolbar } from "./data-grid-toolbar";
import type { ActiveFilter } from "./data-grid-status-bar";
import { DataGridStatusBar } from "./data-grid-status-bar";
import { dataGridTheme } from "./data-grid.const";
import { dataGrid } from "./data-grid.styles";

ModuleRegistry.registerModules([AllCommunityModule]);

export const DataGrid = <
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  data,
  showSearch = true,
  "aria-label": ariaLabel = "Tabela de dados",
}: DataGridProps<T>) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedRows, setDisplayedRows] = useState(data.length);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);

  // A column with a width keeps it; the others fit their content.
  const columnDefs = columns.map((column) => ({
    ...column,
    suppressAutoSize: column.width !== undefined,
  })) as ColDef<T>[];

  const handleGridReady = ({ api }: { api: GridApi }) => {
    api.setGridAriaProperty("label", ariaLabel);
    setGridApi(api);
  };

  // The model only lists columns of the grid, and each of its filters is a
  // built-in one, which has a text form.
  const handleFilterChanged = async ({ api }: { api: GridApi }) => {
    const filters = await Promise.all(
      Object.entries(api.getFilterModel()).map(
        async ([column, model]): Promise<ActiveFilter> => ({
          column,
          headerName: api.getDisplayNameForColumn(
            api.getColumn(column)!,
            "header",
          ),
          value: (await api.getColumnFilterInstance(column))!.getModelAsString!(
            model,
          ),
        }),
      ),
    );

    setActiveFilters(filters);
  };

  const handleModelUpdated = ({ api }: { api: GridApi }) => {
    setDisplayedRows(api.getDisplayedRowCount());
  };

  const handleSearch = () => {
    gridApi?.setGridOption("quickFilterText", searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    gridApi?.setGridOption("quickFilterText", "");
  };

  const handleClearFilter = (column: string) => {
    gridApi?.setColumnFilterModel(column, null).then(() => {
      gridApi.onFilterChanged();
    });
  };

  const handleClearAll = () => {
    handleClearSearch();
    gridApi?.setFilterModel(null);
  };

  const { base, table } = dataGrid();

  return (
    <div data-testid="data-grid" className={base()}>
      {showSearch && (
        <DataGridToolbar
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={handleSearch}
          onClear={handleClearSearch}
        />
      )}
      <DataGridStatusBar
        totalRows={data.length}
        displayedRows={displayedRows}
        activeFilters={activeFilters}
        onClearFilter={handleClearFilter}
        onClearAll={handleClearAll}
      />
      <div className={table()}>
        <AgGridReact
          theme={dataGridTheme}
          columnDefs={columnDefs}
          rowData={data}
          domLayout="normal"
          autoSizeStrategy={{ type: "fitCellContents" }}
          localeText={AG_GRID_LOCALE_BR}
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
