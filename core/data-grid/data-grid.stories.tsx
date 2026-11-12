import { focusOutlineContrast, hoverTextContrast } from "@test-utils";
import { Heading, Tag } from "@zljs/core";
import type { DataGridColumn } from "@zljs/core";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { DataGrid } from "./data-grid";

// AG Grid renders asynchronously, the header and the rows in separate frames:
// the a11y test must not see it half-built.
const waitForGrid = async (canvasElement: HTMLElement, withRows = true) => {
  await waitFor(() => {
    expect(canvasElement.querySelector(".ag-header-cell")).not.toBeNull();
    if (withRows) {
      expect(canvasElement.querySelector(".ag-cell")).not.toBeNull();
    }
  });
};

export default {
  title: "Components/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
  parameters: { docs: { toc: true }, a11y: { test: "error" } },
  play: async ({ canvasElement, args }) => {
    await waitForGrid(canvasElement, Boolean(args.data?.length));
  },
} satisfies Meta<typeof DataGrid>;

const columns: DataGridColumn[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "email", headerName: "Email" },
  { field: "role", headerName: "Role" },
];

const data = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Admin",
  },
];

const manyRows = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "User",
}));

const filterColumns: DataGridColumn[] = [
  { field: "id", headerName: "ID", filter: true },
  { field: "name", headerName: "Name", filter: true },
  { field: "email", headerName: "Email" },
];

const optionColumns: DataGridColumn[] = [
  { field: "id", headerName: "ID", pinned: "left", width: 80 },
  { field: "name", headerName: "Name", filter: true },
  {
    field: "role",
    headerName: "Role",
    cellRenderer: ({ value }) => <Tag>{String(value)}</Tag>,
  },
  {
    field: "price",
    headerName: "Price",
    valueFormatter: ({ value }) => `$ ${Number(value).toFixed(2)}`,
    cellStyle: ({ value }) =>
      Number(value) > 10 ? { fontWeight: 700 } : undefined,
  },
  { field: "email", headerName: "Email", pinned: "right" },
];

const optionData = data.map((row) => ({ ...row, price: row.id * 4 }));

const openFilter = async (canvasElement: HTMLElement, value: string) => {
  await waitForGrid(canvasElement);

  const buttons = canvasElement.querySelectorAll<HTMLElement>(
    ".ag-header-cell-filter-button",
  );
  await userEvent.click(buttons[1] as HTMLElement);

  await waitFor(() => {
    expect(canvasElement.querySelector(".ag-filter input")).not.toBeNull();
  });

  const input = canvasElement.querySelector<HTMLInputElement>(
    ".ag-filter input:not([type=hidden])",
  );
  await userEvent.type(input as HTMLInputElement, value);
};

const applyFilter = async (canvasElement: HTMLElement, value: string) => {
  await openFilter(canvasElement, value);

  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: "Aplicar" }));

  await waitFor(() => {
    expect(
      canvas.getByRole("button", { name: "Remover filtro Name" }),
    ).toBeInTheDocument();
  });
};

type Story = StoryObj<typeof DataGrid>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Only `columns` and `data` are required. The grid fills its parent on its own, so an app sets no height on it: it takes the height of a parent that has one, and what is left of a flex column, next to a header for example. It has a minimum height of 320px when the parent has no height, so it never collapses. Past that, its rows scroll inside it.",
      },
    },
  },
  args: { columns, data },
};

export const Columns: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "What each column takes: `pinned` keeps it on the `left` or `right` while the others scroll, `width` fixes its size in pixels, `filter` adds a filter button to its header, `cellRenderer` renders any component in its cells, `valueFormatter` changes only the text, and `cellStyle` sets a style per cell.",
      },
    },
  },
  args: { columns: optionColumns, data: optionData },
  play: async ({ canvasElement }) => {
    await waitForGrid(canvasElement);

    const body = canvasElement.querySelector(".ag-grid-scrolling-container");
    const header = within(canvasElement).getByRole("columnheader", {
      name: "ID",
    });

    expect(body?.getBoundingClientRect().height).toBeGreaterThan(0);
    expect(header.getBoundingClientRect().width).toBe(80);
    expect(focusOutlineContrast(header)).toBeGreaterThanOrEqual(3);
  },
};

