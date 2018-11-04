
import {combineReducers} from 'redux';

import {SUCCESS,ERRMESSAGE,UPDATEERR,UPDATESUCCESS, UPDATE_lIST_ERR, UPDATE_lIST_SUCCESS} from './action-types';
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
      return {...action.data,msg:'',redirectTo:getRedirectPath(action.data.type,action.data.header)};
    case ERRMESSAGE:
      return action.data;
    case UPDATESUCCESS:
      return  action.data;
    case UPDATEERR:
      return action.data;
    default :
      return preState;
  }
}



const initUserListState = [];

function userList(preState = initUserListState,action) {
  switch (action.type) {
    case UPDATE_lIST_SUCCESS:
      return action.data;
    case UPDATE_lIST_ERR :
      return action.data;
    default:
      return preState
  }
}

export default combineReducers({
  users,
  userList
})