import { FaBars, FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import NewTicket from "../Ticket/NewTicket";
import classes from "./Navbar.module.css";

const Navbar = (props: any) => {
  return (
    <nav className={classes["navbar"]}>
      <div className={classes["navbar-wrapper"]}>
        <div className={classes["navbar__left-side-wrapper"]}>
          <FaBars
            onClick={props.openSidebar}
            className={classes["navbar__icon"]}
          />
          <NavLink to={"/"}>
            <div
              className={`${classes["navbar__title"]} ${
                props.sidebarVisible ? classes["active"] : ""
              }`}
            >
              Helpdesk Ticketing System
            </div>
          </NavLink>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NewTicket iconButton={true} />
          <FaBell className={classes["navbar__icon"]}></FaBell>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
