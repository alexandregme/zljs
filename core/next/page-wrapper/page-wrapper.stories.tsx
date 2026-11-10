import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Card, Text } from "@zljs/core";
import { PageWrapper } from "./page-wrapper";

export default {
  title: "Next/PageWrapper",
  component: PageWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { toc: true, story: { inline: false, iframeHeight: 420 } },
  },
} satisfies Meta<typeof PageWrapper>;

type Story = StoryObj<typeof PageWrapper>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The frame of a page with a single block in the middle, such as a sign-in card. It takes the height of the screen, centers its `children` and keeps them narrow, so the block itself doesn't have to.",
      },
    },
  },
  args: {
    children: (
      <Card title="Sign in" titleLevel={1} message="Choose how to sign in">
        <Text>The content of the page goes here.</Text>
      </Card>
    ),
  },
  play: async ({ canvas }) => {
    const card = canvas.getByRole("heading", { level: 1, name: "Sign in" });
    const frame = canvas.getByText("The content of the page goes here.");

    await expect(card).toBeVisible();
    await expect(frame.getBoundingClientRect().width).toBeLessThanOrEqual(384);
  },
};
