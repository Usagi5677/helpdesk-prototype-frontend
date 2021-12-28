import { FaHome, FaTicketAlt } from "react-icons/fa";

interface SidebarItem {
  name: string;
  path?: string;
  icon?: any;
  dropdowns?: SidebarItem[];
  submenuName?: string;
  submenus?: SidebarItem[];
}

export const SidebarData: SidebarItem[] = [
  {
    name: "Dashboard",
    path: "#",
    icon: <FaHome />,
  },
  {
    name: "Tickets",
    path: "#",
    icon: <FaTicketAlt />,
    dropdowns: [
      { name: "My tickets", path: "#" },
      { name: "Create ticket", path: "#" },
    ],
    submenuName: "Status",
    submenus: [{ name: "Open" }, { name: "Closed" }],
  },
];
