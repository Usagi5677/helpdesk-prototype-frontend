import { FaChevronDown} from "react-icons/fa";
import { useState } from "react";

const SidebarDropdown = (props :any) => {
  const { name, dropdowns, subMenuName, subMenus, icon } = props;
  const [open, setOpen]= useState(false);
  const [keepOpen, setKeepOpen]= useState(true);

  return (
    <li>
      {dropdowns && dropdowns.length > 0 ? (
        <div className="sidebar__sidebar-items-wrapper" onClick={() => setOpen(!open)}>
          <i className="sidebar__sidebar-items-wrapper__icon-left">
            {icon}
          </i>
          <span className="sidebar__sidebar-items-wrapper__text">{name}</span>
          
          <div className="sidebar__tag --mado">10+</div>
          <i className="sidebar__sidebar-items-wrapper__icon-right">
            <FaChevronDown />
          </i>
        </div>
      ) : (
        <div className="sidebar__sidebar-items-wrapper">
          <i className="sidebar__sidebar-items-wrapper__icon-left">
            {icon}
          </i>
          <span className="sidebar__sidebar-items-wrapper__text">{name}</span>
        </div>
      )}
      
      { dropdowns && dropdowns.length > 0 ? (
        <ul className={`sidebar__dropdown ${open ? "active" : "" }`}>
          {dropdowns.map((dropdown :any, index:number) => (
            
            <li key={index} className="sidebar__dropdown__dropdown-items">
              <span>{dropdown.name}</span>
            </li>
          ))}
          <li>
            <div className="sidebar__submenu-items-wrapper" onClick={() => setKeepOpen(!keepOpen)}>
              <span className="sidebar__submenu-items-wrapper__text">
                {subMenuName}
              </span>
              <i className="sidebar__submenu-items-wrapper__icon-right">
                <FaChevronDown />
              </i>
            </div>
            {subMenus && subMenus.length > 0 ? (
              <ul className={`sidebar__submenu_dropdown ${keepOpen ? "active" : ""}`}>
                {subMenus.map((submenu: any, index2:number) => (
                  <li key={index2} className="sidebar__submenu_dropdown-items-wrapper">
                    <span>{submenu.name}</span>
                    <div className="sidebar__tag">10+</div>
                </li>
                ))}
            </ul>
            ) : null}
          </li>
        </ul>
      ) : null}
    </li>
  );
};

export default SidebarDropdown;
