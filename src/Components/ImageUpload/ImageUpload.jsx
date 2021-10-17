import React, {useImperativeHandle, useRef} from "react";

// Composant
import classes from '../UI/Input/Input.module.css';


function ImageUpload(props, ref) {

  const progressRef2 = useRef();

  useImperativeHandle(ref, () => ({
    html: (progression) => {
      console.log(progression);
      progressRef2.current.value = progression+'%';
      
      progressRef2.current.style.width = progression+'%';
      
    }
  }));

  return (
    <>
      <button onClick={props.fileUpload} disabled={props.valid ? '': true}>Upload</button>
      <div   className={`${classes.progress}`}>
        <div ref={progressRef2} className={classes.progressBar}></div>
      </div>
      <div className="uploadImage">
        <img src=""  alt="uploadImage" className={classes.imageContainer} />
      </div>
    </>
  );
  }
  export default ImageUpload;