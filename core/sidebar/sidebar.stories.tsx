import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./sidebar";
import type { SidebarSection } from "./sidebar.interface";

const sections: SidebarSection[] = [
  {
    items: [
      { icon: "Home", label: "Dashboard", href: "/dashboard" },
      { icon: "MessageSquare", label: "Messenger", href: "/messenger" },
      { icon: "Users", label: "Clients", href: "/clients" },
    ],
  },
  {
    items: [
      { icon: "Store", label: "Products", href: "/products" },
      { icon: "ShoppingCart", label: "Orders", href: "/orders" },
      { icon: "BarChart3", label: "Reports", href: "/reports" },
    ],
  },
  {
    items: [
      { icon: "SiFacebook", label: "Facebook", href: "/facebook" },
      { icon: "SiInstagram", label: "Instagram", href: "/instagram" },
      { icon: "SiWhatsapp", label: "WhatsApp", href: "/whatsapp" },
    ],
  },
];

const user = {
  name: "Alexandre Mendes",
  email: "alexandregme@zljs.com",
};

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    sections,
    user,
    onLogout: () => {},
  },
};

export const Collapsed: Story = {
  args: {
    sections,
    user,
    defaultCollapsed: true,
    onLogout: () => {},
  },
};

export const WithActiveItem: Story = {
  args: {
    sections,
    user,
    activeHref: "/messenger",
    onLogout: () => {},
  },
};

const InteractiveTemplate = () => {
  const [active, setActive] = useState("/dashboard");

  const handleClick = (e: React.MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (href) setActive(href);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }} onClick={handleClick}>
      <Sidebar
        sections={sections}
        user={user}
        activeHref={active}
        onLogout={() => alert("Logout")}
      />
      <div style={{ flex: 1, padding: 24, background: "#f5f5f5" }}>
        <h2>Active: {active}</h2>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
};
