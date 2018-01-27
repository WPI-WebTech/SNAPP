import { combineReducers } from 'redux';
import FooReducer from './FooReducer'

export default combineReducers({
  foo: FooReducer
});