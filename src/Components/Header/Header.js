// Librairies
import React, { useState } from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';


// Composants
import Navigation from './Navigation/Navigation';
import Button from '../Button/Button';

function Header() {
  // States
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  // Variables

  // Functions
   
  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () =>setClick(false);

  //   if(isMenu) {
  //       boxClass.push('menuq2');
  //   }else{
  //       boxClass.push('');
  //   }

  return (
    <header >
        <nav  className={`${classes.Navbar} container`}>
          <NavLink to='/' className={classes.Nav__bar__logo}>
              Voyage <i className='fab fa-typo3' />
          </NavLink>
          {/* <div onClick={handleShowSubMenu} className={classes.Navburger}>  */}
          {/* Responsive, burger Menu */}
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            {/* <div className={['container', classes.flex].join(' ')}> */}
          <Navigation />
          <Button />
        </nav>
    </header>
  );
}

export default Header;