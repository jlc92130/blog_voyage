// Librairies
import React from 'react';

// Composants
import Header from '../../Components/Header/Header';

function Layout(props) {
  return (
      <>  
        {/* En tête  */}
        <Header />
        {props.children}
        {/* Pied de page */}
      </>  
  );
}

/*
  - Header
    - logo
    - Navigation
      - NavigationItem

*/

export default Layout;