import { GridApi } from "ag-grid-community";
import { Tag } from "../tag";
import { Button } from "../button";

export interface ActiveFilter {
  column: string;
  headerName: string;
  value: string;
}

export interface DataGridStatusBarProps {
  totalRows: number;
  displayedRows: number;
  activeFilters: ActiveFilter[];
  gridApi: GridApi | null;
}

export const DataGridStatusBar = ({
  totalRows,
  displayedRows,
  activeFilters,
  gridApi,
}: DataGridStatusBarProps) => {
  const isFiltered = displayedRows !== totalRows || activeFilters.length > 0;

  const handleClearFilter = (column: string) => {
    if (!gridApi) return;
    const filterInstance = gridApi.getColumnFilterInstance(column);
    if (filterInstance) {
      filterInstance.then((filter) => {
        filter?.setModel(null);
        gridApi.onFilterChanged();
      });
    }
  };

  const handleClearAllFilters = () => {
    if (!gridApi) return;
    gridApi.setFilterModel(null);
  };

  return (
    <div className="flex items-center gap-3 px-2 py-1.5 bg-slate-100 border border-slate-200 rounded text-sm text-slate-600 mb-2">
      <span className="font-medium">
        {isFiltered ? (
          <>
            <span className="text-blue-600">{displayedRows}</span>
            <span className="text-slate-400"> / </span>
            <span>{totalRows}</span>
            <span className="text-slate-500 ml-1">registros</span>
          </>
        ) : (
          <>
            <span>{totalRows}</span>
            <span className="text-slate-500 ml-1">registros</span>
          </>
        )}
      </span>

      {activeFilters.length > 0 && (
        <>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500">Filtros:</span>
            {activeFilters.map((filter) => (
              <Tag
                key={filter.column}
                color="blue"
                onRemove={() => handleClearFilter(filter.column)}
              >
                <span className="font-medium">{filter.headerName}:</span>
                <span>{filter.value}</span>
              </Tag>
            ))}
            <Button variant="link" color="none" onClick={handleClearAllFilters}>
              Limpar todos
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
