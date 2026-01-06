export interface DataGridColumn {
  field: string;
  header: string;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  data: Record<string, unknown>[];
}
