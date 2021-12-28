// Librairies
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import routes from './config/routes';


// Composants
import Layout from "./hoc/Layout/Layout";
import Home from './Containers/Pages/Home/Home';
import Contact from './Components/Contact/Contact';
import Bonsplans from './Containers/Pages/Bonsplans/Bonplans';
import Conseils from './Containers/Pages/Conseils/Conseils';
import Article from './Containers/Articles/Article/Article';
import PagesDestinations from './Containers/Pages/Destinations/Destinations';
import ArticlesBonsPlans from './Containers/Articles/ArticlesBonsPlans';
import Ajouter from './Containers/Admin/Ajouter/Ajouter';


function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={routes.CONTACT} component={Contact} />
          
          <Route exact path={ routes.DESTINATIONS} component={PagesDestinations} />  
          {/* <Route exact path={ routes.EUROPE} component={ArticlesDestinations} />  
          <Route exact path={ routes.ASIE } component={ArticlesDestinations} />  
          <Route exact path={ routes.AMERIQUE } component={ArticlesDestinations} />   */}

          <Route exact path={routes.DESTINATIONS + routes.PAYS.includes() + '/:slug'} component={Article} /> 
          <Route exact path={routes.DESTINATIONS + routes.CHINE + '/:slug'} component={Article} /> 
          <Route exact path={routes.DESTINATIONS + routes.ITALIE + '/:slug'} component={Article} /> 


          <Route exact path={routes.BONSPLANS} component={ArticlesBonsPlans} />
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
