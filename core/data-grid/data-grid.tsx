import { AllCommunityModule, GridApi, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { DataGridProps } from "./data-grid.interface";
import { DataGridToolbar } from "./data-grid-toolbar";

ModuleRegistry.registerModules([AllCommunityModule]);

export const DataGrid = ({
  columns,
  data,
  showSearch = true,
}: DataGridProps) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const handleGridReady = (params: { api: GridApi }) => {
    setGridApi(params.api);
  };

  return (
    <div data-testid="data-grid" className="ag-theme-alpine h-full w-full">
      {showSearch && <DataGridToolbar gridApi={gridApi} />}
      <AgGridReact
        columnDefs={columns}
        rowData={data}
        domLayout="autoHeight"
        autoSizeStrategy={{ type: "fitCellContents" }}
        onGridReady={handleGridReady}
      />
    </div>
  );
};
