// Librairies
import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';

// Components 
import classes from './ProgressBar.module.css';

const ProgressBar = ({ file, id, SetInputs, inputs }) => {
  const { progress, url, createdAt } = useStorage(file);
  
  // if we have selected a file then the object image (fileImage exist cad fileImage ≠ null) in order to remove the blue upload bar we put fileImage = null so the div in the input componaant will disapear
  if(url && inputs[id].fileImage) {
    let newInputs = {...inputs};
    newInputs[id].fileImage = null;
    newInputs[id].url = url;
    newInputs[id].createdAt = createdAt;
    SetInputs(newInputs);
    console.log(createdAt);

  }
  
 
   
   
  return(
   <div className={classes.ProgressBar} style={{ width: progress + '%'}}></div>
  )
}

export default ProgressBar;