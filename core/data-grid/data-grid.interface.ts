export interface DataGridColumn {
  field: string;
  headerName: string;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  data: Record<string, unknown>[];
  showSearch?: boolean;
}
