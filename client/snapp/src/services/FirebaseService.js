import * as firebase from 'firebase'
import '@firebase/firestore'

let database;

export const init = () => {
    const config = {
        apiKey: "AIzaSyDb7pzdnEJJlClx4-enDHkTJR81yDg3HVs",
        authDomain: "snapp-c0271.firebaseapp.com",
        databaseURL: "https://snapp-c0271.firebaseio.com",
        projectId: "snapp-c0271",
        storageBucket: "snapp-c0271.appspot.com",
        messagingSenderId: "702539875760"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
        database = firebase.firestore();
    }
}

export const addRideRequest = ride => {
    return database
        .collection('allRides')
        .add(ride)
}