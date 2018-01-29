const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

const app = express();

const PORT = 8080;


var config = {
	apiKey: "AIzaSyDb7pzdnEJJlClx4-enDHkTJR81yDg3HVs",
	authDomain: "snapp-c0271.firebaseapp.com",
	databaseURL: "https://snapp-c0271.firebaseio.com",
	projectId: "snapp-c0271",
	storageBucket: "snapp-c0271.appspot.com",
	messagingSenderId: "702539875760"
};
  
firebase.initializeApp(config);

var database = admin.firebase;

/**
 * Main Back-End server for SNAPP
 * This server handles RESTful API calls to the server
 */

// For these Express fuctions, "req" is the body of the Request, and "res" is the body of the response
app.post('/request', function(req, res) => {
	// This function handles a POST request made to snap.wpi.edu/request
	// So we can parse the request body "req", create a Ride Request obejct from that data
	// and add that to the database using the Firebase API
	// Then we send an "OK" response in "res"

});

app.get('/request', function(req, res) => {
	// This function handles a GET request made to snap.wpi.edu/request
	// So we get all of the request obejcts from Firebase and returns them in "res"

});

app.get('/request/:requestID', function(req, res) => {
	// This function handles a GET request for a specific request, based on its ID
	// The format will be snap.wpi.edu/request/12345
	// So we get the request object with the corresponding ID and return them in "res"

});

app.update('/request/:requestID', function(req, res) => {
	// This function handles an UPDATE request for a specific Ride Request, based on its ID
	// So we get the request object with the corresponding ID and update the appropriate field based
	// on the data passed in "req"

});

app.delete('/request/:requestID', function(req, res) => {
	// This function handles a DELETE request for a specific Ride Request, based on its ID
	// So we get the request object with the corresponding ID and update the appropriate field based
	// on the data passed in "req"
	// Note: We might not need to support this functionality?
	
}

app.listen(PORT); // Listen to server calls on the appropriate port number



//add a ride to the database under all rides
function addRide(req, res){

	var body = '';
	req.on('data', function (data) {
		body += data;
		if (body.length > 1e6) {
		  req.connection.destroy();
		}
	});
	req.on('end', function () {
		//parse and get all the information for the ride
		var post = qs.parse(body);
		var accom = post.accomodations;
		var addr = post.address;
		var id = post.id;
		var pas = post.passengers;
		var stat = post.status;

		//get date
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var hours = date.getHours();
		var min = date.getMinutes();
		

		var docRef = database.collection('allRides/');
		docRef.once("value").then(function(snapshot) {
			//set all the information into one json
			var data = {
				Accomodations: accom,
				Address: addr,
				Data: hours + ":" + minutes + " " + month + "/" + day + "/" + year,
				ID: id,
				Passengers: pas,
				status: stat
			};

			//create new document name number
			rideNum = snapshot.numChildren()+1;

			//creates new document with unique name and add the data for the ride
			db.collection('allRides/').doc('ride' + rideNum).set(data);
		})

		res.end()

	});
}

//gets all rides
function getAllRides(){
	//list of all rides
	var rides = []

	var docRef = db.collection('allRides/');

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