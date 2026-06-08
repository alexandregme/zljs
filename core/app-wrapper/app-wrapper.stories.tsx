import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppWrapper } from "./app-wrapper";
import { useAppStore } from "../state/app";
import { useToastStore } from "../state/toast";
import { useEffect } from "react";

const meta: Meta<typeof AppWrapper> = {
  title: "Wrappers/AppWrapper",
  component: AppWrapper,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AppWrapper>;

export const Default: Story = {
  args: {
    children: <p className="p-4 text-white">App content goes here</p>,
  },
};

const LoadingDemo = () => {
  useEffect(() => {
    useAppStore.getState().startFetching();
    setTimeout(() => useAppStore.getState().finishFetching(), 3000);
  }, []);

  return <p className="p-4 text-white">Loading overlay for 3 seconds...</p>;
};

export const WithLoader: Story = {
  render: () => (
    <AppWrapper>
      <LoadingDemo />
    </AppWrapper>
  ),
};

const ToastDemo = () => {
  useEffect(() => {
    useToastStore.getState().success("Zustand funcionando!");
    useToastStore.getState().info("Redux + Zustand juntos!");
  }, []);

  return <p className="p-4 text-white">Two toasts should appear</p>;
};

export const WithToasts: Story = {
  render: () => (
    <AppWrapper>
      <ToastDemo />
    </AppWrapper>
  ),
};
