import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import FooReducer from './FooReducer';
import RideReducer from './RideReducer';

export default combineReducers({
    foo: FooReducer,
    ride: RideReducer,
    router: routerReducer,
});