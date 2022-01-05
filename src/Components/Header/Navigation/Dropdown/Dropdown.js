import React from 'react'
import NavigationItem from "../../Navigation/NavigationItem/NavigationItem";
import classes from './Dropdown.module.css';


 function Dropdown(props) {
   
  return (
    <ul  className={classes.DropdownMenuItems} ref={props.dropDownRef} >
      {props.dropDown.map(item => {
        return(
          <NavigationItem key={item.id} dropDown={item.dropDown} id={item.id} exact={true} to={item.path} cl={item.cName} title={item.title} />
        )
      })}
    </ul>    
  )
}


export default Dropdown;