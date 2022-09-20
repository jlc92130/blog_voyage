// Librairies
import React, { useEffect, useState} from 'react';
import axios from '../../../config/axios-firebase';

// CSS
import classes from './Destinations.module.css';

// Composants
import DisplayArticles from '../../../Components/DisplayArticles/DisplayArticles';

function Destinations() {

  // State
  const [articles, setArticles] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // ComponentDidMount 
  useEffect(() => {
    axios.get('/articles.json')
      .then(resp => {
        let articlesArray = [];
        for (let key in resp.data) {
          articlesArray.push({
            ...resp.data[key], // destructuring
            id: key 
          });
        }
        // Chronologie 
        articlesArray.reverse();

        // Tri keep only "publié" article
        articlesArray = articlesArray.filter(art => art.brouillon === "false");

        setArticles(articlesArray);
        setHasLoaded(true);
      })
      .catch(error => {
        console.log(error)
      });
  }, []);

  return (
    hasLoaded && articles.length > 0 ? 
    <>
      <h1 className={classes.DestinationTitle}>DESTINATIONS</h1>
      <DisplayArticles articles={articles} />
    </>
    :
    <h1 className={classes.DestinationTitle}> DESTINATIONS </h1>
  );
}

export default Destinations;
