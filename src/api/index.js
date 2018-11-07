

/*
  发送请求模块
 */
import ajax from './ajax';

const prefix = 'http://localhost:4000';

//登陆请求
export const reqLogin = data => ajax(prefix+'/login',data,'POST');

//注册请求
export const reqRegister = data => ajax(prefix+'/register',data,'POST');

//更新请求
export const reqUpdate = data => ajax(prefix+'/update',data,'POST');

//请求用户数据的
export const reqGetUserInfo = () => ajax(prefix+'/user');

//获取用户列表的
export const reqGetUserList = type => ajax(prefix+'/userlist',{type});

//获取用户聊天列表的
export const reqSendChatList = () => ajax(prefix+'/msglist');

//更新已读消息
export const reqUpdateunReadCount = from => ajax(prefix+'/readmsg',{from},'POST');
