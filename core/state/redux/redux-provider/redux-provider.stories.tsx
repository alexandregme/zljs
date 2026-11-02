import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Middleware } from "@reduxjs/toolkit";
import { expect } from "storybook/test";
import { MOCK_REDUCERS, MockStoreProvider } from "@test-utils";
import { Button, Heading, ReduxProvider, Text } from "@zljs/core";

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

const DispatchButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch({ type: "demo/clicked" });
  return <Button onClick={handleClick}>Dispatch an action</Button>;
};

const MiddlewaresExample = () => {
  const [lastAction, setLastAction] = useState("none");
  const logType: Middleware = () => (next) => (action) => {
    setLastAction((action as { type: string }).type);
    return next(action);
  };

  return (
    <ReduxProvider reducers={MOCK_REDUCERS} middlewares={[logType]}>
      <Text>{`Last action: ${lastAction}`}</Text>
      <DispatchButton />
    </ReduxProvider>
  );
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
          "`reducers` become keys of the store's state, and children read them with `useSelector`. Every prop only counts on the first render, when the store is created, so changing `reducers` later does nothing. To change reducers after that, call `setDynamicReducers` on the store.",
      },
    },
  },
  render: () => (
    <ReduxProvider reducers={MOCK_REDUCERS}>
      <Title />
    </ReduxProvider>
  ),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "These props change the store, not what renders. Use `coreReducers` for reducers that must always stay: on a shared key they win over `reducers` and over the reducers from `setDynamicReducers`. Use `preloadedState` to start the store with known values, such as state from the server; it replaces what the reducer would start with. Use `middlewares` to see or change an action before it reaches the reducers; they run after the default middleware of Redux Toolkit.",
      },
    },
  },
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("zljs")).toBeInTheDocument();
    await expect(
      canvas.getByText("Title from preloadedState"),
    ).toBeInTheDocument();
    await expect(canvas.getByText("Last action: none")).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: "Dispatch an action" }),
    );

    await expect(
      await canvas.findByText("Last action: demo/clicked"),
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading level={2}>coreReducers</Heading>
      <ReduxProvider coreReducers={MOCK_REDUCERS}>
        <Title />
      </ReduxProvider>
      <Heading level={2}>preloadedState</Heading>
      <ReduxProvider
        reducers={MOCK_REDUCERS}
        preloadedState={{ title: "Title from preloadedState" }}
      >
        <Title />
      </ReduxProvider>
      <Heading level={2}>middlewares</Heading>
      <MiddlewaresExample />
    </div>
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
