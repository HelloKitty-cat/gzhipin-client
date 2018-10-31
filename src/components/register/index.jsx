import React, {Component} from 'react';
import {NavBar,List, InputItem,Button,WingBlank, WhiteSpace,Radio} from 'antd-mobile';

import Logo from '../logo/';

import {reqRegister} from '../../api'

const Item = List.Item;

class Register extends Component {

  state = {
    username:'',
    password:'',
    repassword:'',
    type:'laoban'
  };

  handleChange = (name,val) =>{
    //更新状态
    this.setState({
      [name] : val
    })
  };

  //获取输入框的值
  register =async () =>{
    const {username,password,repassword,type} = this.state;

    console.log(username,password,repassword,type);

    //发送ajax请求
    if (password === repassword){
      const data = await reqRegister({username,password,type});
      console.log(data.data.code);
      //当我的响应状态码code为0时,跳转到登录界面
      if (data.data.code === 0){
        this.props.history.replace('/login');
      }
    } else {
      //两次密码不一致
      alert('两次密码不一致');
    }
  };

  goLogin = () =>{
    this.props.history.replace('/login');  //因为我们不需要缓存记录
  };


  render() {
    const {type} = this.state;
    return (
      <div>
        <NavBar>硅 谷 直 聘</NavBar>
        <Logo />
        <WingBlank>
          <form>
            <List>
              <WhiteSpace />
              <InputItem placeholder="请输入用户名"
                         onChange={val => this.handleChange('username',val)}>用户名:</InputItem>
              <WhiteSpace />
              <InputItem placeholder="请输入密码" type="password"
                         onChange={val => this.handleChange('password',val)}>密 码:</InputItem>
              <WhiteSpace />
              <InputItem placeholder="请确认密码" type="password"
                         onChange={val => this.handleChange('repassword',val)}>确认密码:</InputItem>
              <WhiteSpace />
              <Item>
                用户类型:&nbsp;&nbsp;
                <Radio className="my-radio"
                       onClick={() => this.handleChange('type','dashen')}
                       checked={type==='dashen'}
                >大神</Radio>&nbsp;&nbsp;
                <Radio className="my-radio"
                       onClick={() => this.handleChange('type','laoban')}
                       checked={type==='laoban'}>老板</Radio>
              </Item>
              <Button type="primary" onClick={this.register}>注册</Button><WhiteSpace />
              <Button onClick={this.goLogin}>已有账号</Button><WhiteSpace />
            </List>
          </form>
        </WingBlank>
      </div>
    )
  }
}
export default Register;