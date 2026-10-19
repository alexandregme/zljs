import type { ElementType } from "react";
import { SiWhatsapp, SiFacebook, SiInstagram, SiShopify } from "react-icons/si";
import type { Size } from "../types";

// UI icons: https://lucide.dev/icons
// Brand icons: https://react-icons.github.io/react-icons/icons/si/

export const iconNames = [
  // UI icons (lucide-react)
  "Check",
  "X",
  "Plus",
  "Minus",
  "Search",
  "Menu",
  "ChevronDown",
  "ChevronUp",
  "ChevronLeft",
  "ChevronRight",
  "Pencil",
  "Trash2",
  "Save",
  "RefreshCw",
  "Home",
  "MessageSquare",
  "Users",
  "Store",
  "ShoppingCart",
  "BarChart3",
  "Brain",
  "Send",
  "LogOut",
  "User",
  "Key",
  "Contact",
  "Package",
  "Warehouse",
  "HandCoins",
  "Stethoscope",
  "LogIn",
  "Megaphone",
  "LayoutDashboard",
  "Smile",
  "Frown",
  "Cat",
  "ArrowRight",
  "Loader",
  "LoaderCircle",
  "CheckCircle",
  "XCircle",
  "AlertTriangle",
  "Info",
  // Brand icons (react-icons/si)
  "SiWhatsapp",
  "SiFacebook",
  "SiInstagram",
  "SiShopify",
] as const;

export const iconBrands: Record<string, ElementType> = {
  SiWhatsapp,
  SiFacebook,
  SiInstagram,
  SiShopify,
};

export const iconSizes: Record<Size, number> = {
  sm: 12,
  md: 16,
  lg: 24,
};
