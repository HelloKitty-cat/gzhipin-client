
/*
  封装axios的ajax模块
  返回值是promise对象
 */

import axios from 'axios';

export default function ajax(url,data,type='GET') {

  let querystring = '';
  if (data){
    Object.keys(data).forEach(key => {   //key就是数组里的值
      //获取属性值
      const value  = data[key];  //obj[key]可以拿到对象的值
      querystring += key+'='+value+'&'
    });
    querystring = querystring.substring(0,querystring.length-1);   //这里不可以用-1
  }
  if (type.toUpperCase() === 'GET') {
    //用户发送的是get请求
    //如果用户通过data传参，我要将data中的数据以查询字符串的方法拼接在url后面
    url  +='?'+querystring;
    return axios.get(url);
  }else {
    //用户发送的是post请求
    return axios.post(url,querystring,{
      headers: {  //附带的请求头信息
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }
}