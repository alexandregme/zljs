import type { ElementType } from "react";
import {
  SiWhatsapp,
  SiFacebook,
  SiInstagram,
  SiShopify,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import type { IconSize } from "./icon.interface";

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
  "ChevronsUp",
  "ArrowUp",
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
  "Download",
  "Share2",
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
  "Route",
  "Navigation",
  "ListChecks",
  "Map",
  "MapPinOff",
  "Settings",
  // Brand icons (react-icons/si)
  "SiWhatsapp",
  "SiFacebook",
  "SiInstagram",
  "SiShopify",
  "SiGithub",
  "SiVercel",
] as const;

export const iconBrands: Record<string, ElementType> = {
  SiWhatsapp,
  SiFacebook,
  SiInstagram,
  SiShopify,
  SiGithub,
  SiVercel,
};

export const iconSizes: Record<IconSize, number> = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};
