import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyCiHBnFs7V5cb62HEL0tVFjAj3UnbSIOWw",
  authDomain: "login-auth-5e306.firebaseapp.com",
  databaseURL:
    "https://login-auth-5e306-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "login-auth-5e306",
  storageBucket: "login-auth-5e306.appspot.com",
  messagingSenderId: "3776134169",
  appId: "1:3776134169:web:a0bb36e8971a72cfdafe88",
  measurementId: "G-6JZ1HGXE56",
};
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
