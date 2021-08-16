// Librairies
import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

// Composants
import Layout from "./hoc/Layout/Layout";
import Home from './Containers/Home/Home';
import Contact from './Components/Contact/Contact';
import Articles from './Containers/Articles/Articles';
import Article from './Containers/Articles/Article/Article';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route exact path="/articles" component={Articles} />  
          <Route path="/articles/:id" component={Article} />     
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
