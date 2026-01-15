import type { ReactNode } from "react";

export interface DataGridColumn {
  field: string;
  headerName: string;
  cellRenderer?: (params: { data?: Record<string, unknown> }) => ReactNode;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  data: Record<string, unknown>[];
  showSearch?: boolean;
}
