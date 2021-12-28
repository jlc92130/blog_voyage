// Librairies
import React, { useState, useEffect } from 'react';
import axios from '../../../config/axios-firebase';
import { Link } from 'react-router-dom';
import classes from './Home.module.css';


// Composants
import DisplayedArticles from '../../../Components/DisplayedArticles/DisplayedArticles';
import routes from '../../../config/routes';

//Images
import Bandeau from "../../../assets/images/homePage/Cap-vert.jpg"

function Home(pros) {
  // State
  const [articles, setArticles] = useState([]);

  // ComponentDidMount 
  useEffect(() => {
    axios.get('/articles.json?orderBy="date"&limitToLast=3') // display the last 3 articles ordered by date
      .then(resp => {
        const articlesArray = [];

        for (let key in resp.data) {
          articlesArray.push({
            ...resp.data[key], // destructuring
            id: key 
          });
        }
        articlesArray.reverse();
        setArticles(articlesArray);
      })
      .catch(error => {
        console.log(error)
      });
  }, []);


  return (
    <div>
      <div  
        style={{ 
        backgroundImage: `url(${Bandeau})`,
        width: "100%",
        height: "50vh",
        backgroundSize: 'cover',
      }}
      >
        <h1 className={classes.titleH1}>Blog Voyage jl</h1>
      </div>
      <DisplayedArticles articles={articles} />
      <Link to={routes.DESTINATIONS}>Afficher tout les articles</Link>
    </div>
  )
}

export default Home;