import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3fPb57i3SJYRbPnDjLBziFxpN0B-B6_s",
  authDomain: "blogvoyage-f4d0b.firebaseapp.com",
  databaseURL: "https://blogvoyage-f4d0b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blogvoyage-f4d0b",
  storageBucket: "blogvoyage-f4d0b.appspot.com",
  messagingSenderId: "175096884889",
  appId: "1:175096884889:web:6c485679a0b46cb822d208"
};

firebase.initializeApp(firebaseConfig);



export const storage = firebase.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
//export const projectFirestore = firebase.firestore();

export default firebase;

 