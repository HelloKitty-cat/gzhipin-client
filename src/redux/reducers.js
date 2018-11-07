
import {combineReducers} from 'redux';
import Cookies from 'js-cookie';

import {
  SUCCESS,
  ERRMESSAGE,
  UPDATEERR,
  UPDATESUCCESS,
  UPDATE_lIST_ERR,
  UPDATE_lIST_SUCCESS,
  UPDATE_CHATlIST_SUCCESS,
  UPDATE_CHATlIST_ERR,
  UPDATE_CHAT_MESSAGES,
  UPDATE_UNREADCOUNT_MESSAGES,
  UPDATE_UNREADCOUNT_ERR
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
  chatMsgs:[],
  users:{},
  unReadCount:0
};
//获取用户聊天列表的
function userChatList(preState = initUserChatListState,action) {
  switch (action.type) {
    case UPDATE_CHATlIST_SUCCESS:
      var userid = Cookies.get('userid');
      return {
        ...action.data,
        unReadCount: action.data.chatMsgs.reduce((prev,curr) =>{
          return prev + (!curr.read && curr.to === userid ? 1 : 0)
        },0)
      };
    case UPDATE_CHATlIST_ERR :
      return action.data;
    case UPDATE_CHAT_MESSAGES:
      return {
        chatMsgs: [...preState.chatMsgs,action.data],
        users:preState.users
      };
    case UPDATE_UNREADCOUNT_MESSAGES:
      var userids = Cookies.get('userid');
      return {
        chatMsgs:preState.chatMsgs.map(chatMsg =>{
          if (chatMsg.from === action.data.from && chatMsg.to === userids && !chatMsg.read) {
            return {...chatMsg,read:true}
          }else {
            return chatMsg
          }
        }),
        users:preState.users,
        unReadCount:preState.unReadCount-action.data.count
      };
    case UPDATE_UNREADCOUNT_ERR:
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