export const Data: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "With no rows, the grid keeps its headers and shows a message. With more rows than fit, only the ones on screen are rendered.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <Heading level={2}>Empty</Heading>
      <DataGrid columns={columns} data={[]} aria-label="Empty" />
      <Heading level={2}>Many rows</Heading>
      <DataGrid columns={columns} data={manyRows} aria-label="Many rows" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await waitForGrid(canvasElement);
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`showSearch={false}` removes the search, for a short list. `aria-label` names the grid for screen readers and defaults to `Tabela de dados`: pass it when a page has more than one grid, so they can be told apart.",
      },
    },
  },
  args: { columns, data, showSearch: false, "aria-label": "Users" },
};

export const Searched: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A search keeps the rows with the text in any column, and the count shows how many of the total are left. `Limpar` clears only the search.",
      },
    },
  },
  args: { columns, data },
  play: async ({ canvasElement }) => {
    await waitForGrid(canvasElement);

    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByRole("textbox", { name: "Buscar na tabela" }),
      "jane{Enter}",
    );

    await waitFor(() => {
      expect(
        canvas.getByRole("status", { name: "1 / 5 registros" }),
      ).toBeInTheDocument();
    });
  },
};

export const FilterOpen: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The filter of a column opens from its header. Its texts come from AG Grid in Brazilian Portuguese, and its buttons use the primary color.",
      },
    },
  },
  args: { columns: filterColumns, data },
  play: async ({ canvasElement }) => {
    await openFilter(canvasElement, "jane");

    const canvas = within(canvasElement);
    const controls = [
      canvas.getByRole("button", { name: "Aplicar" }),
      canvas.getByRole("button", { name: "Redefinir" }),
      ...canvas.getAllByRole("combobox"),
      canvasElement.querySelector<HTMLElement>(
        ".ag-filter input:not([type=hidden])",
      ) as HTMLElement,
    ];

    controls.forEach((control) => {
      expect(focusOutlineContrast(control)).toBeGreaterThanOrEqual(3);
    });
  },
};

export const Filtered: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Each active filter shows as a tag with its column and value, and its remove button is named after the column. `Limpar todos` clears the filters and the search.",
      },
    },
  },
  args: { columns: filterColumns, data },
  play: async ({ canvasElement }) => {
    await applyFilter(canvasElement, "jane");

    const canvas = within(canvasElement);
    const clearAll = canvas.getByRole("button", { name: "Limpar todos" });

    expect(
      canvas.getByRole("status", { name: "1 / 5 registros" }),
    ).toBeInTheDocument();
    expect(canvas.getByText("Name: jane")).toBeInTheDocument();
    expect(hoverTextContrast(clearAll)).toBeGreaterThanOrEqual(4.5);
    expect(focusOutlineContrast(clearAll)).toBeGreaterThanOrEqual(3);
    expect(
      focusOutlineContrast(
        canvas.getByRole("button", { name: "Remover filtro Name" }),
      ),
    ).toBeGreaterThanOrEqual(3);
  },
};

export const FilterRemoved: Story = {
  parameters: {
    docs: {
      description: {
        story: "The remove button of a tag clears only that filter.",
      },
    },
  },
  args: { columns: filterColumns, data },
  play: async ({ canvasElement }) => {
    await applyFilter(canvasElement, "jane");

    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: "Remover filtro Name" }),
    );

    await waitFor(() => {
      expect(
        canvas.getByRole("status", { name: "5 registros" }),
      ).toBeInTheDocument();
    });
    expect(canvas.queryByText("Name: jane")).not.toBeInTheDocument();
  },
};

export const AllCleared: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Limpar todos` also empties the search, so the grid goes back to every row.",
      },
    },
  },
  args: { columns: filterColumns, data },
  play: async ({ canvasElement }) => {
    await applyFilter(canvasElement, "jane");

    const canvas = within(canvasElement);
    const search = canvas.getByRole("textbox", { name: "Buscar na tabela" });
    await userEvent.type(search, "zzz{Enter}");
    await userEvent.click(canvas.getByRole("button", { name: "Limpar todos" }));

    await waitFor(() => {
      expect(
        canvas.getByRole("status", { name: "5 registros" }),
      ).toBeInTheDocument();
    });
    expect(search).toHaveValue("");
  },
};
