// Librairies
import React, { forwardRef, useImperativeHandle, useRef } from "react";
//import Uploader from '../../Uploader/Uploader';
import ImageUpload from '../../ImageUpload/ImageUpload';


// Composant
import classes from './Input.module.css';


function Input(props, ref) {
 
  // VARIABLES
  let reduced = "";

  //REF

  const progressRef2 = useRef();
  const imgRef2 = useRef();
  useImperativeHandle(ref, () => ({
    html: (progression) => {
      //progressRef2.current.value = progression+'%';
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
          className={inputClasses}
          value={props.value || ''}
          {...props.config}
          onChange={props.changed}
          accept=".jpg, .jpeg, .png" />
        
        {/* <ButtonUpload /> */}




        <ImageUpload urlImg={props.url.name} />  
        {/* <button onClick={props.fileUpload} disabled={props.valid ? '': true}>Upload</button> */}
        











        {/*****  PROGRESS BAR  ******/}
        <div   className={`${classes.progress}`}>
          <div ref={progressRef2} className={classes.progressBar}></div>
        </div>

        {/*****  IMAGE   ******/}
        <div className={classes.imageContainer}>
          <img ref={imgRef2} id="myimg" src={props.url || 'http://via.placeholder.com/400*150'}  alt="uploadImage" className={classes.imageSize} />
        </div>
        {/* <Uploader 
           id={props.id}
           type='file'
           className={inputClasses}
           value={props.value || ''}
           {...props.config}
           onChange={props.changed}
        /> */}
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