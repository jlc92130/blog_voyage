import React from 'react';
import classes from './Contact.module.css';
import { Route } from 'react-router-dom';

function Contact(props) {
  // Fonctions
  const emailClickedHandler = () => {
    props.history.push(props.match.url + "/email");
  }
  const telClickedHandler = () => {
    props.history.push(props.match.url + '/tel');
  }

  return (
    <div className={classes.Contact}>
      <h1>CONTACT</h1>
      <button onClick={emailClickedHandler} className={classes.button}>Email</button>
      <button onClick={telClickedHandler} className={classes.button}>Tel</button>

      <Route exact path={props.match.url + "/email"} render={() => <p>jack@gmail.com</p>} />
      <Route exact path={props.match.url + "/tel"} render={() => <p>06 06 06 06 06</p>} />
    </div>
  );
}

export default Contact;