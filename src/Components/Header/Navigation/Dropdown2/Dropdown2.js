import React from 'react'
import {PaysItems} from '../NavItems/PaysItems';
import NavigationItem from "../NavigationItem/NavigationItem";
import classes from './Dropdown2.module.css';

function Dropdown2(props) {
  // State
   

// We get a tab "country" where we have the countries of the selected zone (Europe...)
const country = PaysItems.filter(country => country.zone == props.zone);
   
  return (
    <ul  className={classes.DropdownMenuItems2} >
      {country.map(item => {
        return(
          <NavigationItem   key={item.id} exact={true} to={item.path} cl={item.cName} >
              {item.title}
          </NavigationItem>  
        )
      })}
    </ul>
  )
}


export default Dropdown2;