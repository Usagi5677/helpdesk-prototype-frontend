import "./navbar.css";
import { FaBars, FaBell } from "react-icons/fa";

const Navbar = (props:any) => {
    
    return (
        <nav className='navbar'>
            <div className='navbar-wrapper'>
                <div className='navbar__left-side-wrapper'>
                    <div className={`navbar__title ${props.toggleMenu ? "" : "active"}`}>Help Desk Ticketing System</div>
                </div>
                <div className='navbar__right-side-wrapper'>
                    <FaBell className='navbar__icon'></FaBell>
                    <FaBars onClick={() => props.setToggleMenu(!props.toggleMenu)} className='navbar__icon' />
                </div>
                
            </div>
        </nav>
    );
}



export default Navbar;