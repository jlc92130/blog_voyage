// Librairies
import React from "react";

// Composant
import classes from './Input.module.css';


function Input(props) {

  let inputClasses=[];
  if(!props.valid && props.touched) {
    inputClasses.push(classes.invalid);
  }
 
  
  let inputElement;
  switch (props.type) {
    case 'input':
      inputElement = (<input 
        id={props.id}
        className={inputClasses}
        value={props.value}
        {...props.config}
        onChange={props.changed} />
      ) 
    break;
    case 'textarea':
      inputElement = (<textarea value={props.value} className={inputClasses} id={props.id} onChange={props.changed} />)
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

  let errormessage;
  if (props.touched && !props.valid){
    errormessage = <span>{props.errormessage}</span>;
  }

  return (
    <div className={classes.Input}>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {errormessage} 
    </div>
  );
}

export default Input;