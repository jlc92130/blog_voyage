// Librairies
import React from 'react';
import classes from './CardArticle.module.css';
import { Link } from 'react-router-dom';

function CardArticle(props) {
// transform date (seconds since 1970) to jj/mm/aaaa
  const currentDate = new Date(props.article.date)  
  const newDateOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
  }
  const newDate = currentDate.toLocaleString("fr-FR", newDateOptions );

 return (
   props.article.rubrique === 'destinations' ?
    <Link className={classes.link} to={props.article.rubrique + '/' + props.article.pays + '/' + props.article.slug} > {/* ex: to = "destination/italie/milan-capitale-de-la-mode" */}
      <div className={classes.CardArticle}>
        <img src={props.article.url} alt={props.article.titre}></img>
        <div className={classes.CardBody}>
          <h2>{props.article.titre}</h2>
          <p>{props.article.accroche}</p>
          <small>{props.article.auteur}</small>
          <small>{' ' + newDate}</small>
        </div>
      </div>
    </Link>
    :
    <Link className={classes.link} to={ props.article.rubrique + '/' + props.article.slug} >
      <div className={classes.CardArticle}>
        <h2>{props.article.titre}</h2>
        <p>{props.article.accroche}</p>
        
        <small>{props.article.auteur}</small>
      </div>
    </Link>
 )
}

export default CardArticle;