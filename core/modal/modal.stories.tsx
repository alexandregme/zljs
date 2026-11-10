import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { textContrast } from "@test-utils";
import { Modal } from "./modal";
import type { ModalSize } from "./modal.interface";
import { Button } from "@zljs/core";
import type { SemanticColor } from "@zljs/core";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  // Open modals would cover the docs page and trap its focus: isolate each one.
  parameters: {
    docs: { story: { inline: false, height: "360px" } },
  },
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

const SIZES: ModalSize[] = ["xs", "sm", "md", "lg", "xl", "full"];

interface SizeButtonProps {
  size: ModalSize;
  onOpen: (size: ModalSize) => void;
}

const SizeButton = ({ size, onOpen }: SizeButtonProps) => {
  const handleClick = () => {
    onOpen(size);
  };

  return <Button onClick={handleClick}>{size}</Button>;
};

const SizesTemplate = () => {
  const [size, setSize] = useState<ModalSize | null>(null);

  const close = () => {
    setSize(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {SIZES.map((option) => (
          <SizeButton key={option} size={option} onOpen={setSize} />
        ))}
      </div>
      <Modal
        open={size !== null}
        onClose={close}
        title={`Size ${size}`}
        description="The width changes with the size, up to the width of the screen."
        size={size ?? undefined}
      >
        <div className="flex gap-2 justify-end">
          <Button color="ghost" onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Confirm</Button>
        </div>
      </Modal>
    </>
  );
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`size` sets the width: `xs`, `sm`, `md` (the default), `lg`, `xl` or `full`. `xs` is the smallest, for a short question and its buttons. Each button opens the modal in one size, with two buttons in it, as a question has.",
      },
    },
  },
  render: () => <SizesTemplate />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "xs" }));

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Size xs",
    });

    await expect(dialog).toBeVisible();
  },
};

const COLORS: SemanticColor[] = [
  "primary",
  "success",
  "danger",
  "warning",
  "info",
  "muted",
  "none",
];

interface ColorButtonProps {
  color: SemanticColor;
  onOpen: (color: SemanticColor) => void;
}

const ColorButton = ({ color, onOpen }: ColorButtonProps) => {
  const handleClick = () => {
    onOpen(color);
  };

  return (
    <Button color={color} onClick={handleClick}>
      {color}
    </Button>
  );
};

const ColorsTemplate = () => {
  const [color, setColor] = useState<SemanticColor | null>(null);

  const close = () => {
    setColor(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {COLORS.map((option) => (
          <ColorButton key={option} color={option} onOpen={setColor} />
        ))}
      </div>
      <Modal
        open={color !== null}
        onClose={close}
        title={`Color ${color}`}
        description="The color goes on the title and on the background."
        size="xs"
        color={color ?? undefined}
      >
        <div className="flex gap-2 justify-end">
          <Button color="ghost" onClick={close}>
            Cancel
          </Button>
          <Button color={color ?? undefined} onClick={close}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`color` paints the title and gives the modal a light background in that color, such as `danger` for a question that can't be undone. `none`, the default, has a dark title on white. The buttons inside take their own `color`. Each button opens the modal in its own color.",
      },
    },
  },
  render: () => <ColorsTemplate />,
  play: async ({ canvas, userEvent }) => {
    // Axe only sees the modal left open: measure the text of every color on its tint.
    for (const color of COLORS) {
      await userEvent.click(canvas.getByRole("button", { name: color }));

      const dialog = await within(document.body).findByRole("dialog", {
        name: `Color ${color}`,
      });
      const title = within(dialog).getByRole("heading");
      const description = within(dialog).getByText(/The color goes/);

      await expect(textContrast(title)).toBeGreaterThanOrEqual(4.5);
      await expect(textContrast(description)).toBeGreaterThanOrEqual(4.5);

      await userEvent.keyboard("{Escape}");
    }

    await userEvent.click(canvas.getByRole("button", { name: "danger" }));

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Color danger",
    });

    await expect(dialog).toBeVisible();
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
