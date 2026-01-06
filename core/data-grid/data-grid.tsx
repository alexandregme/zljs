import { AllCommunityModule, ColDef, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { DataGridProps } from "./data-grid.interface";

ModuleRegistry.registerModules([AllCommunityModule]);

export const DataGrid = ({ columns, data }: DataGridProps): JSX.Element => {
  const columnDefs: ColDef[] = columns.map((col) => ({
    field: col.field,
    headerName: col.header,
  }));

  return (
    <div data-testid="data-grid" className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
        domLayout="autoHeight"
        autoSizeStrategy={{ type: "fitCellContents" }}
      />
    </div>
  );
};
