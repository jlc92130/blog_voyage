// Librairies
import React, { useRef } from "react";
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.module.css';
import Dropdown from '../../Navigation/Dropdown/Dropdown';


//Navbar menu items

function NavigationItem(props) {     
 
  const dropDownRef = useRef(null);
  //{[classes.container, classes.navItem].join(' ')}
  const onMouseEnterHandler = () => {
    dropDownRef.current.style.display="flex";
  }
  const onMouseLeaveHandler = () => {
    dropDownRef.current.style.display="none";
  }

  function linkClick() {
    console.log(props.to)
  }


  return (
    <>
      <li 
        key={props.id} 
        className={classes.[props.cl]}
        onMouseEnter={props.dropDown ? () => onMouseEnterHandler() : null} 
        onMouseLeave={props.dropDown ? () => onMouseLeaveHandler() : null}
      >
        {props.dropDown ? 
          <>
            <NavLink
              key={props.id}
              exact={props.exact} 

              to={props.to} 
              activeClassName={classes.active}  /*  on peut remplacer activeClassName par activeStyle={{color: }}  */
            >
              {props.title}
            </NavLink>
            <Dropdown dropDownRef={dropDownRef} dropDown={props.dropDown} /> 
          </>
          :
          <NavLink
            zone={props.zone}
            key={props.id}
            exact={props.exact} 
            to={props.to} 
            activeClassName={classes.active}  /*  on peut remplacer activeClassName par activeStyle={{color: }}  */
            onClick={linkClick}
          >
            {props.title}
          </NavLink>
        }
      </li>
    </>
  );
}

export default NavigationItem;


