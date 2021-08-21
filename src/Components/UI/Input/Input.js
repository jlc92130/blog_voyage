// Librairies
import React from "react";

// Composant
import classes from './Input.module.css';


function Input(props) {
  
  let inputElement;
  switch (props.type) {
    case 'input':
      inputElement = (<input 
        value={props.value}
        {...props.config} />
      ) 
    break;
    case 'textarea':
      inputElement = (<textarea 
        value={props.value}
        /> 
      )
    break;
    case 'select':
      inputElement = (
        <select value={props.value}>
          {props.config.options.map( option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
    break;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {inputElement}    
    </div>
  );
}

export default Input;