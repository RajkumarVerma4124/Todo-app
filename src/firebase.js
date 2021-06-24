import firebase from 'firebase';

const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyDXaPu70uMAMfViGzuf1PQ3wAzR-jC2HVk",
  authDomain: "todo-app-cp-c863e.firebaseapp.com",
  projectId: "todo-app-cp-c863e",
  storageBucket: "todo-app-cp-c863e.appspot.com",
  messagingSenderId: "191411112219",
  appId: "1:191411112219:web:2fd2c1cb3b403714cc2bbe",
  measurementId: "G-5V7256H28F"
});

const db = firebaseApp.firestore();

export default db 