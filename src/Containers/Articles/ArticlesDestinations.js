// Librairies
import React, { useEffect, useState} from 'react';
import axios from '../../config/axios-firebase';
import {NavBarItems} from '../../Components/Header/Navigation/NavItems/NavBarItems';
import { ZoneGeoItems } from '../../Components/Header/Navigation/NavItems/ZoneGeoItems';



// Composants
import DisplayArticles from '../../Components/DisplayArticles/DisplayArticles';

function Articles(props) {
  
  // State
  const [articles, setArticles] = useState([]);
  let slug = props.match.path.replace(/\//g, '');  //"props.match.path" <=> "/conseils" => we remove the "/" => "slug" = "conseils"  ou "asie".... 
  // VARIABLES
  const navbarItems = [];  // navbarItems = ["destinations","conseils"...]
  const continentItems = [];

  NavBarItems.forEach(navItem => { 
    navbarItems.push(navItem.title.toLowerCase());
  });

  
  ZoneGeoItems.forEach(continent => { 
    continentItems.push(continent.title.toLowerCase());
  });
// continentItems = ["asie","europe"...]

  // ComponentDidMount   
  useEffect(() => {
    if(navbarItems.includes(slug)) {

      axios.get(`/articles.json?orderBy="rubrique"&equalTo="${slug}"`) // slug ="destination" ou "conseils" ou....
        .then(resp => {
          const articlesArray = [];
          for (let key in resp.data) {   // key = "MnROkKtRzRcPCiceYWq" ....
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
      }
    else if(continentItems.includes(slug)) {

      axios.get(`/articles.json?orderBy="continent"&equalTo="${slug}"`) // slug = {"destination"..., "asie"..., "france"...}
        .then(resp => {
          const articlesArray = [];
          for (let key in resp.data) {
            articlesArray.push({
              ...resp.data[key], // destructuring
              id: key,
            });
          }
          articlesArray.reverse();
  
          setArticles(articlesArray);
        })
        .catch(error => {
          console.log(error)
        });
    }
  }, []);

  

  return (
    <>
      <h1>ARTICLES</h1>
      <DisplayArticles articles={articles} />
    </>
  );
}

export default Articles;