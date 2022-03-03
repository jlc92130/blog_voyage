import React  from 'react';
import classes from './Dashboard.module.css';
import routes from '../../../config/routes';

function Dashboard(props) {
    const redirectionAjouter = () => {
        props.history.replace(routes.AJOUTER);
    }
    const redirectionModifier = () => {
        props.history.replace(routes.MODIFIER);
    }
    const redirectionSupprimer = () => {
        props.history.replace(routes.SUPPRIMER);
    }
     
    return (
        <div className={classes.menu}>
            <div><button className={classes.button} onClick={redirectionAjouter}>AJOUTER</button></div>
            <div><button className={classes.button} onClick={redirectionModifier}>MODIFIER</button></div>
            <div><button className={classes.button} onClick={redirectionSupprimer}>SUPPRIMER</button></div>
        </div>
    );

}

export default Dashboard;