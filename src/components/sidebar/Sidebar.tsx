import {
  FaBook,
  FaHome,
  FaSignOutAlt,
  FaTh,
  FaTicketAlt,
  FaUserLock,
  FaUsers,
} from "react-icons/fa";
import classes from "./Sidebar.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Menu, Drawer } from "antd";
import DefaultAvatar from "../UI/DefaultAvatar/DefaultAvatar";
import { Link } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";
import { avatarColor } from "../../helpers/avatarColor";
const { SubMenu } = Menu;
interface SidebarItem {
  name: string;
  path?: string;
  icon?: any;
  dropdowns?: SidebarItem[];
  submenuName?: string;
  submenus?: SidebarItem[];
}

const Sidebar = (props: any) => {
  const { user, logout } = useContext(UserContext);
  let adminData: SidebarItem[] = [
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
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FaTh />,
    },
    {
      name: "User Groups",
      path: "/usergroups",
      icon: <FaUsers />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUserLock />,
    },
    {
      name: "Knowledge base",
      path: "/knowledgebase",
      icon: <FaBook />,
    },
  ];

  let agentData: SidebarItem[] = [
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
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <FaTh />,
    },
    {
      name: "User Groups",
      path: "/usergroups",
      icon: <FaUsers />,
    },
    {
      name: "Knowledge base",
      path: "/knowledgebase",
      icon: <FaBook />,
    },
  ];

  let userData: SidebarItem[] = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Tickets",
      path: "/",
      icon: <FaTicketAlt />,
      dropdowns: [{ name: "My tickets", path: "/my-tickets" }],
    },
    {
      name: "Knowledge base",
      path: "/knowledgebase",
      icon: <FaBook />,
    },
  ];

  /*
  const something = () => {
    <div className={`${classes["sidebar"]} ${props.openSidebar ? "" : classes["close"]}`}>
      <ul className={classes["sidebar-wrapper"]}>
        <li>
          <div className={classes["sidebar-wrapper__logo-wrapper"]}>
            <img className={classes["sidebar__logo"]} src="/logo.png" alt="MTCC logo" />
          </div>
        </li>
        <div className={classes["sidebar-wrapper__sidebar-items-container"]}>
          {SidebarData.map((sbData: any, index: number) => (
            <li key={index}>
              {sbData.dropdowns && sbData.dropdowns.length > 0 ? (
                <div
                  className={classes["sidebar__sidebar-items-wrapper"]}
                  onClick={props.dropdownClick}
                >
                  <div className={classes["sidebar__sidebar-item-details-wrapper"]}>
                    <i className={classes["sidebar__sidebar-items-wrapper__icon-left"]}>
                      {sbData.icon}
                    </i>
                    <span className={classes["sidebar__sidebar-items-wrapper__text"]}>
                      {sbData.name}
                    </span>
                    <div className={`${classes["sidebar__tag"]} ${classes["--mado"]}`}>10+</div>
                  </div>
                  <i className={classes["sidebar__sidebar-items-wrapper__icon-right"]}>
                    <FaChevronDown />
                  </i>
                </div>
              ) : (
                <NavLink to={sbData.path}>
                  <div className={classes["sidebar__sidebar-items-wrapper"]}>
                    <div className={classes["sidebar__sidebar-item-details-wrapper"]}>
                      <i className={classes["sidebar__sidebar-items-wrapper__icon-left"]}>
                        {sbData.icon}
                      </i>
                      <span className={classes["sidebar__sidebar-items-wrapper__text"]}>
                        {sbData.name}
                      </span>
                    </div>
                  </div>
                </NavLink>
              )}

              {sbData.dropdowns && sbData.dropdowns.length > 0 ? (
                <ul
                  className={`${classes["sidebar__dropdown"]} ${
                    props.dropdownOpen ? classes["active"] : ""
                  }`}
                >
                  {sbData.dropdowns.map((dropdown: any, index2: number) => (
                    <NavLink key={index2} to={dropdown.path}>
                      <li key={index2} className={classes["sidebar__dropdown__dropdown-items"]}>
                        <span>{dropdown.name}</span>
                      </li>
                    </NavLink>
                  ))}
                  <li>
                    <div
                      className={classes["sidebar__submenu-items-wrapper"]}
                      onClick={props.submenuClick}
                    >
                      <span className={classes["sidebar__submenu-items-wrapper__text"]}>
                        {sbData.submenuName}
                      </span>
                      <i className={classes["sidebar__submenu-items-wrapper__icon-right"]}>
                        <FaChevronDown />
                      </i>
                    </div>
                    {sbData.submenus && sbData.submenus.length > 0 ? (
                      <ul
                        className={`${classes["sidebar__submenu_dropdown"]} ${
                          props.submenuOpen ? classes["active"] : ""
                        }`}
                      >
                        {sbData.submenus.map((submenu: any, index3: number) => (
                          <li
                            key={index3}
                            className={classes["sidebar__submenu_dropdown-items-wrapper"]}
                          >
                            <span>{submenu.name}</span>
                            <div className={classes["sidebar__tag"]}>10+</div>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                </ul>
              ) : null}
            </li>
          ))}
        </div>
        <div className={classes["divider"]}></div>
        <li>
          <div className={classes["sidebar__profile-container"]}>
            <div className={classes["sidebar__profile-wrapper"]}>
              <div className={classes["sidebar__profile-avatar-wrapper"]}>
                <div className={classes["sidebar__profile-avatar"]}>
                  <DefaultAvatar
                    fullname={user?.fullName}
                    userAvatarWidth={"34px"}
                    userAvatarHeight={"34px"}
                    showAgentList={false}
                    className={classes["sidebar__profile-avatar"]}
                    fromSiderBar={true}
                  />
                </div>

                <div className={classes["sidebar__profile-avatar-status"]}></div>
              </div>
              <div className={classes["sidebar__profile-details"]}>
                <div className={classes["sidebar__profile-name"]}>{user?.fullName}</div>
                <div className={classes["sidebar__profile-link"]}>Profile</div>
              </div>
            </div>

            <i className={classes["sidebar__sign-out"]}>
              <FaSignOutAlt onClick={logout} />
            </i>
          </div>
        </li>
      </ul>
    </div>;
  };

*/
  const SidebarAdminData = adminData;
  const SidebarAgentData = agentData;
  const SidebarUserData = userData;

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
        {user?.isAdmin ? (
          <Menu mode="inline">
            {SidebarAdminData.map((sbData: any, index: number) => {
              return sbData.dropdowns && sbData.dropdowns.length > 0 ? (
                <SubMenu key={sbData.name + index} icon={sbData.icon} title={sbData.name}>
                  {sbData.dropdowns.map((dropdown: any, index2: number) => (
                    <Menu.Item key={dropdown.name + index2}>
                      <NavLink to={dropdown.path}>{dropdown.name}</NavLink>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={sbData.name + index} icon={sbData.icon}>
                  <NavLink to={sbData.path}>{sbData.name}</NavLink>
                </Menu.Item>
              );
            })}
            <div
              style={{
                position: "absolute",
                bottom: 70,
                zIndex: 1,
                width: 295,
                borderBottom: "1px solid #ccc",
              }}
            ></div>
            <Menu.Item
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

                <FaSignOutAlt
                  onClick={logout}
                  style={{
                    width: 30,
                    height: 30,
                    lineHeight: 0,
                  }}
                />
              </div>
            </Menu.Item>
          </Menu>
        ) : user?.isAgent ? (
          <Menu mode="inline">
            {SidebarAgentData.map((sbData: any, index: number) => {
              return sbData.dropdowns && sbData.dropdowns.length > 0 ? (
                <SubMenu key={sbData.name + index} icon={sbData.icon} title={sbData.name}>
                  {sbData.dropdowns.map((dropdown: any, index2: number) => (
                    <Menu.Item key={dropdown.name + index2}>
                      <NavLink to={dropdown.path}>{dropdown.name}</NavLink>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={sbData.name + index} icon={sbData.icon}>
                  <NavLink to={sbData.path}>{sbData.name}</NavLink>
                </Menu.Item>
              );
            })}
          </Menu>
        ) : (
          <Menu mode="inline">
            {SidebarUserData.map((sbData: any, index: number) => {
              return sbData.dropdowns && sbData.dropdowns.length > 0 ? (
                <SubMenu key={sbData.name + index} icon={sbData.icon} title={sbData.name}>
                  {sbData.dropdowns.map((dropdown: any, index2: number) => (
                    <Menu.Item key={dropdown.name + index2}>
                      <NavLink to={dropdown.path}>{dropdown.name}</NavLink>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={sbData.name + index} icon={sbData.icon}>
                  <NavLink to={sbData.path}>{sbData.name}</NavLink>
                </Menu.Item>
              );
            })}
          </Menu>
        )}
      </Drawer>
    </>
  );
};

export default Sidebar;

/*


*/
