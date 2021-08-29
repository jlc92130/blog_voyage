// Librairie
import React, { useState} from 'react';
import classes from './Ajouter.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';

// Composant
import Input from '../../../Components/UI/Input/Input';


function Ajouter(props) {
  // STATES
  // State 1
  const [inputs, SetInputs] = useState({
    
    titre: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Titre',
        errormessage: 'Vous devez rentrer entre 5 et 20 caractères'
      },
      value: '',
      label: 'Titre',
      valid: false, 
      validation: {
        required: true,
        minlength: 5,
        maxlength: 20,
      },
      touched: false,
    },
    contenu: {
      elementType: 'textarea',
      elementConfig: {
        errormessage: 'Vous devez rentrer au moins 5 caractères',
        type: 'text',
      },
      value: '',
      label: 'Contenu',
      valid: false, 
      validation: {
        required: true,
        minlength: 5,
      },
      touched: false,
    },
    auteur: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Auteur',
        errormessage: 'Vous devez rentrer entre 5 et 20 caractères'
      },
      value: '',
      label: 'Auteur',
      valid: false, 
      validation: {
        required: true,
        minlength: 2,
      },
      touched: false, 
    },
    // email: {
    //   elementType: 'input',
    //   elementConfig: {
    //     type: 'email',
    //     placeholder: 'email@email.fr'
    //   },
    //   value: '',
    //   label: 'Email',
    //   valid: false, 
    //   validation: {
    //     required: true,
    //     isEmail: true
    //   } 
    // },
    brouillon: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: true, displayValue: 'brouillon'},
          {value: false, displayValue: 'publié'}
        ]
      },
      value: true,
      label: 'Etat',
      valid: true,
      validation: {}
    }
  });
  // State 2
  const [validForm, SetValidForm] = useState(false);

  // END STATES

  // Variables

  const formElementsArray = []; 
  for(let key in inputs) {
    formElementsArray.push({
      id: key,
      config: inputs[key]
    });
  }

  // Functions

  
  
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minlength) {
      isValid =  value.length >= rules.minlength && isValid;
    }
    if(rules.maxlength) {
      isValid = value.length <= rules.maxlength && isValid; 
    }
    // if(rules.isEmail) {
    //   isValid = validateEmail(value) && isValid;
    // }
    return isValid;
  };

  // const validateEmail = (email) => {
  //   var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   var valid = emailReg.test(email);

  //   if(!valid) {
  //       return false;
  //   } else {
  //       return true;
  //   }
  // }



  const inputChangedHandler = (e, id) => {
    let newInputs = {...inputs};
    newInputs[id].touched = true;
    newInputs[id].value = e.target.value;

    // check the value entered
    newInputs[id].valid = checkValidity(newInputs[id].value, newInputs[id].validation);
    
    SetInputs(newInputs); 

    //check form
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }
    SetValidForm(formIsValid);
  };

  // Submit form
  const formHandler = (e) => {
    e.preventDefault();

    const article = {
      titre: inputs.titre.value,
      contenu: inputs.contenu.value,
      auteur: inputs.auteur.value,
      brouillon: inputs.brouillon.value
    };
    
    // Axios send data
    axios.post('/articles.json', article)
      .then(response => {
        // redirection to the form
        props.history.replace(routes.ARTICLES);
        // Initialize State2
        SetValidForm(false);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  let form = (
    <form className={classes.Ajouter} onSubmit={(e) => formHandler(e)}>
      {formElementsArray.map(formElement => (
        <Input 
          key={formElement.id}
          id={formElement.id}
          label={formElement.config.label}
          value={formElement.config.value}
          type={formElement.config.elementType}
          config={formElement.config.elementConfig}
          changed={(e) => inputChangedHandler(e, formElement.id)}
          valid={formElement.config.valid}
          touched={formElement.config.touched}
          errormessage={formElement.config.elementConfig.errormessage}
        />
      ))
      }
      <div className={classes.submit}>
        <input type="submit" value="Ajouter un article" disabled={validForm ? '': true}/>
      </div>
    </form>
  );

  return (
    <div className="container">
      {form}    
    </div>
  )
}

export default Ajouter;