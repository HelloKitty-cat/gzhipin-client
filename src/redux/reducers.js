
import {combineReducers} from 'redux';

import {
  SUCCESS,
  ERRMESSAGE,
  UPDATEERR,
  UPDATESUCCESS,
  UPDATE_lIST_ERR,
  UPDATE_lIST_SUCCESS,
  UPDATE_CHATlIST_SUCCESS,
  UPDATE_CHATlIST_ERR
} from './action-types';
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
      return action.data ?
       {...action.data,msg:'',redirectTo:getRedirectPath(action.data.type,action.data.header)}
      : {...action.data,msg:''};
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
//获取用户列表的
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

const initUserChatListState = {
  chatMsgs:[]
};
//获取用户聊天列表的
function userChatList(preState = initUserChatListState,action) {
  switch (action.type) {
    case UPDATE_CHATlIST_SUCCESS:
      return action.data;
    case UPDATE_CHATlIST_ERR :
      return action.data;
    default:
      return preState
  }
}



export default combineReducers({
  users,
  userList,
  userChatList
})