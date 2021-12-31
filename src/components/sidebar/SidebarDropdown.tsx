import { FaChevronDown } from "react-icons/fa";

const SidebarDropdown = (props: any) => {
  const { name, dropdowns, subMenuName, subMenus, icon } = props;
  
  return (
    <li>
      <div
        className="sidebar__sidebar-items-wrapper"
        onClick={props.dropdownClick}
      >
        <div className="sidebar__sidebar-item-details-wrapper">
          <i className="sidebar__sidebar-items-wrapper__icon-left">{icon}</i>
          <span className="sidebar__sidebar-items-wrapper__text">{name}</span>
          {dropdowns && dropdowns.length > 0 ? (
            <div className="sidebar__tag --mado">10+</div>
          ) : null}
        </div>
        
        {dropdowns && dropdowns.length > 0 ? (
            <i className="sidebar__sidebar-items-wrapper__icon-right">
              <FaChevronDown />
            </i>
        ) : null}
      </div>

      {dropdowns && dropdowns.length > 0 ? (
        <ul
          className={`sidebar__dropdown ${props.dropdownOpen ? "active" : ""}`}
        >
          {dropdowns.map(
            (dropdown: any, index: number) => (
              (
                <li key={index} className="sidebar__dropdown__dropdown-items">
                  <span>{dropdown.name}</span>
                </li>
              )
            )
          )}
          <li>
            <div
              className="sidebar__submenu-items-wrapper"
              onClick={props.submenuClick}
            >
              <span className="sidebar__submenu-items-wrapper__text">
                {subMenuName}
              </span>
              <i className="sidebar__submenu-items-wrapper__icon-right">
                <FaChevronDown />
              </i>
            </div>
            {subMenus && subMenus.length > 0 ? (
              <ul
                className={`sidebar__submenu_dropdown ${
                  props.submenuOpen ? "active" : ""
                }`}
              >
                {subMenus.map((submenu: any, index2: number) => (
                  <li
                    key={index2}
                    className="sidebar__submenu_dropdown-items-wrapper"
                  >
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
