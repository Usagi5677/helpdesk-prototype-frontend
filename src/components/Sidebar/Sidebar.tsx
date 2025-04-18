import {
  FaBook,
  FaBookmark,
  FaHome,
  FaLayerGroup,
  FaListAlt,
  FaListUl,
  FaTh,
  FaTicketAlt,
  FaUserLock,
  FaUsers,
} from "react-icons/fa";
import classes from "./Sidebar.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Menu } from "antd";

const { Divider } = Menu;
interface SidebarItem {
  name: string;
  path: string;
  icon?: any;
}

const Sidebar = ({ onClick }: { onClick: () => void }) => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  let SidebarData: SidebarItem[] = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Divider",
      path: "divider1",
    },
    {
      name: "My Tickets",
      path: "/my-tickets",
      icon: <FaTicketAlt />,
    },
    {
      name: "Following Tickets",
      path: "/following-tickets",
      icon: <FaBookmark />,
    },
    {
      name: "Divider",
      path: "divider2",
    },
    {
      name: "Knowledge Base",
      path: "/knowledgebase",
      icon: <FaBook />,
    },
  ];

  // Items only shown to admins and agents
  if (user?.isAdmin || user?.isAgent) {
    // Insert at second position
    SidebarData.splice(3, 0, {
      name: "All Tickets",
      path: "/all-tickets",
      icon: <FaListAlt />,
    });
    // Insert at the end
    SidebarData.push(
      {
        name: "Categories",
        path: "/categories",
        icon: <FaTh />,
      },
      {
        name: "User Groups",
        path: "/usergroups",
        icon: <FaUsers />,
      }
    );
  }

  // Items only shown to admins
  if (user?.isAdmin) {
    SidebarData.push({
      name: "Users",
      path: "/users",
      icon: <FaUserLock />,
    });
  }

  // Items only shown to agents
  if (user?.isAgent) {
    // Insert at third position
    SidebarData.splice(4, 0, {
      name: "Assigned Tickets",
      path: "/assigned-tickets",
      icon: <FaListUl />,
    });
  }

  // Items only shown to super admins
  if (user?.isSuperAdmin) {
    SidebarData.push(
      {
        name: "Divider",
        path: "divider3",
      },
      {
        name: "Divisions",
        path: "/divisions",
        icon: <FaLayerGroup />,
      }
    );
  }

  return (
    <>
      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        style={{ overflowX: "hidden", flex: 1 }}
      >
        {SidebarData.map((item: SidebarItem) => {
          if (item.name === "Divider") return <Divider key={item.path} />;
          return (
            <Menu.Item
              key={item.path}
              icon={item.icon}
              className={classes["newMenuItem"]}
              onClick={() => {
                navigate(item.path);
                onClick();
              }}
            >
              {item.name}
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
};

export default Sidebar;
