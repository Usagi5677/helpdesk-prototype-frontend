import { FaHome, FaTicketAlt, FaBook, FaUserLock } from "react-icons/fa";

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
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "Tickets",
    path: "/",
    icon: <FaTicketAlt />,
    dropdowns: [
      { name: "My tickets", path: "/my-tickets" },
      { name: "Create ticket", path: "/create-ticket" },
    ],
    submenuName: "Status",
    submenus: [
      { name: "Open" },
      { name: "Closed" },
      { name: "Pending" },
      { name: "Solved" },
      { name: "Unassigned" },
    ],
  },
  {
    name: "Information",
    path: "/information",
    icon: <FaBook />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <FaUserLock />,
  },
];
