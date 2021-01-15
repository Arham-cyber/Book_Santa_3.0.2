import firebase from 'firebase';
require ('@firebase/firestore')
var firebaseConfig = {
  apiKey: "AIzaSyCRt30r6ia2iaXnTRENTFYsIFZ2wgQOTpM",
  authDomain: "book-santa-3-980ae.firebaseapp.com",
  databaseURL: "https://book-santa-3-980ae-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "book-santa-3-980ae",
  storageBucket: "book-santa-3-980ae.appspot.com",
  messagingSenderId: "764729036136",
  appId: "1:764729036136:web:59ad2550bcaaed95a09add"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();