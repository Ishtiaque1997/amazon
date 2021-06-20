import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import css from './header.css';

const Header = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt=""></img>
            <nav>
                <Link  to  ="/shop">/Shop</Link>
                <Link to="/review">/Order Review</Link>
                <Link to="/inventory">/Manage Inventory</Link>
                {/* <button onClick={()=>setLoggedInUser({})}>Sign Out</button> */}
                <button onClick={()=>setLoggedInUser({})}>Sign out</button>
               
            </nav>

        </div>
    );
};

export default Header;