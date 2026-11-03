import { focusOutlineContrast, hoverTextContrast } from "@test-utils";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { DataGridStatusBar } from "./data-grid-status-bar";

export default {
  title: "Components/DataGrid/StatusBar",
  component: DataGridStatusBar,
  tags: ["autodocs"],
  parameters: { docs: { toc: true }, a11y: { test: "error" } },
} satisfies Meta<typeof DataGridStatusBar>;

const activeFilters = [
  { column: "name", headerName: "Nome", value: "Ana" },
  { column: "role", headerName: "Perfil", value: "Admin" },
];

const handleClear = () => {};

type Story = StoryObj<typeof DataGridStatusBar>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With every row on screen, the bar shows only the total. The count is a `role=status`, so a screen reader announces it when it changes.",
      },
    },
  },
  args: {
    totalRows: 10,
    displayedRows: 10,
    activeFilters: [],
    onClearFilter: handleClear,
    onClearAll: handleClear,
  },
};

export const DisplayedRows: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "When `displayedRows` differs from `totalRows`, as after a search, the bar shows both, with the rows on screen in the primary color.",
      },
    },
  },
  args: {
    totalRows: 10,
    displayedRows: 3,
    activeFilters: [],
    onClearFilter: handleClear,
    onClearAll: handleClear,
  },
};

export const ActiveFilters: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each item of `activeFilters` is a tag with its column and value, after a border that separates the filters from the count. The tags wrap when they don't fit.",
      },
    },
  },
  args: {
    totalRows: 10,
    displayedRows: 3,
    activeFilters,
    onClearFilter: handleClear,
    onClearAll: handleClear,
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The remove button of a tag, named after its column, calls `onClearFilter` with the column. `Limpar todos` calls `onClearAll`. Both keep a visible focus outline and `Limpar todos` keeps its contrast on hover.",
      },
    },
  },
  args: {
    totalRows: 10,
    displayedRows: 3,
    activeFilters,
    onClearFilter: handleClear,
    onClearAll: handleClear,
  },
  play: async ({ canvas }) => {
    const clearAll = canvas.getByRole("button", { name: "Limpar todos" });

    expect(hoverTextContrast(clearAll)).toBeGreaterThanOrEqual(4.5);
    expect(focusOutlineContrast(clearAll)).toBeGreaterThanOrEqual(3);
    expect(
      focusOutlineContrast(
        canvas.getByRole("button", { name: "Remover filtro Nome" }),
      ),
    ).toBeGreaterThanOrEqual(3);
  },
};
