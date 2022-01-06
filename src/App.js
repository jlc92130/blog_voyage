// Librairies
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';


// Composants
import Layout from "./hoc/Layout/Layout";
import Home from './Containers/Pages/Home2/Home2';
import Contact from './Components/Contact/Contact';
import Bonsplans from './Containers/Pages/Bonsplans/Bonplans';
import Conseils from './Containers/Pages/Conseils/Conseils';
import Article from './Containers/Articles/Article/Article';
import Destinations from './Containers/Pages/Destinations/Destinations';
import Continent from './Containers/Pages/Continent/Continent'; 
import Pays from './Containers/Pages/Pays/Pays'; 

import Ajouter from './Containers/Admin/Ajouter/Ajouter';


function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={routes.CONTACT} component={Contact} />
          
          <Route exact path={ routes.DESTINATIONS} component={Destinations} /> 
           
          { routes.CONTINENT.map(continent => (
            <Route exact path={routes.DESTINATIONS + continent} component={Continent} /> 
          ))
          }
          { routes.PAYS.map(pays => (
            <Route exact path={routes.DESTINATIONS + pays} component={Pays} /> 
          ))
          }
          { routes.PAYS.map(pays => (
            <Route exact path={routes.DESTINATIONS + pays + '/:slug'} component={Article} /> 
          ))
          }
          <Route exact path={routes.BONSPLANS} component={Bonsplans} />
          <Route exact path={routes.BONSPLANS + '/:slug'} component={Article} /> 

          <Route exact path={routes.CONSEILS} component={Conseils} /> 
          <Route exact path={routes.AJOUTER} component={Ajouter} />
          <Route render={() => <h1>404</h1>} />  
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
