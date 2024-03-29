// Librairies
import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';


// Composants
import Navigation from './Navigation/Navigation';
import AuthentificationButton from '../AuthentificationButton/AuthentificationButton';
import DeconnexionButton from '../DeconnexionButton/DeconnexionButton';
import Bar from '../../Containers/Bar/Bar';

function Header(props) {

  return (
    <header >
        <nav  className={`${classes.Navbar} container`}>
          <NavLink to='/' className={classes.Nav__bar__logo}>
              Voyage <i className='fab fa-typo3' />
          </NavLink>
          {/* Responsive, burger Menu */}
        
          <Navigation  user={props.user} />
          {!props.user ? <AuthentificationButton /> : null}
          {props.user ? <DeconnexionButton /> : null}
          
          <Bar />
        </nav>
    </header>
  );
}

export default Header;