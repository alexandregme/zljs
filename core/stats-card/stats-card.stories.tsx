import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatsCard } from "./stats-card";

const meta: Meta<typeof StatsCard> = {
  title: "Components/StatsCard",
  component: StatsCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Blue: Story = {
  args: {
    label: "Total de Produtos",
    value: 150,
    color: "blue",
  },
};

export const Red: Story = {
  args: {
    label: "Problemas de URL",
    value: 12,
    color: "red",
  },
};

export const Yellow: Story = {
  args: {
    label: "Problemas de Tags",
    value: 8,
    color: "yellow",
  },
};

export const Green: Story = {
  args: {
    label: "Produtos OK",
    value: 130,
    color: "green",
  },
};

export const Gray: Story = {
  args: {
    label: "Total",
    value: 200,
    color: "gray",
  },
};

export const Orange: Story = {
  args: {
    label: "Pagamento Pendente",
    value: 25,
    color: "orange",
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4">
      <StatsCard label="Total" value={200} color="gray" />
      <StatsCard label="Info" value={150} color="blue" />
      <StatsCard label="Warnings" value={8} color="yellow" />
      <StatsCard label="Pending" value={25} color="orange" />
      <StatsCard label="Errors" value={12} color="red" />
      <StatsCard label="Success" value={130} color="green" />
    </div>
  ),
};
