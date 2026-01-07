import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Modal } from "./modal";
import { Button } from "../button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Modal Title",
  },
};

export const WithDescription: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Modal Title",
    description:
      "This is a description that provides more context about the modal.",
  },
};

export const WithContent: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: "Modal Title",
    description: "Are you sure you want to proceed?",
    children: (
      <div className="flex gap-2 justify-end">
        <Button type="button">Cancel</Button>
        <Button type="button">Confirm</Button>
      </div>
    ),
  },
};

const InteractiveTemplate = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to delete this item? This action cannot be undone."
      >
        <div className="flex gap-2 justify-end">
          <Button type="button" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};
