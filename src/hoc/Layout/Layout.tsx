import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import classes from "./Layout.module.css";

const Layout = (props: any) => {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(true);

  const [login, setLogin] = useState(false);
  const openDropdownHandler = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openSubmenuHandler = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const sidebarClosedHandler = () => {
    setSidebarIsVisible(false);
  };

  const sidebarToggleHandler = () => {
    setSidebarIsVisible(!sidebarIsVisible);
  };

  return (
    <>
      <Navbar
        sideBarToggleClicked={sidebarToggleHandler}
        open={sidebarIsVisible}
      />
      <Sidebar
        open={sidebarIsVisible}
        closed={sidebarClosedHandler}
        dropdownClicked={openDropdownHandler}
        dropdownOpened={dropdownOpen}
        submenuClicked={openSubmenuHandler}
        submenuOpened={submenuOpen}
      />
      <main className={classes['content']}>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
