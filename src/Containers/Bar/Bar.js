// Librairies
import React, { useState } from 'react';
import classes from './Bar.module.css';
 

// Composants



function Bar() {
  const [click, setClick] = useState(false);

 // Fonctions
 const handleClick = () => {
  setClick(!click);
}

  return (
    <div className={classes.MenuIcon} onClick={handleClick}>
      <i className={`${click ? 'fas fa-times' : 'fas fa-bars'}`} />
    </div>
  );
}

export default Bar;