import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGrid } from "./data-grid";

const meta: Meta<typeof DataGrid> = {
  title: "Components/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

const sampleColumns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name" },
  { field: "email", headerName: "Email" },
  { field: "role", headerName: "Role" },
];

const sampleData = [
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

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

export const EmptyGrid: Story = {
  args: {
    columns: sampleColumns,
    data: [],
  },
};

export const SingleColumn: Story = {
  args: {
    columns: [{ field: "name", headerName: "Name" }],
    data: sampleData,
  },
};

export const ManyRows: Story = {
  args: {
    columns: sampleColumns,
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "User",
    })),
  },
};
