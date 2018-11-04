import React, {Component} from 'react';
import {NavBar,List, InputItem,Button,WingBlank, WhiteSpace,Radio} from 'antd-mobile';
import Logo from '../logo/';
import ProrTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

const Item = List.Item;
class Register extends Component {

  static propTypes ={
    register:ProrTypes.func.isRequired,
    users:ProrTypes.object.isRequired
  };
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
  Register = async () =>{
    const {username,password,repassword,type} = this.state;

    console.log(username,password,repassword,type);

    this.props.register({username,password,repassword,type,route:'register'});
  };

  goLogin = () =>{
    this.props.history.replace('/login');  //因为我们不需要缓存记录
  };


  render() {
    const {type} = this.state;
    const {msg,redirectTo} = this.props.users;
    if (redirectTo){
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
              <Button type="primary" onClick={this.Register}>注册</Button><WhiteSpace />
              <Button onClick={this.goLogin}>已有账号</Button><WhiteSpace />
            </List>
          </form>
        </WingBlank>
      </div>
    )
  }
}
export default Register;