import actionType from '../constants';

export const requestRide = ({ fromAddress, toAddress, numPassengers, accommodations }) => {
  return { type: actionType.REQUEST_RIDE, payload: { fromAddress, toAddress, numPassengers, accommodations} };
};

export const cancelRide = () => {
    return { type: actionType.CANCEL_RIDE };
};