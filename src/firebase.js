import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBReRSWkbqrilPAsh-Le6eekisNGjZrXr4",
    authDomain: "fund-my-musician.firebaseapp.com",
    databaseURL: "https://fund-my-musician.firebaseio.com",
    projectId: "fund-my-musician",
    storageBucket: "fund-my-musician.appspot.com",
    messagingSenderId: "75444328381",
    appId: "1:75444328381:web:1163a088f10d83fe0524d4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };