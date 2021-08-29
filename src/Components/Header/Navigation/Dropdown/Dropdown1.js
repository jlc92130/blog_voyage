// Librairies
import React, { useState } from 'react';
import MenuItems from '../MenuItems/MenuItems';
import { NavLink } from 'react-router-dom';
import classes from './Dropdown.module.css';


// the menu of second level
function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul onClick={handleClick} className={classes.DropdownMenu}>
        {MenuItems.map( (menu,index) => {
          return (
          <li key={index}>
            <NavLink 
              className={classes.DropdownLink} 
              to={menu.path}
              onClick={() => setClick(false)}
            >  
                {menu.title}
            </NavLink>
          </li>
          )
        })}
      </ul>
    </>
  )
}

export default Dropdown;

