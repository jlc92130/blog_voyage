// Librairies
import React from 'react';
import classes from './DisplayedArticle.module.css';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';

function DisplayedArticle(props) {

 return (
  <Link to={routes.DESTINATIONS+'/'+props.article.slug}>
    <div className={classes.DisplayedArticle}>
      <h2>{props.article.titre}</h2>
      <p>{props.article.accroche}</p>
      <small>{props.article.auteur}</small>
    </div>
  </Link>
 )
}

export default DisplayedArticle;