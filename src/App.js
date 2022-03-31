// Librairies
import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';
import fire from './firebase/index';


// Composants
import Layout from "./hoc/Layout/Layout";
import Home from './Containers/Pagesss/Home/Home';
import Contact from './Components/Contact/Contact';
import Bonsplans from './Containers/Pagesss/Bonsplans/Bonplans';
import Conseils from './Containers/Pagesss/Conseils/Conseils';
import Article from './Containers/Articles/Article/Article';
import Destinations from './Containers/Pagesss/Destinations/Destinations';
import Continent from './Containers/Pagesss/Continent/Continent'; 
import Pays from './Containers/Pagesss/Pays/Pays'; 

import ManageArticle from './Containers/Admin/ManageArticle/ManageArticle';
import Supprimer from './Containers/Admin/Supprimer/Supprimer';
import Modifier from './Containers/Admin/Modifier/Modifier';

import Authentification from './Containers/Security/Authentification/Authentification'

import Dashboard from './Containers/Admin/Dashboard/Dashboard';



function App() {

  // State
  const [user, setUser] = useState('');
  // ComponentDidMount
  useEffect(() => {
    authListener();
  }, []);

  const authListener = () => {
    fire.auth().onAuthStateChanged( user => {    // check if we are connected
      if(user) {
        setUser(user);  // if connected 
      }
      else {
        setUser('');  // deconnexion of the user
      }
    });
  };

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
          <Route exact path={routes.DASHBOARD} component={Dashboard} />
          <Route exact path={routes.MANAGE_ARTICLE} component={ManageArticle} />
          <Route exact path={routes.SUPPRIMER} component={Supprimer} />
          <Route exact path={routes.MODIFIER} component={Modifier} />
           
          <Route exact path={routes.AUTHENTIFICATION} component={Authentification} />


          <Route render={() => <h1>404</h1>} />  
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
