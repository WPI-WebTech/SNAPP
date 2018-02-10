import actionType from '../constants';
import { addRideRequest } from '../services/FirebaseService'
import { rideModel } from '../models/RideModel'

export const requestRide = ({ fromAddress, toAddress, numPassengers, accommodations }) => {
  return {
    type: actionType.REQUEST_RIDE,
    payload: addRideRequest(
      rideModel(
        fromAddress,
        toAddress,
        numPassengers,
        accommodations
      ))
  };
};

export const cancelRide = () => {
  return { type: actionType.CANCEL_RIDE };
};
