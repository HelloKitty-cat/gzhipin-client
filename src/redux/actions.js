
//action creators工厂函数创建 action对象

import {reqLogin, reqRegister, reqUpdate, reqGetUserInfo, reqGetUserList, reqSendChatList} from '../api';

import {
  SUCCESS,
  ERRMESSAGE,
  UPDATESUCCESS,
  UPDATEERR,
  UPDATE_lIST_ERR,
  UPDATE_lIST_SUCCESS,
  UPDATE_CHATlIST_ERR,
  UPDATE_CHATlIST_SUCCESS,
  UPDATE_CHAT_MESSAGES
} from './action-types';
// 引入客户端io
import io from 'socket.io-client';

//成功的同步actions对象
export const authSucess = user => ({type:SUCCESS,data:user});

//失败的同步actions对象
export const authErrMsg = msg => ({type:ERRMESSAGE,data:msg});

//更新成功的同步函数
export const updateSuccess = user => ({type:UPDATESUCCESS,data:user});

//更新失败的同步函数
export const updateErr = msg => ({type:UPDATEERR,data:msg});

//更新用户列表成功 的同步函数

export const updateUserList = userlist => ({type:UPDATE_lIST_SUCCESS,data:userlist});

//更新用户列表失败的同步函数
export const updateListErr = msg => ({type:UPDATE_lIST_ERR,data:msg});

//更新用户聊天列表成功的同步函数
export const updateUserChatList = chatMsgs => ({type:UPDATE_CHATlIST_SUCCESS,data:chatMsgs});

//更新用户聊天列表失败的同步函数
export const updateChatListErr = msg => ({type:UPDATE_CHATlIST_ERR,data:msg});

//更新用户聊天信息
export const updateChatMessages = chatMsgs => ({type:UPDATE_CHAT_MESSAGES,data:chatMsgs});


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

  const {header,info,post,salary,company,type} = data;
  if (!header){
    return updateErr({msg:'请选择头像'})
  }else if (!info){
    return updateErr(type === 'laoban' ?  {msg:'请填写职位要求'} : {msg:'请填写求职岗位'})
  }else if (!post){
    return updateErr(type === 'laoban' ?  {msg:'请输入招聘职位'} : {msg:'请填写求职岗位'})
  }

  if (type === 'laoban'){
   if (!salary) {
      return updateErr({msg:'请填写资薪范围'})
    }else if(!company){
      return updateErr({msg:'请填写公司名称'})
    }
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


//获取用户信息的异步action
export const getUserInfo = () =>{

  return dispatch =>{
    reqGetUserInfo() //用户提交的请求参数
      .then(res =>{
        const result = res.data;  //res.data   响应的数据
        if (result.code === 0){
          //请求成功
          dispatch(updateSuccess(result.data));  //result.data 响应信息中的用户信息
        }else {
          //请求失败 （服务器内部出现问题）
          dispatch(updateErr({msg:result.msg}));
        }
      })
      .catch(err =>{
        //方法出错
        dispatch(updateErr({msg:'网络不稳定,请重新输入'}));
      })
  }
};

//获取用户列表数据的异步action
export const getUserList = type =>{
  return dispatch =>{
    reqGetUserList(type)
      .then(res=>{
      const result = res.data;
      if (result.code === 0){
        //更新用户列表成功
        dispatch(updateUserList(result.data))
      } else {
        //更新用户列表失败
        dispatch(updateListErr({msg:result.data}))
      }
      })
      .catch(err =>{
        // //更新用户列表成功（方法出错）
        dispatch(updateListErr({msg:'网络不稳定,请重新输入'}))
      })
  }
};



// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:5000');
// 绑定'receiveMessage'的监听, 来接收服务器发送的消息
socket.on('receiveMsg', function (data) {
  console.log('浏览器端接受到服务器的消息:', data)
});



export const sendMessage = ({content, from, to}) =>{
  return dispatch =>{
// 向服务器发送消息
    socket.emit('sendMsg', {content, from, to});
    console.log('浏览器端向服务器发送消息:');
  }
};


//更新用户聊天列表
export const sendChatList =()=>{
  return dispatch =>{

    if (!socket.isFirts){
      socket.isFirts = true;
      //一旦服务器发送消息，就可以更新redux中的状态数据
      socket.on('receiveMsg', function (data) {
        dispatch(updateChatMessages(data));
        console.log('浏览器端接受到服务器的消息:', data)
      });
    }

    //发送ajax请求
    reqSendChatList ()
      .then(res =>{
        const result = res.data;
        if (result.code === 0){
          //请求成功
          dispatch(updateUserChatList(result.data));
        } else {
          //请求失败
          dispatch(updateChatListErr({msg:result.msg}));
        }
      })
      .catch(err=>{
        //请求失败
        dispatch(updateChatListErr({msg:'网络不稳定,请重新输入'}));
      })
  }
};