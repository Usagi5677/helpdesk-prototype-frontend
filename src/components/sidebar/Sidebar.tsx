import {
  FaBook,
  FaHome,
  FaListAlt,
  FaSignOutAlt,
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
import { Avatar, Tooltip } from "antd";
import { avatarColor } from "../../helpers/avatarColor";

const { SubMenu, Divider } = Menu;
interface SidebarItem {
  key?: string;
  name: string;
  path?: string;
  icon?: any;
  dropdowns?: SidebarItem[];
  submenuName?: string;
  submenus?: SidebarItem[];
}

const Sidebar = (props: any) => {
  const { user, logout } = useContext(UserContext);
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
          {SidebarData.map((sbData: any, index: number) => {
            if (sbData.name === "Divider") return <Divider key={sbData.path} />;
            return sbData.dropdowns && sbData.dropdowns.length > 0 ? (
              <SubMenu key={sbData.path} icon={sbData.icon} title={sbData.name}>
                {sbData.dropdowns.map((dropdown: any, index2: number) => (
                  <Menu.Item key={dropdown.key}>
                    <NavLink to={dropdown.path}>{dropdown.name}</NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={sbData.path}
                icon={sbData.icon}
                className={classes["newMenuItem"]}
              >
                <NavLink to={sbData.path}>{sbData.name}</NavLink>
              </Menu.Item>
            );
          })}
          <Divider
            style={{
              position: "absolute",
              bottom: 5,
              zIndex: 1,
              padding: 10,
              width: 290,
              height: 60,
            }}
          />
          <Menu.Item
            key={"signout"}
            style={{
              position: "absolute",
              bottom: 0,
              zIndex: 1,
              padding: 10,
              width: 290,
              height: 60,
            }}
            icon={
              <Avatar
                style={{
                  backgroundColor: avatarColor(user?.fullName).backgroundColor,
                  color: avatarColor(user?.fullName).color,
                }}
              >
                {user?.fullName
                  .match(/^\w|\b\w(?=\S+$)/g)
                  ?.join()
                  .replace(",", "")
                  .toUpperCase()}
              </Avatar>
            }
          >
            <div className={classes["sidebar-bottom-wrapper"]}>
              <div className={classes["profile"]}>
                <div className={classes["profile-item"]}>{user?.fullName}</div>
                <div className={classes["profile-item"]}>Profile</div>
              </div>
              <Tooltip title={"Logout"} placement="top">
                <FaSignOutAlt
                  onClick={logout}
                  style={{
                    width: 30,
                    height: 30,
                    lineHeight: 0,
                  }}
                />
              </Tooltip>
            </div>
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default Sidebar;
