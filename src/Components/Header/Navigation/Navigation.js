// Librairies
import React from "react";
import classes from './Navigation.module.css';

// Composants
import NavigationItem from "./NavigationItem/NavigationItem";

function Navigation() {
  return (
    <ul className={classes.Navigation}>
      <NavigationItem exact={true} to="/">Acceuil</NavigationItem>  
      <NavigationItem to="/articles">Articles</NavigationItem>  
      <NavigationItem exact={true} to="/contact">Contact</NavigationItem>  
    </ul>
  );
}

export default Navigation;