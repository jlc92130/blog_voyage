// Librairie
import React, { useRef, useState} from 'react';
import classes from './Ajouter.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import firebase, {storage} from '../../../firebase/index';
import { ZoneGeoItems } from '../../../Components/Header/Navigation/NavItems/ZoneGeoItems';

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
      cont: false,
      label: 'Titre',
      valid: false, 
      validation: {
        required: true,
        minlength: 5,
        maxlength: 20,
      },
      touched: false,
    },
    accroche: {
      elementType: 'textarea',
      elementConfig: {
        show: true,
        errormessage: 'L\'accroche ne doit pas être vide et doit contenir entre 5 et 10 caractères',
        type: 'text',
      },
      value: '',
      cont: false,

      label: 'ACCROCHE',
      valid: false, 
      validation: {
        required: true,
        minlength: 5,
        maxlength: 10,
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
      cont: false,

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
      cont: false,

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
      cont: false,

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
          {value: 'destination', displayValue: 'Destination'},
          {value: 'bonsplans', displayValue: 'Bonplans'},
          {value: 'conseils', displayValue: 'Conseils'},
        ]
      },
      label: 'RUBRIQUE',
      cont: false,

      valid: false,
      validation: {}
    },

    continent: {
      elementType: 'select',
      elementConfig: {
        isRegion: true,
        show: false,
        options: [
          {value: '0',     displayValue: 'Sectionner un champs'},
          {value: 'asie', displayValue: 'Asie'},
          {value: 'europe', displayValue: 'Europe'},
          {value: 'amerique', displayValue: 'Amerique'},
        ]
      },
      label: 'Zone Geographique',
      cont: false,
      value:'',
      valid: true,
      validation: {}
    },

    pays: {
      elementType: 'select',
      elementConfig: {
        isPays: true,
        show: false,
        options: [
          {value: '0',     displayValue: 'Sectionner un champs', continent:null},
          {value: 'chine', displayValue: 'Chine', continent:'asie'},
          {value: 'france', displayValue: 'France', continent:'europe'},
          {value: 'italie', displayValue: 'Italie', continent:'europe'},
          {value: 'pays-bas', displayValue: 'Pays-Bas', continent:'europe'},
        ]
      },
      label: 'PAYS',
      value:'',
      cont: true,
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
      cont: false,

      valid: true,
      validation: {
        required: true,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
      },
    }
  });
  // State 2
  const [validForm, SetValidForm] = useState(false);

  const [continent, setContinent] = useState();






  
  // END STATES
  
  // REF
  const progressRef =  useRef(null);

  const imgRef1 =  useRef(null);

  // VARIABLES

  const continentItems = [];
  ZoneGeoItems.forEach(continent => { 
    continentItems.push(continent.title.toLowerCase());
  });
  

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
   // id == "destination" ? newInputs[id].value = e.target.value.split(',')[0] : newInputs[id].value = e.target.value;

    
    if (id == "continent") {
      const continent = e.target.value
      setContinent(continent);
    }
   




    
  
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

    // activate or disactivate the validation of the form
    if(id == "rubrique") {
      if(e.target.value === 'destination') {
        newInputs['continent'].elementConfig.show = true
        newInputs['rubrique'].valid = true
        newInputs['rubrique'].value = 'destination'
      } 
      else if(e.target.value === 'bonsplans') {
        newInputs['rubrique'].valid = true
        newInputs['rubrique'].value = 'bonsplans'
        newInputs['continent'].value = 0
        newInputs['pays'].value = 0
        newInputs['continent'].elementConfig.show = false
        newInputs['pays'].elementConfig.show = false
        newInputs['continent'].valid = true
      } 
      else if(e.target.value === 'conseils') {
        newInputs['rubrique'].valid = true
        newInputs['rubrique'].value = 'conseils'
        newInputs['continent'].value = 0 // if we choose "conseils" we reput value to 0 then if before we choosed "destination" "italie" and after "conseils" then 
        newInputs['pays'].value = 0
        newInputs['continent'].valid = true
        newInputs['continent'].elementConfig.show = false
        newInputs['pays'].elementConfig.show = false
      } 
      else {
        newInputs['pays'].elementConfig.show = false
        newInputs['continent'].elementConfig.show = false
        newInputs['rubrique'].valid = false
      }
    }
    if(id="continent") {
      if(continentItems.includes(e.target.value)) {
        newInputs['continent'].valid = true
        newInputs['continent'].value = e.target.value
        newInputs['pays'].elementConfig.show = true
      } 
      else {
        newInputs['pays'].valid = false
      }
    }

    if(id == "pays") {
      if(e.target.value !== '0') {
        newInputs['pays'].valid = true
        newInputs['pays'].value = e.target.value
      } 
      else {
        newInputs['pays'].valid = false
      }
      //console.log(newInputs.pays.zone);
    
    }
    
     

    SetInputs(newInputs); 

    //console.log(inputs['pays'].value);
    //console.log(inputs['pays'].zone);

    //check if form is valid 
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid;
    }
    SetValidForm(formIsValid);
    
  }

  //upload image
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

    const complete = () => {
      const img = document.getElementById('myimg');
      
      storageRef.getDownloadURL().then(url => img.src = url);
      newInputs.img.urlImage = img.src;
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

  // genererate slug
  const generateSlug = (str) =>{
    
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();
    
      // remove accents, swap ñ for n, etc
      var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to   = "aaaaaeeeeiiiioooouuuunc------";
  
      for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
  
      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes
  
      return str;
  }
  

  // Submit form AJOUTER

  const formHandler = (e) => {
    e.preventDefault();
    
    const slug = generateSlug(inputs.titre.value);

    const article = {
      titre: inputs.titre.value,
      accroche: inputs.accroche.value,
      contenu: inputs.contenu.value,
      auteur: inputs.auteur.value,
      brouillon: inputs.brouillon.value,
      rubrique: inputs.rubrique.value,
      pays: inputs.pays.value,
      zone: inputs.pays.zone,
      date: Date.now(),
      image: inputs.img.urlImage,
      slug: slug,
    };

    
    
    // Axios send data
    axios.post('/articles.json', article)
      .then(response => {
        // reload the form to clean the fields
        //window.location.reload();
        props.history.replace(routes.HOME);
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
         
        <Inputt 
          key={formElement.id}
          id={formElement.id}
          continent={continent}
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