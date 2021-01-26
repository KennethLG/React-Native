import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyB7uDfUkSEJgQ2_NxPaCaha0ko-92p449U',
  authDomain: 'react-native-d2dbf.firebaseapp.com',
  projectId: 'react-native-d2dbf',
  storageBucket: 'react-native-d2dbf.appspot.com',
  messagingSenderId: '211392170746',
  appId: '1:211392170746:web:2d1f336592b1c10c6f1743',
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
  firebase,
  db
};
