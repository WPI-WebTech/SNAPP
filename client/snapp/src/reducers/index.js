import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import FooReducer from './FooReducer'

export default combineReducers({
    foo: FooReducer,
    router: routerReducer,
});