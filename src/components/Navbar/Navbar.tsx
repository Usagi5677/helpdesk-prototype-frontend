import { FaBars, FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import NewTicket from "../Ticket/NewTicket";
import classes from "./Navbar.module.css";
import Notification from "../Notification/Notification";

const Navbar = (props: any) => {
  return (
    <nav className={classes["navbar"]}>
      <div className={classes["navbar-wrapper"]}>
        <div className={classes["navbar__left-side-wrapper"]}>
          <FaBars onClick={props.openSidebar} className={classes["navbar__icon"]} />
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
          <Notification />
          <div style={{marginLeft:20}}>
            <NewTicket iconButton={true} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
