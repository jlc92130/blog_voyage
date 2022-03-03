// Librairie
import React, {useState, useEffect} from 'react';
import classes from './Supprimer.module.css';
import axios from '../../../config/axios-firebase';
import transformDate from '../../../hooks/transformDate';
import { storage} from "../../../firebase/index";



function Supprimer(props) {

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
     
    const deleteClickedHandler = (article) => {
        // delete article in firebase DB
        axios.delete(`/articles/${article.id}.json`)
        .then(resp => {
            window.location.reload(false);  // reload page
              })
        .catch(error => {
        console.log(error)
        })
        //remove image from storage (firebase)
        storage.ref().child(`/images/${article.imageName}`).delete();
    }

  return (
      <div className={classes.tab}>
        { articles ?
        articles.map(article => {
        return (
            <>
                <div>{article.titre}</div> 
                <div>{transformDate(article.date)}</div> 
                <div><button className={classes.button} onClick={()=>deleteClickedHandler(article)}>Supprimer</button></div> 
            </>
        )})
        :
        ''
        }
        
      </div>
  );
}

export default Supprimer;