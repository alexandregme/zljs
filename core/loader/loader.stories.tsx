import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loader } from "./loader";
import { useAppStore } from "@zljs/core";
import { useEffect } from "react";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Loader>;

const LoaderDemo = ({ duration = 3000 }: { duration?: number }) => {
  useEffect(() => {
    useAppStore.getState().startFetching();
    const timer = setTimeout(
      () => useAppStore.getState().finishFetching(),
      duration,
    );
    return () => clearTimeout(timer);
  }, [duration]);

  return <p className="p-4 text-white">Loading overlay for {duration}ms...</p>;
};

export const Default: Story = {
  render: () => <LoaderDemo />,
};

export const WithCustomLabel: Story = {
  render: () => (
    <>
      <LoaderDemo />
      <Loader label="Carregando dados" />
    </>
  ),
};
