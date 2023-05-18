import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// original
// const firebaseConfig = {
//   apiKey: "AIzaSyArEmG42hVSjGMM56cj3uDuxsGM6UPwJKg",
//   authDomain: "healthp-firebase.firebaseapp.com",
//   projectId: "healthp-firebase",
//   storageBucket: "healthp-firebase.appspot.com",
//   messagingSenderId: "262436212426",
//   appId: "1:262436212426:web:d5bc01b4cbff4bcb64ee33"
// };

// dummy
// const firebaseConfig = {
//   apiKey: "AIzaSyDmjWOT88Eso0C1o75zAmNKIe7u9bBRBKY",
//   authDomain: "dummy-ab459.firebaseapp.com",
//   projectId: "dummy-ab459",
//   storageBucket: "dummy-ab459.appspot.com",
//   messagingSenderId: "592474783500",
//   appId: "1:592474783500:web:634f14a96ab78b624d5329",
//   measurementId: "G-XYZWWV3SDJ"
// };


// geekforgeeks
const firebaseConfig = {
  apiKey: "AIzaSyAwABBBoXRBD6__Ul67cYFbLQgBqYmSup4",
  authDomain: "health-386705.firebaseapp.com",
  projectId: "health-386705",
  storageBucket: "health-386705.appspot.com",
  messagingSenderId: "829781897477",
  appId: "1:829781897477:web:2c968c319206c1a641076c"
};



firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();