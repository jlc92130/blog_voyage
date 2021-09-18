// Librairies
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import classesNavigationItem from './NavigationItem.module.css';
import Dropdown from '../../Navigation/Dropdown1/Dropdown';


//Navbar menu items

function NavigationItem(props) {     
 
  //{[classes.container, classes.navItem].join(' ')}

  return (
    <>
          <li 
            key={props.id} 
            className={classesNavigationItem.[props.cl]}
          >
            {props.dropDown ? 
            <>
              <NavLink
                zone={props.zone}
                key={props.id}
                exact={props.exact} 
                to={props.to} 
                activeClassName={classesNavigationItem.active}  /*  on peut remplacer activeClassName par activeStyle={{color: }}  */
              >
                {props.title}
              </NavLink>
                <Dropdown dropDown={props.dropDown} /> 
              </>
              :
              <NavLink
                zone={props.zone}
                key={props.id}
                exact={props.exact} 
                to={props.to} 
                activeClassName={classesNavigationItem.active}  /*  on peut remplacer activeClassName par activeStyle={{color: }}  */
              >
                {props.title}
              </NavLink>
            }
          </li>
          
             
        
      
    
    </>
   
  );
}

export default NavigationItem;


