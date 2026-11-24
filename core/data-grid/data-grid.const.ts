import { themeAlpine } from "ag-grid-community";

// Tailwind neutrals, for the header: it is dark in both themes, slate on the
// light page and neutral, as the surfaces around it, on the dark one.
const dataGridPalette = {
  slate: {
    50: "#f8fafc",
    600: "#475569",
    700: "#334155",
  },
  neutral: {
    700: "#404040",
    800: "#262626",
  },
};

// The rest uses the theme values, so the grid follows the light or the dark
// theme, and an app can change its accent.
export const dataGridTheme = themeAlpine.withParams({
  // Alpine fixes the grid in the light scheme, which would keep the light side
  // of every theme value: the grid takes the scheme of the page instead.
  browserColorScheme: "inherit",
  accentColor: "var(--color-zl-primary)",
  backgroundColor: "var(--color-zl-surface)",
  foregroundColor: "var(--color-zl-text)",
  headerBackgroundColor: `light-dark(${dataGridPalette.slate[700]}, ${dataGridPalette.neutral[800]})`,
  headerTextColor: dataGridPalette.slate[50],
  oddRowBackgroundColor: "var(--color-zl-surface-muted)",
  rowHoverColor:
    "color-mix(in oklab, var(--color-zl-primary) 12%, var(--color-zl-surface))",
  selectedRowBackgroundColor:
    "color-mix(in oklab, var(--color-zl-primary) 20%, var(--color-zl-surface))",
  borderColor: "var(--color-zl-border)",
  headerColumnBorder: `light-dark(${dataGridPalette.slate[600]}, ${dataGridPalette.neutral[700]})`,
  fontSize: 13,
  headerHeight: 36,
  rowHeight: 32,
  cellHorizontalPadding: 8,
});
