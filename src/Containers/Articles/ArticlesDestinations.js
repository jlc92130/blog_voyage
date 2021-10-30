// Librairies
import React, { useEffect, useState} from 'react';
import axios from '../../config/axios-firebase';


// Composants
import DisplayedArticles from '../../Components/DisplayedArticles/DisplayedArticles';

function Articles(props) {

  // State
  const [articles, setArticles] = useState([]);
  let slug = props.match.path.replace(/\//g, '');  //"props.matchpath" <=> "/conseils" && "slug" <=> "conseils" => we remove the "/"
  console.log(props.match); 
  // ComponentDidMount 
  useEffect(() => {
    axios.get(`/articles.json?orderBy="rubrique"&equalTo="${slug}"`) // slug = {"destination"..., "asie"..., "france"...}
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