import actionType, { rideStatus } from '../constants';
import { addRideRequest, cancelRideOnServer } from '../services/FirebaseService'
import rideModel from '../models/RideModel'

export const requestRide = ({ fromAddress, toAddress, numPassengers, accommodations }) => {
  return {
    type: actionType.REQUEST_RIDE,
    payload: addRideRequest(
      rideModel(
        fromAddress,
        toAddress,
        numPassengers,
        accommodations,
        rideStatus.REQUESTED
      ))
  };
};

export const cancelRide = rideId => {
  return {
    type: actionType.CANCEL_RIDE,
    payload: cancelRideOnServer(rideId)
  };
};
