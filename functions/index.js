const functions = require('firebase-functions');
const firebase = require('firebase');
const admin = require('firebase-admin');
var serviceAccount = {
  "type": "service_account",
  "project_id": "snapp-c0271",
  "private_key_id": "57486c763b3851bcf6a86fc9357e772533c6ad42",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6txLXMmj82wp1\n4nl9FLlG8igVVbw8gsajwVPnLFdLy9qJPNWHhfFD1tujD37oJLoTDmdOo0PvElc3\nUWWWmIgt5qfWnSHC0bKCthJJOq78rw2GL7sMc2cO/rqfeR/eLQsxk7MmyaQsKqqc\nuc1sGHC2ADYOxQDhTGE+ODb2uOAg80tTD6Js40KOpMiN0+lGiSelkH9y1PtZ6AKI\nrrmI5WtHxiTgUNGn/Cd7d3pgzHltVkMT0+z3CZLDv5K5ecPEDub2DsLQANEnrqmK\ng/DD4DRzGjJICPebVwUIwrGWrisuOsHnCOg/ywMqsfgSvKCiKorvOKP0bd0aKusq\nsVeHnQEbAgMBAAECggEACGhUbomebf4v6hQA7i+f70CT8Kpcsglj2W7XkNoPm7N0\nFwtIilzu+sD+b1SRKSBsbLw/KlsyUzsUDjdOIhLosixtwmwRvLPROWBe0ck9vDLP\nXPQn5hjDqdYljrLdEP57EQ3uyRqROsxyrRsqXyl5TROgW4Zab78PCtJU6/3PQXmY\nDf4c7nae+XXn8WsoJQ84IZadiWF9CrlGbZmOFmtLTZawS2PXTE+v7BMZS+KzxABy\ntYm1RyLBX+U0z0GjSBmzdphd1q67kB1cJAPJ/ZLaEiFpJSdV2G3a8b+A197KOvxx\nMzunN3YRhB9KZYLLTUrlHNrPTw7vLFOSoePd3uikMQKBgQDwPykHsBYx4QwZo29E\nP90Nv4Wu7i4XiWoP9auGrE4PIEhLv4NbxPLgipJ2aEZgVElWDx3CIY9vw+tVjqL0\nMmUYR4UlXD//XolqBPp6qtddk9tU6GSSgqLf6KRqII3Uc9pIzm5yTyKGaBUyvIXt\nJm/ZnzVZ4BX10qKmyR1nZUS/cQKBgQDG9VGv0Zm3FkX29sYX+ism7nuZ1s4OTI4L\nyB+/GPWDuNED2FwDF873LSLNwxAdQYUhNf8ASgmDFpn9LW8ulvPaloffvWaaW8gR\nyMYB9fZTXLq+8l4p8j+l9FSUelN272yzRxDxwqIBvdicNhqeWzuL8QiQG+66VzBY\nwjBLzMgbSwKBgDC47m5DtMya0mRks80IkqEWJVtrrGdTk/H2pbmjOhVxO5g5F7/F\numf1Umy3CwbAMTtFx4g2XCuTdSedzMhva/c3kfYYtlXo6z9YESBNg23T7ZhTpQnd\neoCkYquvPHRIpo07aETAbcUKWLo4Z4TH1ckxs5Utj+aRuDDQ+qicbgvRAoGAVNwz\n4EsFRltAskqlSXrRxwQ3QfGl5+FtQMc2CzspFOrSc9JnxIX2J+Vfj+XgTKoyj2zJ\nfCUYE4qjWaJ0ZqnKDvTftWXCipoVJsi88/8l9n55xJH56ehCj5U8MixOx07tzTXF\nm2iJ0zZXWqGVDvAY4OKI5XaUh3RC0cjZ8qrAuysCgYEA5Ek5of0Gmsr/qPynuAT8\nXK3AtoToS8dkbzx3XbFe7mC1LDWcK7L9rBPcQ1AEN++6ornZKcnrhqetVqbQNbvr\nNUMJjFBBWogvYQKO5PePupjN2rire9Gcbj7YLHT9wNjCIk+87JKLmAV5e1/VezzA\nzHD1+0SYB0xnr0O2NCO6udU=\n-----END PRIVATE KEY-----\n",
  "client_email": "snapp-c0271@appspot.gserviceaccount.com",
  "client_id": "115295893730525762252",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/snapp-c0271%40appspot.gserviceaccount.com"
}

var database = null;

/**
 * Firebase functions to handle new rides and status changes for the SNAPP Firestore database
 *
 */

// Validate a new ride
exports.validateNewRide = functions.firestore.document('ApprovalQueue/{rideID}').onCreate(event => {
	var newRide = event.data.data();

	// See if there is currently a ride in an active queue with that user's email
	// If so, reject the ride automatically.
	var email = newRide.email;
	if(containsEmail('ApprovalQueue/', email) || containsEmail('WaitingQueue/', email)){
		return event.data.ref.set({
			status: 'rejected'
		}); // Note: this assumes that the other function will handle moving the rejected ride to the Archive
	}



});

// Handle a change in a document in the ApprovalQueue
exports.approvalUpdate = functions.firestore.document('ApprovalQueue/{rideID}').onUpdate(event => {
	return statusUpdate(event, event.params.rideID);
});

// Handle a change in a document in the WaitingQueue
exports.waitingUpdate = functions.firestore.document('WaitingQueue/{rideID}').onUpdate(event => {
	return statusUpdate(event, event.params.rideID);
})

//Checks if snapp is currently opperating when a someone submits a request
exports.checkStatus = functions.firestore.document('ApprovalQueue').onCreate(event => {
	hoursOfOperation(event);
	status = isSnappOperating(event);
})


function initializeFirebase(){
	admin.initializeApp({
		credential : admin.credential.cert(serviceAccount)
	});

	return admin.firestore();

}
function containsEmail(tableName, email){
	if(database == null){
		database = initializeFirebase();
	}
	
	var docRef = database.collection(tableName);
	var allRides = docRef.get().then(snapshot => {
		var docEmail = snapshot.data().email;
		if(docEmail == email){
			return true;
		}
	});
	return false;
}
/**
 * Handle a change in a document in the ApprovalQueue or the WaitingQueue
 */
function statusUpdate(event, rideID){
	database = initializeFirebase();
	var updatedRide = event.data.data();
	var oldRide = event.data.previous.data();


	var status = updatedRide.status;
	var oldStatus = oldRide.status;

	if(status != oldStatus){
		// The status has been updated
		if(status == "approved"){
			// Move the ride to the WaitingQueue
			var data = updatedRide;
			console.log("Updated ride's ID is " + rideID);
			event.data.ref.delete();
			return database.collection('WaitingQueue').doc(rideID).set(data);
		} else if (status == "rejected" || status == "completed" || status == "cancelled" || status == "noShow"){
			// move the ride to the Archive
			var data = updatedRide;
			console.log("Updated ride's ID is " + rideID);
			event.data.ref.delete();
			return database.collection('Archive').doc(rideID).set(data);
		}
		// Remove the old entry
		
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