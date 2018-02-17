import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import RideReducer from './RideReducer';

export default combineReducers({
    ride: RideReducer,
    router: routerReducer,
});