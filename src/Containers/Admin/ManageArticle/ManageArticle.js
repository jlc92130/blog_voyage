// Librairie
import React, { useRef, useState, useEffect} from 'react';
import classes from './ManageArticle.module.css';
import axios from '../../../config/axios-firebase';
import routes from '../../../config/routes';
import { ZoneGeoItems } from '../../../Components/Header/Navigation/NavItems/ZoneGeoItems';
import { checkValidity } from '../../../Shared/utility';
import { toast } from 'react-toastify';

// Composant
import Inputt from '../../../Components/UI/Input/Input';
import fire from '../../../firebase';



function ManageArticle(props) {
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
      value: props.location.state &&  props.location.state.titre ? props.location.state.titre : '',
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
      value: props.location.state ? props.location.state.accroche : '',
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
      value: props.location.state ? props.location.state.contenu : '',
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
      value: props.location.state ? props.location.state.auteur : '',
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
      value: props.location.state && props.location.state.brouillon ? props.location.state.brouillon : 'publié',
      valid: true,
      validation: {}
    },
    rubrique: {
      elementType: 'select',
      elementConfig: {
        show: true,
        defaultValue: '0',
        options: [
          {value: '0', displayValue: 'Selectionner un champs' },
          {value: 'destinations', displayValue: 'Destination'},
          {value: 'bonsplans', displayValue: 'Bonplans'},
          {value: 'conseils', displayValue: 'Conseils'},
        ]
      },
      label: 'RUBRIQUE',
      cont: false,
      value: '',
      valid: false,
      validation: {}
    },

    continent: {
      elementType: 'select',
      elementConfig: {
        isRegion: true,
        show: false,
        options: [
          {value: '0',     displayValue: 'Selectionner un champs'},
          {value: 'asie', displayValue: 'Asie'},
          {value: 'europe', displayValue: 'Europe'},
          {value: 'amerique', displayValue: 'Amerique'},
        ]
      },
      label: 'Zone Geographique',
      cont: false,
      value: '',
      valid: false,
      validation: {}
    },

    pays: {
      elementType: 'select',
      elementConfig: {
        isPays: true,
        show: false,
        options: [
          {value: '0',     displayValue: 'Selectionner un champs', continent:null},
          {value: 'chine', displayValue: 'Chine', continent:'asie'},
          {value: 'france', displayValue: 'France', continent:'europe'},
          {value: 'italie', displayValue: 'Italie', continent:'europe'},
          {value: 'pays-bas', displayValue: 'Pays-Bas', continent:'europe'},
        ]
      },
      label: 'PAYS',
      value:  '',
      cont: true,
      valid: false,
      validation: {}
    },
    
    img: {
      elementType: 'file',
      elementConfig: {
        show: 'true',
        errormessage: 'Vous devez choisir parmi ces fichier jpeg, jpg, png, gif,webp'
        //isFile: true,
      },
      value: '',
      url:'',
      createdAt:'',
      fileImage:'',
      label: 'Image',
      cont: false,
      valid: true,
      validation: {
        required: true,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'gif','webp'],
      },
    }
  });
  // State 2
  const [validForm, SetValidForm] = useState(false);
  const [continent, SetContinent] = useState();
  
  // END STATES
  
  // REF
  const progressRef =  useRef(null);


  // VARIABLES

  const continentItems = [];
  ZoneGeoItems.forEach(continent => { 
    continentItems.push(continent.title.toLowerCase());
  });
  
  useEffect(() => {
    let newInputs = {...inputs};
    if(props.location.state !== null) {
      newInputs["titre"].valid = true;  
      newInputs["accroche"].valid = true;  
      newInputs["contenu"].valid = true;    
      newInputs["auteur"].valid = true;   
      newInputs["img"].url = props.location.state.url; 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const formElementsArray = []; 
  for(let key in inputs) {
    formElementsArray.push({
      id: key,
      config: inputs[key]
    });
  }

  // Functions

  const inputChangedHandler = (e, id) => {
    let newInputs = {...inputs};
    newInputs[id].touched = true;

      newInputs[id].value = e.target.value;    

    
    if (id === "continent") {
      const continent = e.target.value
      SetContinent(continent);

      //SetInputs(newInputs[id].value = continent);
    }
   

    if(id === 'img') {
      // const arrayPath = newInputs[id].value.replaceAll('\\','/').split('/'); // slip path (/)
      //const fileName = arrayPath.pop();         // toto.jpg (in c/exem/toto.jpg)
      const fileImage = e.target.files[0];         //  Object image
      const fileName = e.target.files[0].name;     //  toto.jpg 
      const extension = fileName.split('.').pop().toLowerCase();  // JPG  -> jpg
      //const file = new File([newInputs[id].value], fileName);  other way to do 
      //SetImages(fileImage);


      let metadata;

      switch (extension) {
        case 'jpg' :
          metadata = 'image/jpeg';
          break;
        case 'png' :
          metadata = 'image/jpeg';
          break;
        case 'jpeg' :
          metadata = 'image/jpeg';
          break;
        case 'webp' :
          metadata = 'image/jpeg';
          break;
        default: 
          break;
      }
      newInputs[id].metadata = metadata; // metadata is a new props of state
      newInputs[id].extension = extension;  // extension is a new props of state
      newInputs[id].fileImage = fileImage;

      let imageURLSplit = newInputs[id].value.split('\\');
      let imageName = imageURLSplit.pop(); 
      newInputs[id].imageName = imageName;

      newInputs[id].valid = checkValidity(newInputs[id].extension, newInputs[id].validation);
    } else {
      newInputs[id].valid = checkValidity(newInputs[id].value, newInputs[id].validation);
    }

    // activate or disactivate the validation of the form
    if(id === "rubrique") {
      if(e.target.value === 'destinations') {
        newInputs['continent'].elementConfig.show = true
        newInputs['continent'].valid = false
        newInputs['rubrique'].valid = true
        newInputs['rubrique'].value = 'destinations'
        newInputs['pays'].valid = false
      } 
      else if(e.target.value === 'bonsplans') {
        newInputs['rubrique'].valid = true
        newInputs['rubrique'].value = 'bonsplans'
        newInputs['continent'].value = 0
        newInputs['continent'].valid = true
        newInputs['continent'].elementConfig.show = false
        newInputs['pays'].value = 0
        newInputs['pays'].elementConfig.show = false
        newInputs['pays'].valid = true

      } 
      else if(e.target.value === 'conseils') {
        newInputs['rubrique'].valid = true
        newInputs['rubrique'].value = 'conseils'
        newInputs['continent'].value = 0 // if we choose "conseils" we reput value to 0 then if before we choosed "destination" "italie" and after "conseils" then 
        newInputs['continent'].valid = true
        newInputs['continent'].elementConfig.show = false
        newInputs['pays'].elementConfig.show = false
        newInputs['pays'].value = 0
        newInputs['pays'].valid = true
      } 
      else {
        newInputs['pays'].elementConfig.show = false
        newInputs['continent'].elementConfig.show = false
        newInputs['rubrique'].valid = false
      }
    }
    if(id === "continent") {
      if(continentItems.includes(e.target.value)) {
        newInputs['continent'].valid = true
        newInputs['continent'].value = e.target.value
        newInputs['pays'].elementConfig.show = true
      } 
     
    }

    if(id === "pays") {
      if(e.target.value !== '0') {
        newInputs['pays'].valid = true
        newInputs['pays'].value = e.target.value
      } 
     
    }
    
     

    SetInputs(newInputs); 

    //check if form is valid 
    let formIsValid = true;
    for (let input in newInputs) {
      formIsValid = newInputs[input].valid && formIsValid
    }
    SetValidForm(formIsValid);
  } 



  

  // genererate slug  code from github
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
    
    //we create the slug from the title
    const slug = generateSlug(inputs.titre.value);

    
    
    const article = {
      titre: inputs.titre.value,
      accroche: inputs.accroche.value,
      contenu: inputs.contenu.value,
      auteur: inputs.auteur.value,
      brouillon: inputs.brouillon.value,
      rubrique: inputs.rubrique.value,
      pays: inputs.pays.value,
      continent: inputs.continent.value,
      date: Date.now(),
      createdAt: inputs.img.createdAt,
      slug: slug,
      url: inputs.img.url,
      imageName: inputs.img.imageName
    };

    fire.auth().currentUser.getIdToken()   // In DB user can only modify if they are connected, if the user is connected he has a token
        .then(token => {
          if(props.location.state) { // article exist => we use PUT method to modify DB
            // Axios send the article in DB
            axios.put('/articles/' + props.location.state.id + '.json?auth=' + token, article) // firebase need to know if we are connected => we need token (only authentified user have "write" permission in firebase)
            .then(response => {
              toast('article modifié');
              // reload the form to clean the fields
              //window.location.reload();
              props.history.replace(routes.HOME);
              // Initialize State2
              SetValidForm(false);
            })
            .catch(error => {
              console.log(error);
            });
         } else {
           // article do not exist => we use "post" request to create the article in DB
           axios.post('/articles.json?auth=' + token, article)
           .then(response => {
             // reload the form to clean the fields
             //window.location.reload();
             //props.history.replace(routes.HOME);
             // Initialize State2
             SetValidForm(false);
           })
           .catch(error => {
             console.log(error);
           });
         }
        });
  }
  
  let form = (
    <form className={classes.ManageArticle} onSubmit={(e) => formHandler(e)}>
       
      {formElementsArray.map( formElement => (
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
          //fileUpload={(e) => handleUpload(e)}
          fileImage = {formElement.config.fileImage}
          url= {formElement.config.url}
          SetInputs={SetInputs}
          inputs={inputs}
          ref = {progressRef}
        />
      ))
      }

      <div className={classes.submit}>
        <input type="submit" value={props.location.state ? "Modifier" : "Ajouter"} disabled={validForm ? false : true}/>
      </div>
    </form>
  );

  return (
    <div className="container">
      {form}    
    </div>
  )
}

export default ManageArticle;