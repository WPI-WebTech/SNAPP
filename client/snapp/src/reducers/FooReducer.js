import actionType from '../constants'

export default (state = {}, action) => {
  switch(action.type){
    case actionType.FOO_BAR: {
      return {foo: "bar"}
    }
    default:
      return state;
  }
}