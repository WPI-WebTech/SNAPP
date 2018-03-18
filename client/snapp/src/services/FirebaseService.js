import * as firebase from 'firebase'
import '@firebase/firestore'
import { rideStatus } from '../constants'

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
        .collection('ApprovalQueue')
        .add(ride)
        .then(docRef => {
            return {
                ...docRef.get(),
                ...{ id: docRef.id },
                ...{ status: rideStatus.REQUESTED }
            }
        })
}

export const cancelRideOnServer = rideId => {
    return database
        .collection('ApprovalQueue')
        .doc(rideId)
        .update({ status: rideStatus.CANCELLED })
}