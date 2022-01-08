import SidebarDropdown from "./SidebarDropdown";
import { FaSignOutAlt } from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import classes from "./Sidebar.module.css";

const Sidebar = (props: any) => {
  return (
    <div className={`${classes['sidebar']} ${props.open ? classes['close'] : ""}`}>
      <ul className={classes['sidebar-wrapper']}>
        <li>
          <div className={classes['sidebar__logo-wrapper']}>
            <img className={classes['sidebar__logo']} src="/logo.png" alt="MTCC logo" />
          </div>
        </li>
        {SidebarData.map((sbData: any, index: number) => (
          <SidebarDropdown
            key={index}
            name={sbData.name}
            path={sbData.path}
            icon={sbData.icon}
            dropdowns={sbData.dropdowns || []}
            subMenuName={sbData.submenuName}
            subMenus={sbData.submenus || []}
            dropdownClick={props.dropdownClicked}
            dropdownOpen={props.dropdownOpened}
            submenuClick={props.submenuClicked}
            submenuOpen={props.submenuOpened}
          />
        ))}
        <li>
          <div className={classes['sidebar__profile-container']}>
            <div className={classes['sidebar__profile-wrapper']}>
              <div className={classes['sidebar__profile-avatar-wrapper']}>
                <img
                  className={classes['sidebar__profile-avatar']}
                  src="./avatar.jpg"
                  alt=""
                />
                <div className={classes['sidebar__profile-avatar-status']}></div>
              </div>
              <div className={classes['sidebar__profile-details']}>
                <div className={classes['sidebar__profile-name']}>Ibrahimu Naishu</div>
                <div className={classes['sidebar__profile-link']}>Profile</div>
              </div>
            </div>

            <i className={classes['sidebar__sign-out']}>
              <FaSignOutAlt />
            </i>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
