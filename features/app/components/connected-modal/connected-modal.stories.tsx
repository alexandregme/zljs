import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import {
  appInitialState,
  Button,
  ConnectedModal,
  Text,
  useAppStore,
} from "@zljs/core";

const MODAL_ID = "story-modal";

const OpenModal = () => {
  const openModal = useAppStore((s) => s.openModal);

  const handleClick = () => {
    openModal(MODAL_ID);
  };

  return <Button onClick={handleClick}>Open modal</Button>;
};

const WithOpenButton: Decorator = (Story) => (
  <>
    <OpenModal />
    <Story />
  </>
);

export default {
  title: "Features/ConnectedModal",
  component: ConnectedModal,
  tags: ["autodocs"],
  // Open modals would cover the docs page and trap its focus, and every story
  // shares `useAppStore`: isolate each one.
  parameters: {
    docs: { toc: true, story: { inline: false, height: "360px" } },
  },
  decorators: [WithOpenButton],
  // Every story shares `useAppStore`: one can't start with the modal of another open.
  beforeEach: () => {
    useAppStore.setState(appInitialState);
  },
  args: { modalId: MODAL_ID, title: "Modal title" },
} satisfies Meta<typeof ConnectedModal>;

type Story = StoryObj<typeof ConnectedModal>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A `Modal` that `useAppStore` opens and closes, so the code that opens it doesn't have to be near it. `openModal(modalId)` shows it from anywhere, and closing it calls `closeModal(modalId)`. The button belongs to this page: it opens the modal through the store.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Modal title",
    });
    await userEvent.click(
      within(dialog).getByRole("button", { name: "Close" }),
    );

    await expect(useAppStore.getState().isModalOpen(MODAL_ID)).toBe(false);
  },
};

export const Content: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`title`, `description`, `size` and `children` go to the `Modal` as they are. This story opens the modal, so axe checks it.",
      },
    },
  },
  args: {
    description: "The description gives the title more context.",
    size: "sm",
    children: <Text>Any content goes in the body.</Text>,
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open modal" }));

    const dialog = await within(document.body).findByRole("dialog", {
      name: "Modal title",
    });

    await expect(dialog).toHaveAccessibleDescription(
      "The description gives the title more context.",
    );
  },
};
