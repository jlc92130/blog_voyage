// Librairies
import React from "react";


// Composants
import classes from './Navigation.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";
//import NavItems tab
import {NavBarItems} from "./NavItems/NavBarItems";

 



function Navigation() {

  return (
      <ul className={classes.NavMenuItems} >
        {NavBarItems.map(item => {
          return (
            <NavigationItem key={item.id} dropDown={item.dropdown} id={item.id} exact={true} cl={item.cName}  to={item.path} title={item.title} /> 
          )})
        }
      </ul>
  );
}

export default Navigation;