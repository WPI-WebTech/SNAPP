import actionType from '../constants';

const DEFAULT_STATE = {status:"DEFAULT"};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actionType.REQUEST_RIDE_FULFILLED:
            return action.payload
        case actionType.CANCEL_RIDE_FULFILLED:
            return {...state, ...{status: "CANCELLED"}}
        default:
            return state;
    }
}