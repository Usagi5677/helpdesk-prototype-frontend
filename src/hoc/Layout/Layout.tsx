import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import classes from "./Layout.module.css";

const Layout = (props: any) => {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(true);

  const openDropdownHandler = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openSubmenuHandler = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const sidebarToggleHandler = () => {
    setSidebarIsVisible(!sidebarIsVisible);
  };

  return (
    <>
      <Navbar
        sideBarToggleClicked={sidebarToggleHandler}
        openSidebar={sidebarIsVisible}
      />
      <Sidebar
        openSidebar={sidebarIsVisible}
        closeBackdrop={sidebarToggleHandler}
        dropdownClick={openDropdownHandler}
        dropdownOpen={dropdownOpen}
        submenuClick={openSubmenuHandler}
        submenuOpen={submenuOpen}
      />
      <main className={classes["content"]}>{props.children}</main>
    </>
  );
};

export default Layout;
