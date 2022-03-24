// Librairies
import React, { useState } from "react";
import classes from './Authentification.module.css';
import { checkValidity  } from "../../../Shared/utility";

// Composents
import Inputt from '../../../Components/UI/Input/Input';


// Functions

function Authentification(props) {
    // State1
    const [inputs, setInputs] = useState ( 
        {
            email : {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email',
                    show: true,
                },
                value: '',
                label: 'Email',
                valid: false, 
                validation: {
                    required: true,
                    email: true,
                },
                touched: false,
                errormessage: 'adresse email invalide'
            },
            password : {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password',
                    show: true,
                },
                value: '',
                label: 'Password',
                valid: false, 
                validation: {
                    required: true,
                },
                touched: false,
                errormessage: 'mot de passe obligatoire'
            }
        }
    );
    // State2  
    const [validForm, SetValidForm] = useState(false);

    //functions
    
   


    const inputChangedHandler = (e, id) => {
        const newInputs = {...inputs};
        newInputs[id].value = e.target.value;
        newInputs[id].touched = true;

        
        newInputs[id].value = e.target.value;    
        newInputs[id].valid = checkValidity(e.target.value, newInputs[id].validation);

        setInputs(newInputs); 

        //check if form is valid 
        let formIsValid = true;
        for (let input in newInputs) {
        formIsValid = newInputs[input].valid && formIsValid
        }
        SetValidForm(formIsValid);
    } 

    const formElementsArray = []; 
    for(let key in inputs) {
        formElementsArray.push({
        id: key,
        config: inputs[key]
        });
    }

    let form = (
        <form className={classes.form} >
           
          {formElementsArray.map( formElement => (
            <Inputt 
              key={formElement.id}
              id={formElement.id}
              label={formElement.config.label}
              value={formElement.config.value}
              type={formElement.config.elementType}
              config={formElement.config.elementConfig}
              changed={(e) => inputChangedHandler(e, formElement.id)}
              valid={formElement.config.valid}
              touched={formElement.config.touched}
              show={formElement.config.elementConfig.show}
              errormessage={formElement.config.elementConfig.errormessage}
              //fileUpload={(e) => handleUpload(
              SetInputs={setInputs}
              inputs={inputs}
            />
          ))
          }
            <div className={classes.form}>
                <button className={classes.button}>Connexion</button>
                <button className={classes.button}>Inscription</button>
            </div>
        </form>
    );

    
    return (
        <>
        <h1 className={classes.titre}>Authentification</h1>
        <div className="container">
            {form}    
        </div>
        </>
    )
}


export default Authentification;