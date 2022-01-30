import React from 'react';
import classes from './Contact.module.css';
import { Route } from 'react-router-dom';

function Contact(props) {
  // Fonctions
  const emailClickedHandler = () => {
    props.history.push(props.match.url + "/email");
  }
  const telClickedHandler = () => {
    props.history.push(props.match.url + '/contact/tel');
  }

  return (
    <>
      <h1>contact</h1>
      <button onClick={emailClickedHandler} className={classes.button}>Email</button>
      <button onClick={telClickedHandler} className={classes.button}>tel</button>

      <Route exact path={props.match.url + "/email"} render={() => <p>email</p>} />
      <Route exact path={props.match.url + "/tel"} render={() => <p>tel</p>} />

    </>
  );
}

export default Contact;