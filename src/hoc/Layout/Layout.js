// Librairies
import React from 'react';

// Composants
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import classes from './Layout.module.css'

function Layout(props) {
  return (
      <div className={classes.Layout}>  
        {/* En tête  */}
        <Header user={props.user} />
        {/* Corps  */}
        <div className={classes.content}>
          {props.children}
        </div>
        {/* Pied de page */}
        <Footer />
      </div>  
  );
}

/*
  - Header
    - logo
    - Navigation
      - NavigationItem

*/

export default Layout;