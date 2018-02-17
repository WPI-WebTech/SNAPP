const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// Validate a new ride
exports.validateNewRide = functions.firestore.document('ApprovalQueue').onCreate(event => {
	var newRide = event.data.data();

	// See if there is currently a ride in an active queue with that user's email
	// If so, reject the ride automatically.
	var email = newRide.email;


});

exports.approvalUpdate = functions.firestore.document('ApprovalQueue').onUpdate(event => {
	statusUpdate(event);
});

exports.waitingUpdate = functions.firestore.document('WaitingQueue').onUpdate(event => {
	statusUpdate(event);
})


function statusUpdate(event){
	var updatedRide = event.data.data();
	var oldRide = event.data.previous.data();

	var status = updatedRide.status;
	var oldStatus = oldRide.status;

	if(status != oldStatus){
		// The status has been updated
		if(status == "approved"){
			// Move the ride to the WaitingQueue
		} else if (status == "rejected" || status == "completed" || status == "cancelled" || status == "noShow"){
			// move the ride to the Archive
		}
	}
}