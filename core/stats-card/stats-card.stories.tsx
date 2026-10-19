import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatsCard } from "./stats-card";

const meta: Meta<typeof StatsCard> = {
  title: "Components/StatsCard",
  component: StatsCard,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Playground: Story = {
  args: {
    label: "Total",
    value: 150,
    color: "blue",
  },
};

export const Values: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <StatsCard label="Number" value={150} color="blue" />
      <StatsCard label="String" value="OK" color="blue" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <StatsCard label="Total" value={150} color="blue" />
      <StatsCard label="Errors" value={12} color="red" />
      <StatsCard label="Warnings" value={8} color="yellow" />
      <StatsCard label="Success" value={130} color="green" />
      <StatsCard label="Pending" value={15} color="gray" />
      <StatsCard label="In Progress" value={5} color="orange" />
    </div>
  ),
};
