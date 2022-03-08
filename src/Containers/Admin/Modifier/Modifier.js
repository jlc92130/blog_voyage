// Librairie
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import classes from '../Supprimer/Supprimer.module.css';
import axios from '../../../config/axios-firebase';
import transformDate from '../../../hooks/transformDate';
import routes from '../../../config/routes';




function Modifier(props) {

    //STATE
    const [articles, setArticles] = useState([])

  
     // Axios get data
    useEffect(() => {
        axios.get('/articles.json?orderBy="date"')
        .then( resp => {
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
        console.log(error);
        })
    }, []);
     
  const show = () => {
     
   
  }

  return (
      <div className={classes.tab}>
        { articles ?
        articles.map(article => {
        return (
            <>
              <div>{article.titre}</div> 
              <div>{transformDate(article.date)}</div> 
              <div>
                <Link
                  to={{
                    pathname: routes.AJOUTER,
                    state: article
                  }}>
                  <button className={classes.button} onClick={()=> show()} >Modifier</button>
                </Link>
              </div> 
            </>
        )})
        :
        ''
        }
        
      </div>
  );
}
 

export default Modifier;