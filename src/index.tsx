import ReactDOM from "react-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar"
import { useState } from "react";
import './index.css';

const App = () => {
    const [toggleMenu, setToggleMenu]= useState(true);
    
    return(
        <div>
            <Navbar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu}></Navbar>
            <Sidebar toggleMenu={toggleMenu}></Sidebar>
            <h1>Help Desk - Hello world</h1>
        </div>
    )
};

ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
);

