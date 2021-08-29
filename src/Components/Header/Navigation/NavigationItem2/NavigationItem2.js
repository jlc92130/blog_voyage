// Librairies
import React from "react";
import { NavLink } from 'react-router-dom';

function NavigationItem2(props) {
  return (
    <NavLink className="dropdown-item">{props.children}</NavLink>
  );
}

export default NavigationItem2;




