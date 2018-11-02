
//action creators工厂函数创建 action对象

import {reqLogin,reqRegister,reqUpdate} from '../api';

import {SUCCESS,ERRMESSAGE,UPDATESUCCESS,UPDATEERR} from './action-types';


//成功的同步actions对象
export const authSucess = user => ({type:SUCCESS,data:user});

//失败的同步actions对象
export const authErrMsg = msg => ({type:ERRMESSAGE,data:msg});

//更新成功的同步函数
export const updateSuccess = user => ({type:UPDATESUCCESS,data:user});

//更新失败的同步函数
export const updateErr = msg => ({type:UPDATEERR,data:msg});

//注册验证及更新的方法
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

//登录
export const login = data =>{  //用户提交的请求参数

  const {username,password} = data;
  if (!username){
    return authErrMsg({username,password,msg:'请输入用户名'})
  }else if (!password){
    return authErrMsg({username,password,msg:'请输入密码'})
  }

  return dispatch =>{
    reqLogin(data) //用户提交的请求参数
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


//老板更新
export const update = data =>{  //用户提交的请求参数

  const {header,info,post,salary,company} = data;
  if (!header){
    return updateErr({msg:'请选择头像'})
  }else if (!info){
    return updateErr({msg:'请填写职位要求'})
  }else if (!post){
    return updateErr({msg:'请输入招聘职位'})
  } else if (!salary) {
    return updateErr({msg:'请填写资薪范围'})
  }else if(!company){
    return updateErr({msg:'请填写公司名称'})
  }

  return dispatch =>{
    reqUpdate(data) //用户提交的请求参数
      .then(res =>{
        const result = res.data;  //res.data   响应的数据
        if (result.code === 0){
          //更新成功
          dispatch(updateSuccess(result.data));  //result.data 响应信息中的用户信息
        }else {
          //更新失败
          dispatch(updateErr({msg:result.msg}));
        }
      })
      .catch(err =>{
        //方法出错
        dispatch(updateErr({msg:'网络不稳定,请重新输入'}));
      })
  }
};

export const updateDashen = data =>{  //用户提交的请求参数

  const {header,info,post} = data;
  if (!header){
    return updateErr({msg:'请选择头像'})
  }else if (!info){
    return updateErr({msg:'请填写个人介绍'})
  }else if (!post){
    return updateErr({msg:'请输入求职岗位'})
  }
  return dispatch =>{
    reqUpdate(data) //用户提交的请求参数
      .then(res =>{
        const result = res.data;  //res.data   响应的数据
        if (result.code === 0){
          //更新成功
          dispatch(updateSuccess(result.data));  //result.data 响应信息中的用户信息
        }else {
          //更新失败
          dispatch(updateErr({msg:result.msg}));
        }
      })
      .catch(err =>{
        //方法出错
        dispatch(updateErr({msg:'网络不稳定,请重新输入'}));
      })
  }
};


