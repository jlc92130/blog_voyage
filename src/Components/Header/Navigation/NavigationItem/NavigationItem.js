// Librairies
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';
import Dropdown from "../Dropdown/Dropdown1";


// the Navbar menu items
function NavigationItem(props) {
  // State
  const [dropdown, setDropdown] = useState(false);

  // Functions
  const onMouseEnter = () => {
    if (window.innerWidth < 980) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 980) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <li className={classes.navItem} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <NavLink 
        className={classes.navLink}
        exact={props.exact} 
        to={props.to} 
        activeClassName={classes.NavigationItem}
        >
          {props.children}
      </NavLink>
      {/*  on peut remplacer activeClassName par activeStyle={{color: black}}  */}
      
      {props.dropdown && dropdown ? <Dropdown /> : ''}

    </li>
   
  );
}

export default NavigationItem;


