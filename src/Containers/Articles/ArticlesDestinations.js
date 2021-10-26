// Librairies
import React, { useEffect, useState} from 'react';
import axios from '../../config/axios-firebase';


// Composants
import DisplayedArticles from '../../Components/DisplayedArticles/DisplayedArticles';

function Articles(props) {

  // State
  const [articles, setArticles] = useState([]);
  console.log(props);
  // ComponentDidMount 
  useEffect(() => {
    axios.get(`/articles.json?orderBy="rubrique"&equalTo="destination"`)
      .then(resp => {
        const articlesArray = [];
        console.log(resp.data);
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
      <h1>ARTICLES</h1>
      <DisplayedArticles articles={articles} />
    </>
  );
}

export default Articles;