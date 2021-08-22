// Librairies
import React from "react";

// Composant
import classes from './Input.module.css';


function Input(props) {
  
  let inputElement;
  switch (props.type) {
    case 'input':
      inputElement = (<input 
        id={props.id}
        value={props.value}
        {...props.config}
        onChange={props.changed} />
      ) 
    break;
    case 'textarea':
      inputElement = (<textarea value={props.value} id={props.id} onChange={props.changed} />)
    break;
    case 'select':
      inputElement = (
        <select value={props.value} id={props.id} onChange={props.changed}>
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
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}    
    </div>
  );
}

export default Input;