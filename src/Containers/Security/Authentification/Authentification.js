// Librairies
import React, { useState } from "react";
import classes from './Authentification.module.css';
import { checkValidity  } from "../../../Shared/utility";
import fire from "../../../firebase/index";

// Composents
import Inputt from '../../../Components/UI/Input/Input';
import routes  from "../../../config/routes";


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
                    errormessage: 'adresse email invalide'
                },
                value: '',
                label: 'Email',
                valid: false, 
                validation: {
                    required: true,
                    email: true,
                },
                touched: false,
            },
            password : {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'password',
                    show: true,
                    errormessage: 'mot de passe obligatoire et au moins 6 caracteres'
                },
                value: '',
                label: 'Password',
                valid: false, 
                validation: {
                    required: true,
                    minlength: 6
                },
                touched: false,
            }
        }
    );
    // State2  
    const [validForm, setValidForm] = useState(false);
    // State3
    const [emailError, setEmailError] = useState(false);
     // State3
     const [loginError, setLoginError] = useState(false);

    //functions
    
     // State
  const [user, setUser] = useState();

   


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
        setValidForm(formIsValid);
    } 

    const registerClickHandler = () => {
       const user = {
           email: inputs.email.value,
           password: inputs.password.value
       };
       fire
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password)  // creation of user in Firebase 
            .then(resp => {
                props.history.push(routes.HOME); // redirection if no error
            })
            .catch(error => {
                switch(error.code) {
                    case 'auth/email-already-in-use':   // the user is already in DB
                        setEmailError(true);
                        break;
                }
            });
    }

    const loginClickHandler = () => {
        const user = {
            email: inputs.email.value,
            password: inputs.password.value
        };
        fire.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then( resp => {
                props.history.push(routes.HOME)
            })
            .catch(error => {
                console.log(error)

                switch(error.code) {
                    case 'auth/invalide-email':  //combination user/password not right
                    case 'auth/too-many-requests': //password wrong
                    case 'auth/user-disabled':  //user is in DB but he has no the permission to connect
                    case 'auth/user-not-found':  // user not un DB
                        setLoginError(true);
                        break;
                }
            })
        
    }

    const formHandler = (e) => {
        e.preventDefault();
    }
    
    const formElementsArray = []; 
    for(let key in inputs) {
        formElementsArray.push({
        id: key,
        config: inputs[key]
        });
    }

    let form = (
        <form onSubmit={(e) => formHandler(e)} className={classes.form} >
          {emailError ? <p className={classes.alert}>"Cette ardesse email est déja utilisée"</p> : ''}
          {loginError ? <p className={classes.alert}>"Cette ardesse email n'existe pas ou est erronée"</p> : ''}        
          
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
                <button onClick={loginClickHandler} disabled={!validForm} className={classes.button}>Connexion</button>
                <button onClick={()=>registerClickHandler()} disabled={!validForm} className={classes.button}>Inscription</button>
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