import React, {Component} from 'react';
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import Logo from "../logo";
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  static propTypes = {
    history:PropTypes.object.isRequired
  };

  state = {
    username :'',
    password:''
  };

  goRegister = () =>{
    this.props.history.replace('/register');
  };

  handleValue = (name,val) =>{
    this.setState({
      [name]:val
    })
  };
  //点击登录
  Tologin = async () =>{
    //发送请求
    this.props.login(this.state);

  };

  render() {
    const {msg,redirectTo} = this.props.users;
    if (redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅 谷 直 聘</NavBar>
        <Logo />
        <WingBlank>
          {msg ? <p className='err-message'>{msg}</p> : ''}
          <form>
            <List>
              <WhiteSpace />
              <InputItem placeholder="请输入用户名"
                         onChange={val => this.handleValue('username',val)}
                         >用户名:</InputItem>
              <WhiteSpace />
              <InputItem placeholder="请输入密码" type="password"
                         onChange={val => this.handleValue('password',val)}
                         >密 码:</InputItem>
              <WhiteSpace />
              <Button type="primary" onClick={this.Tologin}>登录</Button><WhiteSpace />
              <Button onClick={this.goRegister}>还没有账户</Button><WhiteSpace />
            </List>
          </form>
        </WingBlank>
      </div>
    )
  }
}

export default Login;