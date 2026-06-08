import type { ReactNode } from "react";

export interface DataGridCellParams<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  data?: T;
}

export interface DataGridColumn<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  field: string;
  headerName: string;
  cellRenderer?: (params: DataGridCellParams<T>) => ReactNode;
  pinned?: "left" | "right";
  filter?: boolean;
  width?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellStyle?: (params: DataGridCellParams<T>) => Record<string, string | number | undefined> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueFormatter?: (params: DataGridCellParams<T>) => string;
}

export interface DataGridProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  columns: DataGridColumn<T>[];
  data: T[];
  showSearch?: boolean;
}
