// Librairie
import React, { useRef, useState} from 'react';
import classes from './Ajouter.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import firebase, {storage} from '../../../firebase/index';

// Composant
import Inputt from '../../../Components/UI/Input/Input';



function Ajouter(props) {
  // STATES
  // State 1
  const [inputs, SetInputs] = useState({
    
    titre: {
      elementType: 'input',
      elementConfig: {
        show: true,
        type: 'text',
        placeholder: 'Titre',
        errormessage: 'Vous devez rentrer entre 5 et 20 caractères'
      },
      value: '',
      label: 'Titre',
      valid: false, 
      validation: {
        required: true,
        minlength: 5,
        maxlength: 20,
      },
      touched: false,
    },
    contenu: {
      elementType: 'textarea',
      elementConfig: {
        show: true,
        errormessage: 'Vous devez rentrer au moins 5 caractères',
        type: 'text',
      },
      value: '',
      label: 'Contenu',
      valid: false, 
      validation: {
        required: true,
        minlength: 5,
      },
      touched: false,
    },
    auteur: {
      elementType: 'input',
      elementConfig: {
        show: true,
        type: 'text',
        placeholder: 'Auteur',
        errormessage: 'Vous devez rentrer entre 5 et 20 caractères'
      },
      value: '',
      label: 'Auteur',
      valid: false, 
      validation: {
        required: true,
        minlength: 2,
      },
      touched: false, 
    },
    // email: {
    //   elementType: 'input',
    //   elementConfig: {
    //     type: 'email',
    //     placeholder: 'email@email.fr'
    //   },
    //   value: '',
    //   label: 'Email',
    //   valid: false, 
    //   validation: {
    //     required: true,
    //     isEmail: true
    //   } 
    // },
    brouillon: {
      elementType: 'select',
      elementConfig: {
        show: true,
        options: [
          {value: true, displayValue: 'brouillon'},
          {value: false, displayValue: 'publié'}
        ]
      },
       
      label: 'Etat',
      valid: true,
      validation: {}
    },
    rubrique: {
      elementType: 'select',
      elementConfig: {
        show: true,
        defaultValue: '0',
        options: [
          {value: '0', displayValue: 'Sectionner un champs' },
          {value: 'Destinations', displayValue: 'Destinations'},
        ]
      },
      
      label: 'RUBRIQUE',
      valid: false,
      validation: {}
    },
    pays: {
      elementType: 'select',
      elementConfig: {
        isPays: true,
        show: false,
        options: [
          {value: 'chine', displayValue: 'Chine'},
          {value: 'france', displayValue: 'France'},
          {value: 'italie', displayValue: 'Italie'},
          {value: 'pays-bas', displayValue: 'Pays-Bas'},
        ]
      },
       
      label: 'PAYS',
      valid: true,
      validation: {}
    },
    img: {
      elementType: 'file',
      elementConfig: {
        show: 'true',
        errormessage: 'Vous devez choisir parmi ces fichier jpeg, jpg, png, gif'
        //isFile: true,
      },
      value: '',
      urlImage:'',
      file:'',
      label: 'Image',
      valid: true,
      validation: {
        required: true,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
      },
    }
  });
  // State 2
  const [validForm, SetValidForm] = useState(false);


  // Ref
  const progressRef =  useRef(null);

  const imgRef1 =  useRef(null);

   
  // END STATES
  

  // Variables

  const formElementsArray = []; 
  for(let key in inputs) {
    formElementsArray.push({
      id: key,
      config: inputs[key]
    });
  }

  // Functions
  
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.minlength) {
      isValid =  value.length >= rules.minlength && isValid;
    }
    if(rules.maxlength) {
      isValid = value.length <= rules.maxlength && isValid; 
    }
    if(rules.allowedExtensions) {
      isValid = rules.allowedExtensions.includes(value) && isValid;
    }
    // if(rules.isEmail) {
    //   isValid = validateEmail(value) && isValid;
    // }
    return isValid;
  };

   

   

  // const validateEmail = (email) => {
  //   var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   var valid = emailReg.test(email);

  //   if(!valid) {
  //       return false;
  //   } else {
  //       return true;
  //   }
  // }



  const inputChangedHandler = (e, id) => {
    let newInputs = {...inputs};
    newInputs[id].touched = true;
    //newInputs[id].value = e.target.files[0].name;
    
      newInputs[id].value = e.target.value;
    

  
    if(id == 'img') {
      // const arrayPath = newInputs[id].value.replaceAll('\\','/').split('/'); // slip path (/)
      // const fileName = arrayPath.pop();         // toto.jpg (in c/exem/toto.jpg)
      const file = e.target.files[0];
      const fileName = e.target.files[0].name     //  toto.jpg (in c/exem/toto.jpg)
      const extension = fileName.split('.').pop().toLowerCase();  // JPG  -> jpg
      //const file = new File([newInputs[id].value], fileName);  other way to do 

      let metadata;

      switch (extension) {
        case 'jpg' :
          metadata = 'image/jpeg';
          break;
        case 'png' :
          metadata = 'image/jpeg';
          break;
        case 'jpeg' :
          metadata = 'text/plain';
          break;
        default: 
          break;
      }
      newInputs[id].metadata = metadata; // metadata is a new props of state
      newInputs[id].extension = extension;
     // newInputs[id].value = fileName;
      newInputs[id].file = file;

      newInputs[id].valid = checkValidity(newInputs[id].extension, newInputs[id].validation);
    } else {
      newInputs[id].valid = checkValidity(newInputs[id].value, newInputs[id].validation);
    }

    if(id == "rubrique") {
      if(e.target.value === 'Destinations') {
        newInputs['pays'].elementConfig.show = true
        newInputs['rubrique'].valid = true
      } 
      else {
        newInputs['pays'].elementConfig.show = false
        newInputs['rubrique'].valid = false
      }
    }

      

    SetInputs(newInputs); 

    //check form
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }
    SetValidForm(formIsValid);
  }

  const handleUpload =   (e) => {
    e.preventDefault();
    
    let newInputs = {...inputs};
    let date = Date.now();
    let newName = newInputs.img.file.name + "_" + date;
    var storageRef = storage.ref(`images/${newName}`); //   images/toto_01022021.jpg
    // upload the image in firebase
    var uploadTask =  storageRef.put(newInputs.img.file, {contentType: newInputs.img.metadata});
    
    
    /******* PROGRESS BAR   *********/
    const next = (snapshot) => {       
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;    
      progressRef.current.html(Math.round(percentage));
    };

    const error = (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          console.log('User has no permission')  
          break;
        case 'storage/canceled':
          console.log('User was cancelled')  
          break;
        case 'storage/unknown':
          console.log(error);
          break;
        default:
          break;
      }
    };

    const complete = async () => {
      const img = document.getElementById('myimg');
      
      storageRef.getDownloadURL().then(url => img.src = url);
      // We put the url in the state
      await (function () {
        const url = img.src;
        newInputs.img.urlImage = url;
      })();
    };
      

    

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, {
        'next': next,
        'error': error,
        'complete': complete,
      });
    
      
      
      // function() {
      //   storage.ref('images').child(newName).getDownloadURL().then(url => {   // images is the repository name in Storage Firebase
      //     // url is the url of image in firebase storage
      //     inputs.img.firebaseUrl = url;
      //   })
      // },
    
   
   SetInputs(newInputs); 
  }

  // Submit form
  const formHandler = (e) => {
    e.preventDefault();

    const article = {
      titre: inputs.titre.value,
      contenu: inputs.contenu.value,
      auteur: inputs.auteur.value,
      brouillon: inputs.brouillon.value,
      image: inputs.img.urlImage
    };
    
    // Axios send data
    axios.post('/articles.json', article)
      .then(response => {
        // redirection to the form
        props.history.replace(routes.AJOUTER);
        // Initialize State2
        SetValidForm(false);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  let form = (
    <form className={classes.Ajouter} onSubmit={(e) => formHandler(e)}>
      
      {formElementsArray.map( formElement => (
        <>
         {console.log(formElement.config)}
        <Inputt 
          key={formElement.id}
          id={formElement.id}
          label={formElement.config.label}
          value={formElement.config.value}
          type={formElement.config.elementType}
          config={formElement.config.elementConfig}
          changed={(e) => inputChangedHandler(e, formElement.id)}
          valid={formElement.config.valid}
          touched={formElement.config.touched}
          show={formElement.config.elementConfig.show}
          errormessage={formElement.config.elementConfig.errormessage}
          isPays={formElement.config.elementConfig.isPays}
          fileUpload={(e) => handleUpload(e)}
          url = {formElement.config.urlImage}
          ref = {progressRef}
          //url = {inputEl.current}
        />
        </>
      ))
      }

      <div className={classes.submit}>
        <input type="submit" value="Ajouter un article" disabled={validForm ? false : true}/>
      </div>
    </form>
  );

  return (
    <div className="container">
      {form}    
    </div>
  )
}

export default Ajouter;