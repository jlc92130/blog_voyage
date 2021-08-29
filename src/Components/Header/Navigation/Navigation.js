// Librairies
import React, { useState } from "react";


// Composants
import classes from './Navigation.module.css';
import routes from '../../../config/routes';
import NavigationItem from "./NavigationItem/NavigationItem";
 



function Navigation(props) {
  // States
  //const [click, setClick] = useState(false);
  //const [dropdown, setDropdown] = useState(true);

 // Functions
  //const closeMobileMenu = () => setClick(false);



  return (
      <ul className={[props.showSubMenu ? classes.ShowNavBar : 'bidon' , classes.Navigation].join(' ') }>
        <NavigationItem exact={true} to={routes.HOME}>Home</NavigationItem>  
        <NavigationItem to={routes.ARTICLES} dropdown>Destinations</NavigationItem>  
        <NavigationItem to={routes.CONTACT}>Contact</NavigationItem>  
        <NavigationItem to={routes.AJOUTER}>Ajouter</NavigationItem>
      </ul>
  );
}

export default Navigation;