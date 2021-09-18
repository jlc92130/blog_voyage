import React from 'react'
import NavigationItem from "../../Navigation/NavigationItem/NavigationItem";
import classes from './Dropdown.module.css';


 function Dropdown(props) {
   
  return (
    <ul  className={classes.DropdownMenuItems} >
      {props.dropDown.map(item => {
        return(
          <NavigationItem dropDown={item.dropDown} id={item.id} exact={true} to={item.path} zone={item.title} cl={item.cName} title={item.title} />
        )
      })}
    </ul>    
  )
}


export default Dropdown;