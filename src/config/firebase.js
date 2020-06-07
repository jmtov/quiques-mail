import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyDtDviJEyMD6JwxabrrSJxEcabm5z3lsNc',
  authDomain: 'quiques-mail.firebaseapp.com',
  databaseURL: 'https://quiques-mail.firebaseio.com',
  projectId: 'quiques-mail',
  storageBucket: 'quiques-mail.appspot.com',
  messagingSenderId: '722527770918',
  appId: '1:722527770918:web:716573bd9e37db7a4009e7',
  measurementId: 'G-DT9HM46B8Z'
};

firebase.initializeApp(config);

export default firebase;
