
import {combineReducers} from 'redux';

import {SUCCESS,ERRMESSAGE} from './action-types';
import getRedirectPath from '../utils'

const initState ={
  username:'',
  type:'',
  msg:'',
  redirectTo:''
};

function users(preState = initState,action) {
  switch (action.type) {
    case SUCCESS:
      return {username: action.data.username,type: action.data.type,msg:'',redirectTo:getRedirectPath(action.data.type,action.data.header)};
    case ERRMESSAGE:
      return {...action.data};
    default :
      return preState;
  }
}
export default combineReducers({
  users
})