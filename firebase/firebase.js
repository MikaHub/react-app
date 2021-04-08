import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBvJ5uamAem2Fcsgq3_8blappt0wKwSXzk",
    authDomain: "react-app-d9599.firebaseapp.com",
    projectId: "react-app-d9599",
    storageBucket: "react-app-d9599.appspot.com",
    messagingSenderId: "894694021141",
    appId: "1:894694021141:web:2ba042b714c40271f7561c",
    measurementId: "G-HST1QL7ZLF"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default {
  firebase,
  db,
}