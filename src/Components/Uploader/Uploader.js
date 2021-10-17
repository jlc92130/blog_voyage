// import uploader component
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import * as React from 'react';
import '../../App.css';

import classes from '../UI/Input/Input.module.css';

function Uploader(props) {
  let inputClasses=[];
  if(!props.valid && props.touched) {
   inputClasses.push(classes.invalid);
  }

  let inputClasses1=[];
  if(!props.valid && props.touched) {
    inputClasses1.push(classes.invalid2) 
  }
      return (      
        <UploaderComponent 
          id="uploader" 
          allowedExtensions='.jpg, .jpeg, .png, .gif' 
          maxFileSize= {2000000}
        />
      );
}

export default Uploader;