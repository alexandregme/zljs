import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: "Button",
    type: "reset",
    variant: "link",
    color: "success",
    iconPosition: "left",
    disabled: true,
    "aria-label": "",
  },
};

export const Types: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button type="button">Button</Button>
      <Button type="submit">Submit</Button>
      <Button type="reset">Reset</Button>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="default">Default</Button>
      <Button icon="X" aria-label="Close" />
      <Button variant="ghost" icon="LogOut">
        Logout
      </Button>
      <Button variant="link" color="primary">
        Link primary
      </Button>
      <Button variant="link" color="danger">
        Link danger
      </Button>
      <Button variant="link" color="none">
        Link none
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button color="primary">Primary</Button>
      <Button color="success">Success</Button>
      <Button color="danger">Danger</Button>
      <Button color="warning">Warning</Button>
      <Button color="info">Info</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button size="sm" icon="Plus">
        Small
      </Button>
      <Button size="md" icon="Plus">
        Medium
      </Button>
      <Button size="lg" icon="Plus">
        Large
      </Button>
      <Button size="sm" icon="X" aria-label="Close small" />
      <Button size="md" icon="X" aria-label="Close medium" />
      <Button size="lg" icon="X" aria-label="Close large" />
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Button icon="X" aria-label="Close" />
      <Button icon="Plus">Add Item</Button>
      <Button icon="ChevronRight" iconPosition="right">
        Next
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button disabled>Disabled</Button>
      <Button onClick={() => alert("Clicked!")}>Click me</Button>
    </div>
  ),
};
