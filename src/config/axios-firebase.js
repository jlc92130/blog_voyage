import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blogvoyage-f4d0b-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;