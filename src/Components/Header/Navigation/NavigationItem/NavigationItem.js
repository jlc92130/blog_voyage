// Librairies
import React from "react";
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';

function NavigationItem(props) {
  return (
    <li className={classes.NavigationItem}>
      <NavLink exact={props.exact} to={props.to} activeClassName={classes.tot}>{props.children}</NavLink>
      {/*  on peut remplacer activeClassName par activeStyle={{color: black}}  */}
    </li>
  );
}

export default NavigationItem;