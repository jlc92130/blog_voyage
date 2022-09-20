// Librairies
import React from "react";


// Composants
import classes from './Navigation.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";
//import NavItems tab
import {NavBarItems} from "./NavItems/NavBarItems";

 



function Navigation(props) {

  return (
      <ul className={classes.NavMenuItems} >
        {NavBarItems.map(item => {
          return (
            <NavigationItem key={item.id} cl={item.cName} dropDown={item.dropdown} user={props.user} id={item.id} exact={true}  to={item.path} title={item.title} /> 
          )})
        }
      </ul>
  );
}

export default Navigation;