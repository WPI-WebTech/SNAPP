const express = require('express');
const app = express();

const PORT = 8080;

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