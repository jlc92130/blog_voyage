// Librairies
import React, { useState, useEffect } from 'react';
import axios from '../../../config/axios-firebase';
import { Link } from 'react-router-dom';
import classes from './Home2.module.css';


// Composants
import DisplayArticles from '../../../Components/DisplayArticles/DisplayArticles';
import routes from '../../../config/routes';

//Images
import Bandeau from "../../../assets/images/homePage/Cap-vert.jpg"

function Home(pros) {
  // State
  const [articles, setArticles] = useState([]);

  // ComponentDidMount 
  useEffect(() => {
    axios.get('/articles.json?orderBy="date"&limitToLast=3') // display the last 3 articles ordered by date
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
    <div>
      <div  
        style={{ 
        backgroundImage: `url(${Bandeau})`,
        width: "100%",
        height: "50vh",
        backgroundSize: 'cover',
      }}
      >
        <h1 className={classes.titleH1}>Blog Voyage jl</h1>
      </div>
      <section>
        <h2 className={classes.h2}>Derniers Articles</h2>
        <DisplayArticles articles={articles} />
      </section>
      <section>
        <h2 className={classes.h2}>Articles Populaires</h2>
        <DisplayArticles articles={articles} />
      </section>
      <section>
        <div  
          className={classes.ContainerEspritBlog}
          style={{ 
            backgroundImage: `url(${Bandeau})`,
            backgroundSize: 'cover',
          }}
        >
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