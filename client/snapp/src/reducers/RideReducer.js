import actionType, { rideStatus } from '../constants';

const DEFAULT_STATE = {
    rideStatus: rideStatus.DEFAULT,
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case actionType.REQUEST_RIDE:
            return { rideStatus: rideStatus.REQUESTED, };
        case actionType.CANCEL_RIDE:
            return { rideStatus: rideStatus.DEFAULT, };
        default:
            return state;
    }
}