// Librairie
import React, { useState} from 'react';
import classes from './Ajouter.module.css';

// Composant
import Input from '../../../Components/UI/Input/Input';


function Ajouter() {
  
  const [inputs, SetInputs] = useState({
    // State
    titre: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Titre',
      },
      value: '',
      label: 'Titre',
      valid: false, 
      validation: {
        required: true,
        minlength: 5,
        maxlength: 20,
      } 
    },
    contenu: {
      elementType: 'textarea',
      elementConfig: {},
      value: '',
      label: 'Contenu',
      valid: false, 
      validation: {
        required: true,
      } 
    },
    auteur: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Auteur'
      },
      value: '',
      label: 'Auteur',
      valid: false, 
      validation: {
        required: true,
        minlength: 2,
      } 
    },
    etat: {
      elementType: 'select',
      elementConfig: {
        options: [
          {value: true, displayValue: 'brouillon'},
          {value: false, displayValue: 'publié'}
        ]
      },
      value: '',
      label: 'Etat',
      valid: false
    }
  });

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
    return isValid;
  };

  const inputChangedHandler = (e, id) => {
    let newInputs = {...inputs};
    newInputs[id].value = e.target.value;

    // check the value entered
    newInputs[id].valid = checkValidity(newInputs[id].value, newInputs[id].validation);
    
    SetInputs(newInputs); 
  };

  const formHandler = (e) => {
    e.preventDefault();
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
        />
      ))
      }
      <div className={classes.submit}>
        <input type="submit" value="Ajouter un article" />
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