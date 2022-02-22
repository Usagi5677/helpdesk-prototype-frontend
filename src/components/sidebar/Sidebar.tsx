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
  let newSelect: any;

  switch (pathname) {
    case "/":
      newSelect = "dashboard";
      break;
    case "/my-tickets":
      newSelect = "mytickets";
      break;
    case "/knowledgebase":
      newSelect = "knowledgebase";
      break;
    case "/categories":
      newSelect = "categories";
      break;
    case "/usergroups":
      newSelect = "usergroups";
      break;
    case "/users":
      newSelect = "users";
      break;
  }

  let data: SidebarItem[] = [
    {
      key: "dashboard",
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },
    {
      key: "tickets",
      name: "Tickets",
      path: "/",
      icon: <FaTicketAlt />,
      dropdowns: [
        { key: "mytickets", name: "My tickets", path: "/my-tickets" },
      ],
    },
    {
      key: "knowledgebase",
      name: "Knowledge base",
      path: "/knowledgebase",
      icon: <FaBook />,
    },
  ];

  // Items only shown to admins and agents
  if (user?.isAdmin || user?.isAgent) {
    data.push(
      {
        key: "all-tickets",
        name: "All-Tickets",
        path: "/all-tickets",
        icon: <FaListAlt />,
      },
      {
        key: "categories",
        name: "Categories",
        path: "/categories",
        icon: <FaTh />,
      },
      {
        key: "usergroups",
        name: "User Groups",
        path: "/usergroups",
        icon: <FaUsers />,
      }
    );
  }

  // Items only shown to admins
  if (user?.isAdmin) {
    data.push({
      key: "users",
      name: "Users",
      path: "/users",
      icon: <FaUserLock />,
    });
  }

  const SidebarData = data;

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
          defaultOpenKeys={newSelect === "mytickets" ? ["tickets"] : []}
          selectedKeys={[newSelect]}
        >
          {SidebarData.map((sbData: any, index: number) => {
            return sbData.dropdowns && sbData.dropdowns.length > 0 ? (
              <SubMenu key={sbData.key} icon={sbData.icon} title={sbData.name}>
                {sbData.dropdowns.map((dropdown: any, index2: number) => (
                  <Menu.Item key={dropdown.key}>
                    <NavLink to={dropdown.path}>{dropdown.name}</NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={sbData.key}
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

/*


*/
