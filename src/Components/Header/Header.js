// Librairies
import React, { useState } from 'react';
import classes from './Header.module.css';

// Composants
import Navigation from './Navigation/Navigation';

function Header() {
  // States
  const [showSubMenu, setShowSubMenu] = useState(false);

  // Functions
  const handleShowSubMenu = () => setShowSubMenu(!showSubMenu);

  return (
    <header>
      <nav className={classes.Navbar}>
        <div className={['container', classes.flex].join(' ')}>
          <div className={classes.logo}>
          Voyage
          </div>
          <Navigation showSubMenu={showSubMenu} />
        </div>
        <div onClick={handleShowSubMenu} className={classes.Navburger}>
          <i className={showSubMenu ? 'fas fa-times' : 'fas fa-bars'} style={{color: 'white'}} />
        </div>
      </nav>
    </header>
  );
}

export default Header;