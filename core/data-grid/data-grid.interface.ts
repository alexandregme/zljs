import type { ReactNode } from "react";

export interface DataGridColumn<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  field: string;
  headerName: string;
  cellRenderer?: (params: { data?: T }) => ReactNode;
  pinned?: "left" | "right";
  filter?: boolean;
}

export interface DataGridProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  columns: DataGridColumn<T>[];
  data: T[];
  showSearch?: boolean;
}
