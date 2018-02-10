import * as firebase from 'firebase'


export const init = () => {
  const config = {
    apiKey: "AIzaSyDb7pzdnEJJlClx4-enDHkTJR81yDg3HVs",
    authDomain: "snapp-c0271.firebaseapp.com",
    databaseURL: "https://snapp-c0271.firebaseio.com",
    projectId: "snapp-c0271",
    storageBucket: "snapp-c0271.appspot.com",
    messagingSenderId: "702539875760"
  };
  firebase.initializeApp(config);
}