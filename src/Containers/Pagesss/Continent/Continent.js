// Librairies
import React, { useEffect, useState} from 'react';
import axios from '../../../config/axios-firebase';


// Composants
import DisplayArticles from '../../../Components/DisplayArticles/DisplayArticles';
// CSS
import classes from './Continent.module.css';

 
function Continent(props) {

  // State
  const [articles, setArticles] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // ComponentDidMount useEffect is executed at the end
  useEffect(() => {
    axios.get(`/articles.json?orderBy="continent"&equalTo="${props.match.path.split('/').pop()}"`)
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
        setHasLoaded(true);
      })
      .catch(error => {
        console.log(error)
      });
  }, [articles]);



  // const fetchData = async () => {
  //   const continents =  await axios.get(`/articles.json?orderBy="continent"&equalTo="europe"`)
  //     .then(resp => {
  //     const articlesArray = [];
  //     for (let key in resp.data) {
  //       articlesArray.push({
  //         ...resp.data[key], // destructuring
  //         id: key 
  //       });
  //     }
  //     articlesArray.reverse();
  //     setHasLoaded(true);
  //     setArticles(articlesArray);
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  //   return continents
  // }

  // useEffect(() => {
  //   fetchData();
   
  // }, []);
console.log(props.match.path.split('/').pop())
  console.log(hasLoaded)
  return (
    hasLoaded ? 
    (
      <>
        <h1 className={classes.DestinationTitle}>{ articles[0].continent.toUpperCase() }</h1>
        <DisplayArticles articles={articles} />
      </>
    )
    :
    <p>CONTINENT</p>
  )
}

export default Continent;
