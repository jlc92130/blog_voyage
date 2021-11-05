// Librairies
import React, { useEffect, useState} from 'react';
import axios from '../../config/axios-firebase';
import {NavBarItems} from '../../Components/Header/Navigation/NavItems/NavBarItems';
import { ZoneGeoItems } from '../../Components/Header/Navigation/NavItems/ZoneGeoItems';



// Composants
import DisplayedArticles from '../../Components/DisplayedArticles/DisplayedArticles';

function Articles(props) {
  
  // State
  const [articles, setArticles] = useState([]);
  let slug = props.match.path.replace(/\//g, '');  //"props.match.path" <=> "/conseils" => "slug" = "conseils" => we remove the "/"
  
  // VARIABLES
  const navbarItemTab = [];
  NavBarItems.forEach(navItem => { 
    navbarItemTab.push(navItem.title.toLowerCase());
  });

  const continentItems = [];
  ZoneGeoItems.forEach(continent => { 
    continentItems.push(continent.title.toLowerCase());
  });
  

  // ComponentDidMount   
  useEffect(() => {
    if(navbarItemTab.includes(slug)) {

      axios.get(`/articles.json?orderBy="rubrique"&equalTo="${slug}"`) // slug = {"destination"..., "asie"..., "france"...}
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
  }, [slug]);

  

  return (
    <>
      <h1>ARTICLES</h1>
      <DisplayedArticles articles={articles} />
    </>
  );
}

export default Articles;