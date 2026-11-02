import type { Meta, StoryObj } from "@storybook/react-vite";
import { useSelector } from "react-redux";
import { expect } from "storybook/test";
import { MockStoreProvider } from "@test-utils";
import { Text, usePageStore } from "@zljs/core";
import { PageConfig } from "./page-config";

export default {
  title: "Next/PageConfig",
  component: PageConfig,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
  decorators: [
    (Story) => (
      <MockStoreProvider>
        <Story />
      </MockStoreProvider>
    ),
  ],
} satisfies Meta<typeof PageConfig>;

const featureReducers = {
  feature: (state = "State from the feature's reducer") => state,
};

const Feature = () => {
  const value = useSelector((state: { feature?: string }) => state.feature);
  return <Text>{value ?? "No feature yet"}</Text>;
};

const PageTitle = () => {
  const title = usePageStore((s) => s.title);
  return <Text>{`Title in the store: ${title}`}</Text>;
};

type Story = StoryObj<typeof PageConfig>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A feature's state configuration, and each page has its own. It renders no markup, only its children. `reducers` and `initPage` are functions, which a Server Component can't pass to a Client Component, so the file that renders it starts with `'use client'`. It needs a store above it, from `AppProviders`.",
      },
    },
  },
  args: {
    title: "Orders",
    children: <Text>Page content goes here</Text>,
  },
};

export const Titles: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`title` goes to `usePageStore`, for a layout component such as a header to read. It doesn't change the browser tab: that comes from Next.js `metadata`.",
      },
    },
  },
  args: {
    title: "Orders",
    children: <PageTitle />,
  },
};

export const Reducers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`reducers` enter the store when the page mounts, and replace the previous page's reducers. The children's first render comes before that.",
      },
    },
  },
  args: {
    title: "Orders",
    reducers: featureReducers,
    children: <Feature />,
  },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByText("State from the feature's reducer"),
    ).toBeInTheDocument();
  },
};

export const InitPages: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`initPage` receives `dispatch` and runs once when the page mounts, usually dispatching the feature's thunks. The children don't wait for it, and `Loader` covers a request made with `HTTPClient`.",
      },
    },
  },
  args: {
    title: "Orders",
    initPage: (dispatch) => {
      dispatch({ type: "orders/fetch" });
    },
    children: <Text>Page content goes here</Text>,
  },
};
