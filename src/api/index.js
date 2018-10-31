

/*
  发送请求模块
 */
import ajax from './ajax';

//登陆请求
export const reqLogin = data => ajax('/login',data,'POST');

//注册请求
export const reqRegister = data => ajax('/register',data,'POST');
