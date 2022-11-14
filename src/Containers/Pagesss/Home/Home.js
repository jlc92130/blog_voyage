// Librairies
import React, { useState, useEffect } from 'react';
import axios from '../../../config/axios-firebase';
import classes from './Home.module.css';


// Composants
import DisplayArticles from '../../../Components/DisplayArticles/DisplayArticles';

//Images
import Bandeau from "../../../assets/images/homePage/Cap-vert.jpg"

function Home(pros) {
  // State
  const [articles, setArticles] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);


  // ComponentDidMount 
  useEffect(() => {
    axios.get('/articles.json') // ?orderBy="date"&limitToLast=3  == display the last 3 articles ordered by date
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

        // Tri : keep only "publié" article
        articlesArray = articlesArray.filter(art => art.brouillon === "false");

        // show only 3  articles
        articlesArray = articlesArray.slice(0,3)

        setArticles(articlesArray);
        setHasLoaded(true);
      })
      .catch(error => {
        console.log(error)
      });
  }, []);
 

  return (
   
    <div>
      <div className={classes.ImageContainer} >
        <img className={classes.Image}  src={Bandeau} alt='illustration' />
        <h1 className={classes.titleH1}>Blog Voyage jl</h1>
      </div>
      <section>
        {
        hasLoaded && articles.length > 0 ? 
        <>
          <h2 className={classes.h2}>Derniers Articles</h2>
          <DisplayArticles articles={articles} />
        </>
        :
        <h2 className={classes.h2}> Derniers Articles </h2>
        }
      </section>
      <section>
        {
        hasLoaded && articles.length > 0 ? 
        <>
          <h2 className={classes.h2}>Articles Populaires</h2>
          <DisplayArticles articles={articles} />
        </>
        :
        <h2 className={classes.h2}> Articles Populaires </h2>
        }
      </section>
      <section>
        <div className={classes.ImageContainer} >
          <img className={classes.Image}  src={Bandeau} alt='illustration' />
          <div className={classes.EspritBlog}>
            <h3>L'Esprit De Ce Blog Voyage ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab voluptas minus harum alias, molestiae officiis quae facere rerum corrupti, soluta in excepturi velit vero non! Repellat deleniti quas dicta officia.
              Vitae unde voluptatibus soluta non modi minima sequi! Veniam similique aut, corrupti labore nisi vero possimus doloribus et repellendus libero accusamus eius, adipisci molestias quas impedit nobis necessitatibus porro dolorem.
              Excepturi debitis similique impedit laudantium, eos numquam explicabo illo sunt, quas praesentium dolor asperiores possimus nostrum ea et. Optio rem repudiandae reiciendis placeat odit tempore aspernatur quia aperiam rerum nulla!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;