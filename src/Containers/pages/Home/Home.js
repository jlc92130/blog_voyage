// Librairies
import React, { useState, useEffect } from 'react';
import axios from '../../../config/axios-firebase';
import { Link } from 'react-router-dom';

// Composants
import DisplayedArticles from '../../../Components/DisplayedArticles/DisplayedArticles';
import routes from '../../../config/routes';

function Home(pros) {
  // State
  const [articles, setArticles] = useState([]);

  // ComponentDidMount 
  useEffect(() => {
    axios.get('/articles.json?orderBy="date"&limitToLast=3') // display the last 3 articles
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
    <>
      <h1>home</h1>
      <DisplayedArticles articles={articles} />
      <Link to={routes.DESTINATIONS}>Afficher tout les articles</Link>
    </>
  )
}

export default Home;