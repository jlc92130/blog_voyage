// Librairies
import React from 'react';
import classes from './CardArticle.module.css';
import { Link } from 'react-router-dom';

function CardArticle(props) {

 return (
   props.article.rubrique === 'destinations' ?
    <Link className={classes.link} to={props.article.rubrique + '/' + props.article.pays + '/' + props.article.slug} > {/* ex: to = "destination/italie/milan-capitale-de-la-mode" */}
      <div className={classes.CardArticle}>
        {/* <img src={require(`../../../assets/images/${props.article.pays}/${props.article.image}`).default} alt={props.article.titre}></img> */}
        {/* <img src={} alt={props.article.titre}></img> */}
        <div className={classes.CardBody}>
          <h2>{props.article.titre}</h2>
          <p>{props.article.accroche}</p>
          <small>{props.article.auteur}</small>
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