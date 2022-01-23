import { FaBars, FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = (props: any) => {
  return (
    <nav className={classes["navbar"]}>
      <div className={classes["navbar-wrapper"]}>
        <div className={classes["navbar__left-side-wrapper"]}>
          <NavLink to={"/dashboard"}>
            <div
              className={`${classes["navbar__title"]} ${
                props.openSidebar ? classes["active"] : ""
              }`}
            >
              Help Desk Ticketing System
            </div>
          </NavLink>
        </div>
        <div className={classes["navbar__right-side-wrapper"]}>
          <FaBell className={classes["navbar__icon"]}></FaBell>
          <FaBars
            onClick={props.sideBarToggleClicked}
            className={classes["navbar__icon"]}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
