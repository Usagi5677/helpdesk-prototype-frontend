import "./sidebar.css";
import SidebarDropdown from "./SidebarDropdown"
import { FaSignOutAlt } from "react-icons/fa";
import { SidebarData } from "./SidebarData";



const Sidebar = (props: any) => {

  return (
    <div className={`sidebar ${props.toggleMenu ? "close" : ""}`}>
      <ul className="sidebar-wrapper">
        <li>
          <div className="sidebar__logo-wrapper">
            <img className="sidebar__logo" src="/logo.png" alt="MTCC logo" />
          </div>
        </li>
        {
          SidebarData.map((sbData:any, index:number) => (
            <SidebarDropdown 
            key={index} 
            name={sbData.name}
            path={sbData.path}
            icon={sbData.icon}
            dropdowns={sbData.dropdowns || []}
            subMenuName={sbData.submenuName}
            subMenus={sbData.submenus || []}
            />
          ))
        }
        <li>
          <div className="sidebar__profile-container">
            <div className="sidebar__profile-wrapper">
              <div className="sidebar__profile-avatar-wrapper">
                <img className="sidebar__profile-avatar" src="./avatar.jpg" alt="" />
                <div className="sidebar__profile-avatar-status"></div>
              </div>
              <div className="sidebar__profile-details">
                <div className="sidebar__profile-name">Ibrahim Naishu</div>
                <div className="sidebar__profile-link">Profile</div>
              </div>
            </div>
            
            <i className="sidebar__sign-out"><FaSignOutAlt/></i>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
