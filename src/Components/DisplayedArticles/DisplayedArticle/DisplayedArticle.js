// Librairies
import React from 'react';
import classes from './DisplayedArticle.module.css';
import { Link } from 'react-router-dom';

function DisplayedArticle(props) {

 return (
   props.article.rubrique == 'destinations' ?
    <Link className={classes.link} to={props.article.rubrique + '/' + props.article.pays + '/' + props.article.slug} >
      <div className={classes.DisplayedArticle}>
        <h2>{props.article.titre}</h2>
        <p>{props.article.accroche}</p>
        
        <small>{props.article.auteur}</small>
      </div>
    </Link>
    :
    <Link className={classes.link} to={ props.article.rubrique + '/' + props.article.slug} >
      <div className={classes.DisplayedArticle}>
        <h2>{props.article.titre}</h2>
        <p>{props.article.accroche}</p>
        
        <small>{props.article.auteur}</small>
      </div>
    </Link>
 )
}

export default DisplayedArticle;