// Librairies
import React, { useEffect, useState} from 'react';
import axios from '../../../config/axios-firebase';

// CSS
import classes from './Destinations.module.css';

// Composants
import DisplayedArticles from '../../../Components/DisplayedArticles/DisplayedArticles';

function Destinations() {

  // State
  const [articles, setArticles] = useState([]);

  // ComponentDidMount 
  useEffect(() => {
    axios.get('/articles.json')
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
      <h1 className={classes.DestinationTitle}>DESTINATIONS</h1>
      <DisplayedArticles articles={articles} />
    </>
  );
}

export default Destinations;
