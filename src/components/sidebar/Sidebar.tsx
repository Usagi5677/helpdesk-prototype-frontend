import { FaSignOutAlt } from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import classes from "./Sidebar.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";

import { FaChevronDown } from "react-icons/fa";

const Sidebar = (props: any) => {
  return (
    <>
      <Backdrop show={props.openSidebar} clicked={props.closeBackdrop} />
      <div
        className={`${classes["sidebar"]} ${
          props.openSidebar ? "" : classes["close"]
        }`}
      >
        <ul className={classes["sidebar-wrapper"]}>
          <li>
            <div className={classes["sidebar-wrapper__logo-wrapper"]}>
              <img
                className={classes["sidebar__logo"]}
                src="/logo.png"
                alt="MTCC logo"
              />
            </div>
          </li>
          <div className={classes["sidebar-wrapper__sidebar-items-container"]}>
            {SidebarData.map((sbData: any, index: number) => (
              <li key={'lvOne'+index}>
                {sbData.dropdowns && sbData.dropdowns.length > 0 ? (
                  <div
                    className={`${classes["sidebar__sidebar-items-wrapper"]} ${
                      props.selectedLink === 'lvOne'+index ? classes["active"] : ""
                    }`}
                    onClick={() => {
                      props.dropdownClick();
                      props.selectLink('lvOne'+index);
                    }}
                  >
                    <div
                      className={
                        classes["sidebar__sidebar-item-details-wrapper"]
                      }
                    >
                      <i
                        className={
                          classes["sidebar__sidebar-items-wrapper__icon-left"]
                        }
                      >
                        {sbData.icon}
                      </i>
                      <span
                        className={
                          classes["sidebar__sidebar-items-wrapper__text"]
                        }
                      >
                        {sbData.name}
                      </span>
                      <div
                        className={`${classes["sidebar__tag"]} ${classes["--mado"]}`}
                      >
                        10+
                      </div>
                    </div>
                    <i
                      className={
                        classes["sidebar__sidebar-items-wrapper__icon-right"]
                      }
                    >
                      <FaChevronDown />
                    </i>
                  </div>
                ) : (
                  <div
                    className={`${classes["sidebar__sidebar-items-wrapper"]} ${
                      props.selectedLink === 'lvOne'+index ? classes["active"] : ""
                    }`}
                    onClick={()=>{props.selectLink('lvOne'+index)}}
                  >
                    <div
                      className={
                        classes["sidebar__sidebar-item-details-wrapper"]
                      }
                    >
                      <i
                        className={
                          classes["sidebar__sidebar-items-wrapper__icon-left"]
                        }
                      >
                        {sbData.icon}
                      </i>
                      <span
                        className={
                          classes["sidebar__sidebar-items-wrapper__text"]
                        }
                      >
                        {sbData.name}
                      </span>
                    </div>
                  </div>
                )}

                {sbData.dropdowns && sbData.dropdowns.length > 0 ? (
                  <ul
                    className={`${classes["sidebar__dropdown"]} ${
                      props.dropdownOpen ? classes["active"] : ""
                    }`}
                  >
                    {sbData.dropdowns.map((dropdown: any, index: number) => (
                      <li
                        key={'lvTwo'+index}
                        className={`${classes["sidebar__dropdown__dropdown-items"]} ${
                          props.selectedLink === 'lvTwo'+index ? classes["active"] : ""
                        }`}
                        onClick={()=>{props.selectLink('lvTwo'+index)}}
                      >
                        <span>{dropdown.name}</span>
                      </li>
                    ))}
                    <li>
                      <div
                        className={classes["sidebar__submenu-items-wrapper"]}
                        onClick={props.submenuClick}
                      >
                        <span
                          className={
                            classes["sidebar__submenu-items-wrapper__text"]
                          }
                        >
                          {sbData.submenuName}
                        </span>
                        <i
                          className={
                            classes[
                              "sidebar__submenu-items-wrapper__icon-right"
                            ]
                          }
                        >
                          <FaChevronDown />
                        </i>
                      </div>
                      {sbData.submenus && sbData.submenus.length > 0 ? (
                        <ul
                          className={`${classes["sidebar__submenu_dropdown"]} ${
                            props.submenuOpen ? classes["active"] : ""
                          }`}
                        >
                          {sbData.submenus.map(
                            (submenu: any, index2: number) => (
                              <li
                                key={index2}
                                className={
                                  classes[
                                    "sidebar__submenu_dropdown-items-wrapper"
                                  ]
                                }
                              >
                                <span>{submenu.name}</span>
                                <div className={classes["sidebar__tag"]}>
                                  10+
                                </div>
                              </li>
                            )
                          )}
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
                  <img
                    className={classes["sidebar__profile-avatar"]}
                    src="./avatar.jpg"
                    alt=""
                  />
                  <div
                    className={classes["sidebar__profile-avatar-status"]}
                  ></div>
                </div>
                <div className={classes["sidebar__profile-details"]}>
                  <div className={classes["sidebar__profile-name"]}>
                    Ibrahimu Naishu
                  </div>
                  <div className={classes["sidebar__profile-link"]}>
                    Profile
                  </div>
                </div>
              </div>

              <i className={classes["sidebar__sign-out"]}>
                <FaSignOutAlt />
              </i>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
