import { Tag } from "../tag";
import { Button } from "../button";
import { Text } from "../text";

export interface ActiveFilter {
  column: string;
  headerName: string;
  value: string;
}

export interface DataGridStatusBarProps {
  totalRows: number;
  displayedRows: number;
  activeFilters: ActiveFilter[];
  onClearFilter: (column: string) => void;
  onClearAll: () => void;
}

export const DataGridStatusBar = ({
  totalRows,
  displayedRows,
  activeFilters,
  onClearFilter,
  onClearAll,
}: DataGridStatusBarProps) => {
  const isFiltered = displayedRows !== totalRows || activeFilters.length > 0;
  const count = isFiltered
    ? `${displayedRows} / ${totalRows} registros`
    : `${totalRows} registros`;

  return (
    <div className="flex items-center gap-3 px-2 py-1.5 bg-slate-100 border border-slate-200 rounded text-sm text-slate-600 mb-2">
      <span role="status" aria-label={count} className="font-medium">
        {isFiltered && (
          <>
            <Text as="span" variant="caption" color="primary">
              {displayedRows}
            </Text>{" "}
            <Text as="span" variant="caption">
              /
            </Text>{" "}
          </>
        )}
        <Text as="span" variant="caption">
          {totalRows}
        </Text>{" "}
        <Text as="span" variant="caption">
          registros
        </Text>
      </span>

      {activeFilters.length > 0 && (
        <>
          <div className="flex items-center gap-2 flex-wrap border-l border-slate-300 pl-3">
            <Text as="span" variant="caption">
              Filtros:
            </Text>
            {activeFilters.map((filter) => (
              <Tag
                key={filter.column}
                onRemove={() => onClearFilter(filter.column)}
                removeLabel={`Remover filtro ${filter.headerName}`}
              >
                {`${filter.headerName}: ${filter.value}`}
              </Tag>
            ))}
            <Button variant="link" color="none" onClick={onClearAll}>
              Limpar todos
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
