import { themeAlpine } from "ag-grid-community";

// Tailwind neutrals. The accent uses the theme value, so an app can change it.
const dataGridPalette = {
  slate: {
    50: "#f8fafc",
    200: "#e2e8f0",
    600: "#475569",
    700: "#334155",
  },
  sky: {
    100: "#e0f2fe",
  },
  blue: {
    100: "#dbeafe",
  },
};

export const dataGridTheme = themeAlpine.withParams({
  accentColor: "var(--color-zl-primary)",
  headerBackgroundColor: dataGridPalette.slate[700],
  headerTextColor: dataGridPalette.slate[50],
  oddRowBackgroundColor: dataGridPalette.slate[50],
  rowHoverColor: dataGridPalette.sky[100],
  selectedRowBackgroundColor: dataGridPalette.blue[100],
  borderColor: dataGridPalette.slate[200],
  headerColumnBorder: dataGridPalette.slate[600],
  fontSize: 13,
  headerHeight: 36,
  rowHeight: 32,
  cellHorizontalPadding: 8,
});
