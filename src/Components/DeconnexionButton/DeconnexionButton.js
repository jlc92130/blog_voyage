import React from 'react';
import { Link } from "react-router-dom";
import classes from './DeconnexionButton.module.css';
import fire from '../../firebase/index';
import routes from '../../config/routes';
import { withRouter } from 'react-router-dom';

function Button(props) {

  // Functions
  const logoutClickHandler = () => {
    fire.auth().signOut();
    props.history.push(routes.HOME);
  }

  return (
      <button onClick={logoutClickHandler} className={classes.Button}>Deconnexion</button>
  )
}

export default withRouter(Button);  // we use withRouter because Button is not a component