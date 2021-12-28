import React from 'react';
import CardArticle from './CardArticle/CardArticle';
import classes from './DisplayedArticles.module.css';

function DisplayedArticles(props) {

  let articles = props.articles.map(article => (
    <CardArticle key={article.id} article={article} /> 
  ));

  return (
    <section className={[classes.DisplayedArticles, "containere"].join(' ')}>
      {articles}
    </section>
  );
}


export default DisplayedArticles;