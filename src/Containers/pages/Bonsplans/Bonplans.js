// Librairies
import React, { useEffect, useState} from 'react';
import axios from '../../../config/axios-firebase';


// Composants
import DisplayArticles from '../../../Components/DisplayArticles/DisplayArticles';

function ArticlesBonsPlans(props) {

  // State
  const [articles, setArticles] = useState([]);
  // ComponentDidMount 
  useEffect(() => {
    axios.get(`/articles.json?orderBy="rubrique"&equalTo="bonsplans"`)
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
      <DisplayArticles articles={articles} />
    </>
  );
}

export default ArticlesBonsPlans;