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