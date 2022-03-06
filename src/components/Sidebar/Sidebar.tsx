import {
  FaBook,
  FaHome,
  FaListAlt,
  FaTh,
  FaTicketAlt,
  FaUserLock,
  FaUsers,
} from "react-icons/fa";
import classes from "./Sidebar.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Menu, Drawer } from "antd";

const { Divider } = Menu;
interface SidebarItem {
  name: string;
  path: string;
  icon?: any;
  dropdowns?: SidebarItem[];
  submenuName?: string;
  submenus?: SidebarItem[];
}

const Sidebar = (props: any) => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();

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
      icon: <FaTicketAlt />,
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
      icon: <FaListAlt />,
    });
  }

  return (
    <>
      <Backdrop show={props.sidebarVisible} clicked={props.closeSidebar} />
      <Drawer
        title={
          <div className={classes["logo-wrapper"]}>
            <img className={classes["logo"]} src="/logo.png" alt="MTCC logo" />
          </div>
        }
        placement={"left"}
        closable={false}
        mask={false}
        onClose={props.closeSidebar}
        visible={props.sidebarVisible}
        width={300}
        key={"left"}
      >
        <Menu
          mode="inline"
          defaultOpenKeys={pathname === "my-tickets" ? ["my-tickets"] : []}
          selectedKeys={[pathname]}
        >
          {SidebarData.map((item: SidebarItem) => {
            if (item.name === "Divider") return <Divider key={item.path} />;
            return (
              <Menu.Item
                key={item.path}
                icon={item.icon}
                className={classes["newMenuItem"]}
              >
                <NavLink to={item.path}>{item.name}</NavLink>
              </Menu.Item>
            );
          })}
        </Menu>
      </Drawer>
    </>
  );
};

export default Sidebar;
