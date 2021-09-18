// Librairies
import React, { useState } from "react";


// Composants
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import NavigationItem from "./NavigationItem/NavigationItem";
//import NavItems tab
import {NavBarItems} from "./NavItems/NavBarItems";

 



function Navigation(props) {
  // States
  //const [click, setClick] = useState(false);
  //const [dropdown, setDropdown] = useState(true);

 // Functions
  //const closeMobileMenu = () => setClick(false);

  //[props.showSubMenu ? classes.ShowNavBar : 'bidon' , classes.Navigation]
   
 

  return (
      <ul className={classes.NavMenuItems} >
        {NavBarItems.map(item => {
          return (
            <NavigationItem dropDown={item.dropdown} id={item.id} exact={true} cl={item.cName} to={item.path} title={item.title} >{item.title}</NavigationItem> 
          )})
        }
      </ul>
  );
}

export default Navigation;