import type { Meta, StoryObj } from "@storybook/react-vite";
import { useSelector } from "react-redux";
import { expect } from "storybook/test";
import { MOCK_REDUCERS, MockStoreProvider } from "@test-utils";
import { ReduxProvider, Text } from "@zljs/core";

export default {
  title: "Redux/ReduxProvider",
  component: ReduxProvider,
  tags: ["autodocs"],
  parameters: { docs: { toc: true } },
} satisfies Meta<typeof ReduxProvider>;

const Title = () => {
  const value = useSelector((state: { title: string }) => state.title);
  return <Text>{value}</Text>;
};

type Story = StoryObj<typeof ReduxProvider>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Gives its children a Redux store, created once per mount, so each request on the server gets its own. It renders no markup of its own.",
      },
    },
  },
  args: {
    children: <Text>App content goes here</Text>,
  },
};

export const Reducers: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`reducers` and `coreReducers` become keys of the store's state, and children read them with `useSelector`. `preloadedState` and `middlewares` only count on the first render, when the store is created.",
      },
    },
  },
  render: () => (
    <ReduxProvider reducers={MOCK_REDUCERS}>
      <Title />
    </ReduxProvider>
  ),
};

export const MockStore: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "A story or test of a component that reads the store uses `MockStoreProvider` from `@test-utils`. Each one has its own store, so a story picks its own state and shares nothing with the others.",
      },
    },
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText("Hello from the mock store"),
    ).toBeInTheDocument();
  },
  render: () => (
    <MockStoreProvider preloadedState={{ title: "Hello from the mock store" }}>
      <Title />
    </MockStoreProvider>
  ),
};
