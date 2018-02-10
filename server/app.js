const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const firebase = require('firebase');
const bodyParser = require('body-parser');
var serviceAccount = require('snapp-key.json');

const app = express();
app.use(bodyParser.json());

const PORT = 8080;


// var config = {
// 	apiKey: "AIzaSyDb7pzdnEJJlClx4-enDHkTJR81yDg3HVs",
// 	authDomain: "snapp-c0271.firebaseapp.com",
// 	databaseURL: "https://snapp-c0271.firebaseio.com",
// 	projectId: "snapp-c0271",
// 	storageBucket: "snapp-c0271.appspot.com",
// 	messagingSenderId: "702539875760"
// };

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

var database = admin.firestore();

/**
 * Main Back-End server for SNAPP
 * This server handles RESTful API calls to the server
 */

// For these Express fuctions, "req" is the body of the Request, and "res" is the body of the response
app.post('/request', function(req, res) {
	// This function handles a POST request made to snap.wpi.edu/request
	// So we can parse the request body "req", create a Ride Request obejct from that data
	// and add that to the database using the Firebase API
	// Then we send an "OK" response in "res"
	console.log("Received POST request");
	addRide(req.body,res).then((status) => {
		res.status(status);
		res.send("OK");
	});
	
});

app.get('/request', function(req, res)  {
	// This function handles a GET request made to snap.wpi.edu/request
	// So we get all of the request obejcts from Firebase and returns them in "res"
	console.log("Received GET request");
	rides = getAllRides().then((rides) => {
		console.log("getAllRides() Returned a value: " + rides);
		res.json = rides;
		res.status(200);
		res.send(JSON.stringify(rides));
	});
	

});

app.get('/request/:requestID', function(req, res)  {
	// This function handles a GET request for a specific request, based on its ID
	// The format will be snap.wpi.edu/request/12345
	// So we get the request object with the corresponding ID and return them in "res"
	console.log("Received GET request for ride with ID " + req.params.requestID);
	ride = getSpecificRide(req.params.requestID).then((ride) => {
		console.log("getSpecificRide() returned");
		res.status(200);
		res.send(JSON.stringify(ride));
	});
});

app.post('/request/:requestID', function(req, res)  {
	// This function handles a POSTE request for a specific Ride Request, based on its ID
	// So we get the request object with the corresponding ID and update the appropriate field based
	// on the data passed in "req"
	console.log("Received update request for ride with ID " + req.params.requestID);
	updateRide(req.params.requestID, req).then((status) => {
		res.status(status);
		res.send("OK");
	});
	

});

app.delete('/request/:requestID', function(req, res)  {
	// This function handles a DELETE request for a specific Ride Request, based on its ID
	// So we get the request object with the corresponding ID and update the appropriate field based
	// on the data passed in "req"
	// Note: We might not need to support this functionality?
	deleteRide(req.params.requestID).then((status => {
		res.status(status);
		res.send("OK");
	}));
});

app.listen(PORT); // Listen to server calls on the appropriate port number

console.log("Server listening on Port " + PORT);

//add a ride to the database under all rides and ride queue
function addRide(req, res){
	//parse and get all the information for the ride
	var post = req
	var accom = post.accomodations;
	var addr = post.address;
	var id = post.id; //TODO: Generate ID
	var pas = post.passengers;
	var stat = post.status;

	// Data for the All Rides table
	var allRidesData = {
			Accomodations: accom,
			Address: addr,
			Date: Date.now(),
			ID: id,
			Passengers: pas,
			Status: stat
		};
	
	
	//add ride to all rides collection
	var docRef = database.collection('allRides/').doc('ride' + id).set(allRidesData);
	var numberOfRides = 0;
	var rides = [];
	//add ride to ride queue with minimal info
	return database.collection('rideQueue').get().then((snapshot) => {
		console.log("Requesting All Rides");
		snapshot.forEach((doc) => {
			console.log("Doc: " + doc);
        	//document name
        	var key = doc.id;
        	//document data
        	var data = doc.data();

        	rideData = {"ride number": key, "ride data": data};
        	console.log("Found ride w/ data: " + rideData + " and id: " + key);

		    //add ride to list
		    rides.push(rideData);

		})
		console.log("Finished getAllRides()");
		numberOfRides = rides.length + 1;
		var queueData = {
			ID: id,
			QueuePosition: numberOfRides
		};
		var queueRef = database.collection('rideQueue/').doc('ride' + id).set(queueData);	
		return(200);

	});




}

//gets all rides
function getAllRides(){
	//list of all rides
	var rides = []
	console.log("Calling getAllRides()");
	return database.collection('allRides').get().then((snapshot) => {
		console.log("Requesting All Rides");
		snapshot.forEach((doc) => {
			console.log("Doc: " + doc);
        	//document name
        	var key = doc.id;
        	//document data
        	var data = doc.data();

        	rideData = {"ride number": key, "ride data": data};
        	console.log("Found ride w/ data: " + rideData + " and id: " + key);

		    //add ride to list
		    rides.push(rideData);

		})
		console.log("Finished getAllRides()");
		return rides;

	});
	
}

//gets specific ride
function getSpecificRide(requestID){

	var ride;
	return database.collection('allRides').doc(requestID).get().then(doc => {
		if(!doc.exists) {
			console.log("No RideRequest with id " + requestID);
		} else {
			return doc.data();
		}
	});
	
}



//gets ride queue
function getRideQueue(){
	//list of all rides
	var rides = []

	var docRef = database.ref('rideQueue/');

	//Get rides from allRides Collection
	var allRides = docRef.get().then(snapshot => {
		snapshot.forEach(doc => {
	        	//document name
	        	var key = doc.id;
	        	//document data
	        	var data = doc.data();

	        	rideData = {"ride number": key, "ride data": childData};

			    //add ride to list
			    rides.push(rideData);
			});
	}).catch(err => {
		console.log('Error getting documents', err);
	});

	//returns list of all rides
	return rides;
}

// Update a specific ride defined by requestID
function updateRide(requestID, req){
	var rideRef = database.collection('allRides').doc(requestID);
	return rideRef.update(req.body).then(response => {
		return 200;
	});
}
//delete a ride to the database under ride queue
function deleteRide(requestID){

	var rideRef = database.collection('allRides').doc(requestID);
	return rideRef.delete().then(response => {
		return 200;
	});
	
}

