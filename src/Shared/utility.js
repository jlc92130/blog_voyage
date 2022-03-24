export const checkValidity = (value, rules) => {
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
    if(rules.email) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid;     
    }
    // if(rules.isEmail) {
    //   isValid = validateEmail(value) && isValid;
    // }
    return isValid;
  };


   