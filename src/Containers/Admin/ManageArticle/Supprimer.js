// Librairie
import React, {useState, useEffect} from 'react';
import classes from './Supprimer.module.css';
import axios from '../../../config/axios-firebase';
import transformDate from '../../../hooks/transformDate';
import { storage} from "../../../firebase/index";
import { toast } from 'react-toastify';



function Supprimer(props) {

    //STATE
    const [articles, setArticles] = useState([])
    const [error, setError] = useState(false);

  
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
        if(props.user) {
            props.user.getIdToken()
            .then(token => {
                // delete article in firebase DB
                axios.delete(`/articles/${article.id}.json?auth=${token}`)  // we need the token because in DB 'write' is only for authentified user and all auth user have a token
                .then(resp => {
                    toast.success("article supprimé avec succes", {autoClose: 1500});

                    window.location.reload(false);  // reload page
                    })
                .catch(error => {
                console.log(error)
                })
                //remove image from storage (firebase)
                storage.ref().child(`/images/${article.imageName}`).delete(); 
            })
            .catch(error => {
                console.log(error);
            });
        }else  // if user is not connected then user doesn't exist 
        {
            setError(true);
        }
    }   

        

  return (
      <>
       {error ? <p1 className={classes.alert}>Vous n'etes pas authentifié</p1> : '' }
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
      </>
  );
}

export default Supprimer;