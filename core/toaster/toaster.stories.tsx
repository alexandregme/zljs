import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, toast, useToastStore } from "@zljs/core";
import {
  focusOutlineContrast,
  hoverTextContrast,
  textContrast,
} from "@test-utils";
import { expect, waitFor } from "storybook/test";
import { Toaster } from "./toaster";

export default {
  title: "Components/Toaster",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true, story: { inline: false, height: "360px" } },
  },
} satisfies Meta<typeof Toaster>;

const typeNames = ["Default", "Success", "Error", "Warning", "Info"];
const storeNames = ["Success", "Error", "Warning", "Info"];

const shownToasts = () =>
  Array.from(
    document.querySelectorAll<HTMLElement>(
      '[data-sonner-toast][data-mounted="true"]',
    ),
  );

const closeButtons = () =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-close-button]"));

const waitForToasts = (count: number) =>
  waitFor(() => expect(shownToasts()).toHaveLength(count));

const typeOf = (element: HTMLElement) =>
  element.closest("[data-type]")?.getAttribute("data-type");

const settleIn2Seconds = (settle: "resolve" | "reject") =>
  new Promise<void>((resolve, reject) =>
    setTimeout(settle === "resolve" ? resolve : reject, 2000),
  );

const promiseMessages = {
  loading: "Saving...",
  success: "Saved successfully!",
  error: "Failed to save",
};

type Story = StoryObj<typeof Toaster>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Renders one per app, and shows nothing until a toast fires. It takes no props: a toast stays on screen for 4 seconds, at the bottom right, and pauses while the pointer is over it.",
      },
    },
  },
};

export const Types: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`toast()` is neutral, and `toast.success`, `toast.error`, `toast.warning` and `toast.info` take their colors from the `--color-zl-*` theme: `success`, `danger`, `warning` and `info`. The text is the `-strong` value, on the color at 15% over white. An app that changes a color checks its own contrast.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    for (const name of typeNames) {
      await userEvent.click(canvas.getByRole("button", { name }));
    }
    await waitForToasts(typeNames.length);

    const lowText = shownToasts().filter((item) => textContrast(item) < 4.5);
    const lowFocus = [...shownToasts(), ...closeButtons()].filter(
      (element) => focusOutlineContrast(element) < 3,
    );
    const lowHover = closeButtons().filter(
      (button) => hoverTextContrast(button) < 3,
    );

    await expect(lowText.map(typeOf)).toEqual([]);
    await expect(lowFocus.map(typeOf)).toEqual([]);
    await expect(lowHover.map(typeOf)).toEqual([]);
  },
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
        <Button color="info" onClick={() => toast.info("Info message")}>
          Info
        </Button>
      </div>
    </>
  ),
};

export const Descriptions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`description` adds a second line, in the color of the toast. Use it when the title alone doesn't say what happened.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Default" }));
    await userEvent.click(canvas.getByRole("button", { name: "Success" }));
    await waitForToasts(2);
  },
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            toast("Update ready", {
              description: "Restart the app to apply it.",
            })
          }
        >
          Default
        </Button>
        <Button
          color="success"
          onClick={() =>
            toast.success("Saved", {
              description: "Your changes have been saved.",
            })
          }
        >
          Success
        </Button>
      </div>
    </>
  ),
};

export const Promises: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`toast.promise` shows `loading` until the promise settles, then swaps it for `success` or `error`. The loading toast has no close button, so the user can't dismiss something still running.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Resolves" }));
    await userEvent.click(canvas.getByRole("button", { name: "Rejects" }));
    await waitForToasts(2);
  },
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button
          color="success"
          onClick={() =>
            toast.promise(settleIn2Seconds("resolve"), promiseMessages)
          }
        >
          Resolves
        </Button>
        <Button
          color="danger"
          onClick={() =>
            toast.promise(settleIn2Seconds("reject"), promiseMessages)
          }
        >
          Rejects
        </Button>
      </div>
    </>
  ),
};

export const Store: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`useToastStore` shows a toast from code outside React, such as a thunk: `useToastStore.getState().success(message)`. Inside a component, `toast` does the same and also takes a `description` or a promise.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    for (const name of storeNames) {
      await userEvent.click(canvas.getByRole("button", { name }));
    }
    await waitForToasts(storeNames.length);
  },
  render: () => (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <Button
          color="success"
          onClick={() => useToastStore.getState().success("Success message")}
        >
          Success
        </Button>
        <Button
          color="danger"
          onClick={() => useToastStore.getState().error("Error message")}
        >
          Error
        </Button>
        <Button
          color="warning"
          onClick={() => useToastStore.getState().warning("Warning message")}
        >
          Warning
        </Button>
        <Button
          color="info"
          onClick={() => useToastStore.getState().info("Info message")}
        >
          Info
        </Button>
      </div>
    </>
  ),
};
