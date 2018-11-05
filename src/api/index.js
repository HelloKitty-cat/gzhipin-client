

/*
  发送请求模块
 */
import ajax from './ajax';

//登陆请求
export const reqLogin = data => ajax('/login',data,'POST');

//注册请求
export const reqRegister = data => ajax('/register',data,'POST');

//更新请求
export const reqUpdate = data => ajax('/update',data,'POST');

//请求用户数据的
export const reqGetUserInfo = () => ajax('/user');

//获取用户列表的
export const reqGetUserList = type => ajax('/userlist',{type});

//获取用户聊天列表的
export const reqSendChatList = () => ajax('/msglist');
