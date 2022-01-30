import React, { useEffect, useState } from 'react';
import classes from './Article.module.css';
import axios from 'axios';

function Article(props) {

  // State
  const [article, setArticle] = useState({});
  
// ComponentDidMount
    useEffect(() => {
      axios.get(`/articles.json?orderBy="slug"&equalTo="${props.match.params.slug}"`) // display the last 3 articles ordered by date
      .then(resp => {
        const article = resp.data;
        setArticle({article});
      })
      .catch(error => {
        console.log(error)
      })
    }, []);

    return (
      <>
        {/* page of the article */}
        <h1 className={classes.ArticleTitle}>{props.match.params.slug}</h1>
         
      </>
    )
}

export default Article;