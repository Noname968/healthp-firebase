import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArEmG42hVSjGMM56cj3uDuxsGM6UPwJKg",
  authDomain: "healthp-firebase.firebaseapp.com",
  projectId: "healthp-firebase",
  storageBucket: "healthp-firebase.appspot.com",
  messagingSenderId: "262436212426",
  appId: "1:262436212426:web:d5bc01b4cbff4bcb64ee33"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();