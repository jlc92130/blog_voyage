// Librairies
import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';

// Components 
import classes from './ProgressBar.module.css';

const ProgressBar = ({ file, SetInputs, inputs }) => {
  const { progress, url } = useStorage(file);
  console.log(url, progress)
  
   
   
  return(
   <div className={classes.ProgressBar} style={{ width: progress + '%'}}></div>
  )
}

export default ProgressBar;