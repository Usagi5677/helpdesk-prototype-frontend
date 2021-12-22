import React from 'react';
import "./navbar.css";
import { FaBars, FaBell } from "react-icons/fa";

const navbar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar-wrapper'>
                <div className='navbar__left-side-wrapper'>
                    <FaBars className='navbar__icon' />
                    <div className='navbar__title-wrapper'>
                        <div className='navbar__title'>Help Desk Ticketing System</div>
                    </div>
                </div>
                <div className='navbar__right-side-wrapper'>
                    <FaBell className='navbar__icon'></FaBell>
                </div>
                
            </div>
        </nav>
    );
}

export default navbar;