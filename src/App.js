// Librairies
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';


// Composants
import Layout from "./hoc/Layout/Layout";
import Home from './Containers/pages/Home/Home';
import Contact from './Components/Contact/Contact';
import Destinations from './Containers/pages/Destinations/Destinations';
import Pays from './Containers/pages/Pays/Pays';
import Bonsplans from './Containers/pages/Bonsplans/Bonplans';
import Conseils from './Containers/pages/Conseils/Conseils';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';
import Ajouter from './Containers/Admin/Ajouter/Ajouter';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.CONTACT} component={Contact} />
          <Route exact path={routes.DESTINATIONS} component={Destinations} />  
          <Route exact path={routes.PAYS} component={Pays} /> 
          <Route exact path={routes.BONSPLANS} component={Bonsplans} /> 
          <Route exact path={routes.CONSEILS} component={Conseils} /> 

          
          <Route path={routes.ARTICLES+'/:id'} component={Article} />   
          <Route exact path={routes.AJOUTER} component={Ajouter} />
          <Route render={() => <h1>404</h1>} />  
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
