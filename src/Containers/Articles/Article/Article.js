import React, { useEffect, useState } from 'react';
import classes from './Article.module.css';
import axios from '../../../config/axios-firebase';
import transformDate from '../../../hooks/transformDate';


function Article(props) {

  // State
  const [article, setArticle] = useState({});
  
// ComponentDidMount     
    useEffect(() => {
      axios.get(`/articles.json?orderBy="slug"&equalTo="${props.match.params.slug}"`) // display the last 3 articles ordered by date
      .then(resp => {
        for (let key in resp.data) {
          setArticle({
            ...resp.data[key],
            id:key
          })
        }
        // const article = resp.data;
        // setArticle({article});
      })
      .catch(error => {
        console.log(error)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
     
      <>
        {/* page of the article */}
          <div className={classes.ImageContainer}>
            <img className={classes.Image} src={article.url} alt={article.titre}></img>
          </div>
        <div className={`${classes.contenant} container`}>
          <h1 className={classes.ArticleTitle}>{article.titre}</h1>       {/* props.match.params.slug */}
          <hr style={{
            backgroundColor: '#F40',
            height: .5,
            width: '180px',
            borderColor : '#F40'}}
          />
          <span className={classes.Date}>{transformDate(article.date)}</span>
          { article.brouillon === "true" ? <span className={classes.badge}> brouillon</span>  :  ""}
          <p className={classes.contenuArticle}>{article.contenu}</p>
        </div>
      </>
      
    )
}

export default Article;