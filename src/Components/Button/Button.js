import React from 'react';
import { Link } from "react-router-dom";
import classes from './Button.module.css';

function Button() {
  return (
    <Link to='sign-up'>
      <button className={classes.Button}>Sign Up</button>
    </Link>
  )
}

export default Button;