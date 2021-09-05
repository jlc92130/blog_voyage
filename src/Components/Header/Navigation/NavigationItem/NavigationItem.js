// Librairies
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import classesNavigationItem from './NavigationItem.module.css';
import classesDropdown2 from '../Dropdown2/Dropdown2.module.css';
import Dropdown from '../../Navigation/Dropdown1/Dropdown';
import Dropdown2 from '../../Navigation/Dropdown2/Dropdown2';


//Navbar menu items

function NavigationItem(props) {     
  // State
  const [dropdown1, setDropdown] = useState(false);

  const [dropdown2, setDropdown2] = useState(false);

  // Functions
 
  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  const onMouseEnter2 = () => {
    setDropdown2(true);
    
};

const onMouseLeave2 = () => {
  setDropdown2(false);
};
  

  //{[classes.container, classes.navItem].join(' ')}


  return (
    <>
      { props.title === 'DESTINATIONS' || props.zone === 'EUROPE' || props.zone === 'ASIE' ? 
        <div 
          onMouseEnter={props.title === 'DESTINATIONS' ? onMouseEnter:onMouseEnter2} 
          onMouseLeave={props.title === 'DESTINATIONS' ? onMouseLeave:onMouseLeave2} >
            
          <li key={props.id} className={classesNavigationItem.[props.cl]}  >
            <NavLink
              zone={props.zone}
              key={props.id}
              exact={props.exact} 
              to={props.to} 
              activeClassName={classesNavigationItem.active}  /*  on peut remplacer activeClassName par activeStyle={{color: }}  */
             
            >
              {props.children}
              
            </NavLink>
          </li>
            { dropdown1 ? <Dropdown /> : '' }
            { dropdown2 ? <Dropdown2 zone={props.zone} /> : ''}
        </div>
      :
        <div >
          <li key={props.id} className={classesNavigationItem.[props.cl]} >
            <NavLink
              exact={props.exact} 
              to={props.to} 
              activeClassName={classesNavigationItem.active}  /*  on peut remplacer activeClassName par activeStyle={{color: }}  */
            >
              {props.children}
            </NavLink>
          </li>
            
        </div>
      }
    </>
   
  );
}

export default NavigationItem;


