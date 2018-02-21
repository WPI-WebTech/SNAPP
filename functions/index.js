const functions = require('firebase-functions');

const admin = require('firebase-admin');

var config = {
	apiKey: "AIzaSyDb7pzdnEJJlClx4-enDHkTJR81yDg3HVs",
	authDomain: "snapp-c0271.firebaseapp.com",
	databaseURL: "https://snapp-c0271.firebaseio.com",
	projectId: "snapp-c0271",
	storageBucket: "snapp-c0271.appspot.com",
	messagingSenderId: "702539875760"
};

firebase.initializeApp(config);

var databse = admin.firebase;

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

//Checks if snapp is currently opperating when a someone submits a request
exports.checkStatus = functions.firestore.document('ApprovalQueue').onCreate(event => {
	hoursOfOperation(event);
	status = isSnappOperating(event);
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
			var data = updatedRide;
			db.collection('WaitingQueue/').doc(updatedRide.id).set(data);
		} else if (status == "rejected" || status == "completed" || status == "cancelled" || status == "noShow"){
			// move the ride to the Archive
			var data = updatedRide;
			db.collection('Archive/').doc(updatedRide.id).set(data);
		}
		// Remove the old entry
		event.data.ref.delete();
	}
}

//determines if the ride request is valid
function hoursOfOperation(event){
	var date = new Date();
	var weekDay = date.getDay(); //0 = sunday, 6 = saturday
	var currentHours = date.getHours();
	var validRide = false;

	db.collection('Service').doc('SnappStatus').get().then((snapshot) => {
        var data = snapshot.data();	//get the snapp status data in order to get the hours of operations

        //sunday
        if(weekDay == 0){
        	var SunStart = data.Time.SunStart;
        	var SunEnd = data.Time.SunEnd;

        	if(currentHours > SunStart || currentHours < SunEnd){
        		valid = true;
        	}
        }
        //monday
        else if(weekDay == 1){
        	var MonStart = data.Time.MonStart;
        	var MonEnd = data.Time.MonEnd;
        	if(currentHours > MonStart || currentHours < MonEnd){
    			valid = true;
    		}
        }
        //tuesday
        else if(weekDay == 2){
        	var TuesStart = data.Time.TuesStart;
        	var TuesEnd = data.Time.TuesEnd;
        	if(currentHours > TuesStart || currentHours < TuesEnd){
	    		valid = true;
	    	}
        }
        //wednesday
        else if(weekDay == 3){
        	var WedStart = data.Time.WedStart;
        	var WedEnd = data.Time.WedEnd;
        	if(currentHours > WedStart || currentHours < WedEnd){
	    		valid = true;
	    	}
        }
        //thrusday
        else if(weekDay == 4){
        	var ThrusStart = data.Time.ThursStart;
        	var ThursEnd = data.Time.ThursEnd;
        	if(currentHours > ThursStart || currentHours < ThursEnd){
	    		valid = true;
	    	}
        }
        //friday
        else if(weekDay == 5){
        	var FriStart = data.Time.FriStart;
        	var FriEnd = data.Time.FriEnd;
        	if(currentHours > FriStart || currentHours < FriEnd){
	    		valid = true;
	    	}
        }
        //saturday
        else if(weekDay == 6){
        	var SatStart = data.Time.SatStart;
        	var SatEnd = data.Time.SatEnd;
        	if(currentHours > SatStart || currentHours < SatEnd){
	    		valid = true;
	    	}
        }
	    	


    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });

    //set operation status to closedTime to indicate that snapp is not running due to time
    if(valid == false){
	    db.collection('Service').doc('SnappStatus').update({Operation: "closedTime"});
    }

    return valid;
}

function isSnappOperating(event){
	running = true;
	reason = "";

	db.collection('Service').doc('SnappStatus').get().then((snapshot) => {
        var data = snapshot.data();	//get the snapp status data in order to get the hours of operations

        //check if closed due to time
        if(data.Operating == "closedTime"){
        	running = false;
        	reason = "Not in hours of operation.";
        }
        //check  if cloded due to weather
        else if(data.Operating == "closedWeather"){
        	running = false;
        	reason = "Closed due to dangerous weather.";
        }
        //check if snapp is operating
        else if(data.Operating == "operating"){
        	running = true;
        	reason = "Snapp is in operation.";
        }
	});

	//return if its running or not and the reason why
    return [running, reason];
}