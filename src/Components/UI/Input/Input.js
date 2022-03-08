// Librairies
import React, { forwardRef, useImperativeHandle, useRef } from "react";
//import Uploader from '../../Uploader/Uploader';
import ProgressBar  from "../../ProgressBar/ProgressBar";


// Composant
import classes from './Input.module.css';


function Input(props, ref) {
 
  // VARIABLES
  let reduced = "";

  //REF

  const progressRef2 = useRef();

  useImperativeHandle(ref, () => ({
    html: (progression) => {
      progressRef2.current.style.width = progression+'%';
    }
  }));

  



  // display only the countries that match with the continent using a filter using reduce's function
  // we map the tab "options" in the state where the id="pays" we return the table "filtered"
  if(props.id === "pays") {
     reduced = props.config.options.reduce(function(filtered, option) {
      
      if (option.continent === props.continent) {
         var someNewValue =  option.value;
         filtered.push(someNewValue);
      }
      return filtered;
    }, []);
    reduced.unshift("Selectionner un champs"); // add the filed "Selectionner un champs" to the beggining our reduced table
  }
  

  let inputClasses=[];
  if(!props.valid && props.touched) {
   inputClasses.push(classes.invalid);
  }

  let inputClasses1=[];
  if(!props.valid && props.touched) {
    inputClasses1.push(classes.invalid2) 
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
        
        props.id === "pays" ?
        
        <select  id={props.id}  onChange={props.changed} defaultValue={props.config.defaultValue} value={props.value}>
          {reduced.map( option => (                      
            <option key={option}  value={option}>
              {option}
            </option>  
          ))}
        </select>
        :
        <select  id={props.id}  onChange={props.changed} defaultValue={props.config.defaultValue} value={props.value}>
          {props.config.options.map( option => (
            <option key={option.value}  value={option.value}>
              {option.displayValue}
            </option>  
          ))}
        </select>
        
      )
    break;
    case 'file':
      inputElement = (
        <>
        
        <input 
          id={props.id}
          type='file'
          multiple
          className={inputClasses}
          value={props.value || ''}
          {...props.config}
          onChange={props.changed}
          />
        {/* <button onClick={props.fileUpload} disabled={props.valid ? true : false}>Upload</button> */}
        
        </>
        
      )
    break;
    default: return null;
  }

  let errormessage;
  if (props.touched && !props.valid){
    errormessage = <span className={inputClasses1}>{props.errormessage}</span>;
  }


  const displayValue = props.show ? 'block' : 'none';
  
  return (
    // props.show ?
    <div className={classes.Input}  style={{display: displayValue }} >
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
      {/* div is displayed if props.valid is true */}
        { props.fileImage && props.valid  &&  <div>{props.fileImage.name}</div>}
      {/* component ProgressBar is called if props.valid is true */}
      { props.fileImage && props.valid && <ProgressBar file={props.fileImage} id={props.id} SetInputs={props.SetInputs} inputs={props.inputs} /> }
      
       
      {errormessage} 
    </div>
    // :
    // <div className={classes.Input}  style={{display: displayValue }} >
    //   <label htmlFor={props.id}>{props.label}</label>
    //   {inputElement}
    //   {errormessage} 
    // </div>
  );
}

const InputWithRef = forwardRef(Input);
export default InputWithRef;