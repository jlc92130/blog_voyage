import React from 'react';
import { Link } from "react-router-dom";
import classes from './AuthentificationButton.module.css';

function Button() {
  return (
    <Link to='../../authentification' className={classes.ButtonLink}>
      <button className={classes.Button}>Authentification</button>
    </Link>
  )
}

export default Button;