import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster } from "./toaster";
import { toast } from "sonner";
import { Button } from "../button";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Types: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast("Default message")}>Default</Button>
        <Button
          color="success"
          onClick={() => toast.success("Success message")}
        >
          Success
        </Button>
        <Button color="danger" onClick={() => toast.error("Error message")}>
          Error
        </Button>
        <Button
          color="warning"
          onClick={() => toast.warning("Warning message")}
        >
          Warning
        </Button>
        <Button onClick={() => toast.info("Info message")}>Info</Button>
        <Button
          onClick={() =>
            toast.success("Saved", {
              description: "Your changes have been saved.",
            })
          }
        >
          With Description
        </Button>
      </div>
    </>
  ),
};

export const Promise: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex gap-2">
        <Button
          color="success"
          onClick={() =>
            toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
              loading: "Saving...",
              success: "Saved successfully!",
              error: "Failed to save",
            })
          }
        >
          Promise Success
        </Button>
        <Button
          color="danger"
          onClick={() =>
            toast.promise(
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Network error")), 2000),
              ),
              {
                loading: "Saving...",
                success: "Saved successfully!",
                error: "Failed to save",
              },
            )
          }
        >
          Promise Error
        </Button>
      </div>
    </>
  ),
};
