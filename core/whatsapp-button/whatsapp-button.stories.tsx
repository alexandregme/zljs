import type { Meta, StoryObj } from "@storybook/react-vite";
import { WhatsAppButton } from "./whatsapp-button";

const meta: Meta<typeof WhatsAppButton> = {
  title: "Components/WhatsAppButton",
  component: WhatsAppButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WhatsAppButton>;

export const Default: Story = {
  args: {
    phone: "5511999999999",
    message: "Olá! Gostaria de mais informações.",
  },
};

export const CustomText: Story = {
  args: {
    phone: "5511999999999",
    message: "Olá! Vim pelo site.",
    children: "Enviar mensagem",
  },
};

export const WithCallback: Story = {
  args: {
    phone: "5511999999999",
    message: "Teste de callback",
    onClick: () => alert("Mensagem enviada!"),
  },
};
