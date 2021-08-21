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
      label: 'Titre'
    },
    contenu: {
      elementType: 'textarea',
      elementConfig: {},
      value: '',
      label: 'Contenu'
    },
    auteur: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Auteur'
      },
      value: '',
      label: 'Auteur'
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
      label: 'Etat'
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

  
  let form = (
    <form className={classes.Ajouter}>
      {formElementsArray.map(formElement => (
        <Input 
          key={formElement.id}
          label={formElement.config.label}
          value={formElement.config.value}
          type={formElement.config.elementType}
          config={formElement.config.elementConfig}
        />
      ))
      }
      <input className={classes.submit} type="submit" value="envoyer" />
    </form>
  );

  return (
    <div className="container">
      {form}    
    </div>
  )
}

export default Ajouter;