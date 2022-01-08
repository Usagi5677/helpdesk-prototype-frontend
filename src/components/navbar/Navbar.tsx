import { FaBars, FaBell } from "react-icons/fa";
import classes from "./Navbar.module.css";

const Navbar = (props: any) => {
  return (
    <nav className={classes['navbar']}>
      <div className={classes['navbar-wrapper']}>
        <div className={classes['navbar__left-side-wrapper']}>
          <div className={`${classes['navbar__title']} ${props.open ? "" : classes['active']}`}>
            Help Desk Ticketing System
          </div>
        </div>
        <div className={classes['navbar__right-side-wrapper']}>
          <FaBell className={classes['navbar__icon']}></FaBell>
          <FaBars onClick={props.sideBarToggleClicked} className={classes['navbar__icon']} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
