// Librairies
import React from 'react';
import classes from './Layout.module.css'
import 'react-toastify/dist/ReactToastify.css';


// Composants
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

function Layout(props) {
  return (
      
      <div className={classes.Layout}>  
        {/* En tête  */}
        <Header user={props.user} />
        {/* Corps  */}
        <div className={classes.content}>
          {props.children}
        </div>

        { /* notification */}
        <ToastContainer autoClose="2000" />
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