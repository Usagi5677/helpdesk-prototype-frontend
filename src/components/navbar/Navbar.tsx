import { FaBars, FaBell } from "react-icons/fa";
import "./Navbar.css";

const Navbar = (props: any) => {
  return (
    <nav className="navbar">
      <div className="navbar-wrapper">
        <div className="navbar__left-side-wrapper">
          <div className={`navbar__title ${props.open ? "" : "active"}`}>
            Help Desk Ticketing System
          </div>
        </div>
        <div className="navbar__right-side-wrapper">
          <FaBell className="navbar__icon"></FaBell>
          <FaBars onClick={props.sideBarToggleClicked} className="navbar__icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
