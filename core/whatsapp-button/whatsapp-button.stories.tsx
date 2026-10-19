import type { Meta, StoryObj } from "@storybook/react-vite";
import { WhatsAppButton } from "./whatsapp-button";

const meta: Meta<typeof WhatsAppButton> = {
  title: "Components/WhatsAppButton",
  component: WhatsAppButton,
  tags: ["autodocs"],
  parameters: {
    docs: { toc: true },
  },
};

export default meta;
type Story = StoryObj<typeof WhatsAppButton>;

export const Playground: Story = {
  args: {
    phone: "5511999999999",
    message: "Olá! Gostaria de mais informações.",
  },
};

export const Messages: Story = {
  render: () => (
    <div className="flex gap-2">
      <WhatsAppButton phone="5511999999999">Without message</WhatsAppButton>
      <WhatsAppButton phone="5511999999999" message="Olá! Vim pelo site.">
        With message
      </WhatsAppButton>
    </div>
  ),
};

export const Labels: Story = {
  render: () => (
    <div className="flex gap-2">
      <WhatsAppButton phone="5511999999999" />
      <WhatsAppButton phone="5511999999999">Enviar mensagem</WhatsAppButton>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-2">
      <WhatsAppButton
        phone="5511999999999"
        message="Teste de callback"
        onClick={() => alert("Mensagem enviada!")}
      >
        With onClick
      </WhatsAppButton>
    </div>
  ),
};
