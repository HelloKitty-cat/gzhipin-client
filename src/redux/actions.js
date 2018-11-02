
//action creators工厂函数创建 action对象

import {reqLogin,reqRegister} from '../api';

import {SUCCESS,ERRMESSAGE} from './action-types';


//成功的同步actions对象
export const authSucess = user => ({type:SUCCESS,data:user});

//失败的同步actions对象
export const authErrMsg = msg => ({type:ERRMESSAGE,data:msg});


export const register = data =>{  //用户提交的请求参数

  const {username,password,repassword,type} = data;
  if (!username){
    return authErrMsg({username,password,msg:'请输入用户名'})
  }else if (!password){
    return authErrMsg({username,password,msg:'请输入密码'})
  }else if (password !== repassword){
    return authErrMsg({username,password,msg:'两次输入密码不一致'})
  } else if (!type) {
    return authErrMsg({username,password,msg:'请选择账号类型'})
  }

  return dispatch =>{
    reqRegister(data) //用户提交的请求参数
      .then(res =>{
        const result = res.data;  //res.data   响应的数据
        if (result.code === 0){
          //更新成功
          dispatch(authSucess(result.data));  //result.data 响应信息中的用户信息
        }else {
          //更新失败
          dispatch(authErrMsg({msg:result.msg,username:data.username,type:data.type}));
        }
      })
      .catch(err =>{
        //方法出错
        dispatch(authErrMsg({msg:'网络不稳定,请重新输入',username:data.username,type:data.type}));
      })
  }
};