import React, { useState } from 'react'
import {ZoneGeoItems} from '../../Navigation/NavItems/ZoneGeoItems';
import NavigationItem from "../../Navigation/NavigationItem/NavigationItem";
import classes from './Dropdown.module.css';


 function Dropdown(props) {
//   // State
   const drop = (true);
   
  return (
    <ul  className={classes.DropdownMenuItems} >
      {ZoneGeoItems.map(item => {
        return(
          <NavigationItem drop={item.drop}  key={item.id} exact={true} to={item.path} zone={item.title} cl={item.cName} >
              {item.title}
          </NavigationItem>  
        )
      })}
    </ul>
   
    
  )
}


export default Dropdown;