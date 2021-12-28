import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useState } from "react";
import "./index.css";

const App = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [open, setOpen] = useState(false);
  const [keepOpen, setKeepOpen] = useState(true);

  const toggleMenuHandler = () => setToggleMenu(!toggleMenu);

  const openDropdownHandler = () => setOpen(!open);

  const openSubmenuHandler = () => setKeepOpen(!keepOpen);

  return (
    <div>
      <Navbar click={toggleMenuHandler} toggle={toggleMenu}></Navbar>
      <Sidebar
        toggle={toggleMenu}
        dropdownClicked={openDropdownHandler}
        dropdownOpened={open}
        submenuClicked={openSubmenuHandler}
        submenuOpened={keepOpen}
      ></Sidebar>
      <h1>Help Desk - Hello world</h1>
    </div>
  );
};

export default App;
