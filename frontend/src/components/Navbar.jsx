import React, {useState, useContext } from 'react'
import LogOut from './LogOut'
import { Link } from '@reach/router'
import { UserContext } from '../App'

const Navbar = props =>{
    const [toggle,setToggle]=useState(false)
    const user = useContext(UserContext)

    const toggleHandler = e=>{
        setToggle(!toggle);
    }

    return(
        <div className="navbar">
            <div className="greeting">
                Hello {user.name}
            </div>
            <button onClick={toggleHandler} className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <div className={toggle?'navbar-links active':'navbar-links'}>
                <ul>
                    <li><Link to={"/home"}><p>Home</p></Link></li>
                    {user.email !== 'guest@guest.com'?
                    <li><Link to={"/profile"}><p>Profile</p></Link></li>
                    :""}
                    <li>
                        <LogOut/>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar;