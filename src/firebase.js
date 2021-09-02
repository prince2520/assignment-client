import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBx2LMS9v6WzgSBxUAkMltoVJ6jQKUHcYE",
    authDomain: "assignment-3e3ac.firebaseapp.com",
    projectId: "assignment-3e3ac",
    storageBucket: "assignment-3e3ac.appspot.com",
    messagingSenderId: "630312698781",
    appId: "1:630312698781:web:56efd3d550421fdaa8a574",
    measurementId: "G-LDYFDH4REQ"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default}
