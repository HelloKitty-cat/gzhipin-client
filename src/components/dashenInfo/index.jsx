import React, {Component} from 'react';
import {Button, InputItem, NavBar,TextareaItem} from "antd-mobile";
import {Redirect} from 'react-router-dom';
import Headportrait from "../head-portrait";
import ProrTypes from 'prop-types';

class DashenInfo extends Component {

  static propTypes = {
    users:ProrTypes.object.isRequired,
    update:ProrTypes.func.isRequired
  };

  state = {
    header:'',
    post:'',
    info:''
  };

  handleChange = (name,val)=>{
    this.setState({
      [name] : val
    })
  };

  //定义方法，传给子组件,在子组件中改变头像的状态
  changeHeader = header =>{
    this.setState({
      header
    })
  };

  //点击保存，保存输入到数据库中
  saveUsersData = () =>{
    this.props.update(this.state);
  };

  render() {
    const {msg,header} = this.props.users;
    if (header){
      return <Redirect to='/dashen'/>
    }
    return (
      <div style={{marginTop:'-50px',marginBottom:'-60px'}}>
        <NavBar>大神信息完善</NavBar>
        <Headportrait changeHeader={this.changeHeader}/>
        {msg ? <p className='err-message'>{msg}</p> : ''}
        <InputItem onChange={val => this.handleChange('post',val)}>求职岗位:</InputItem>
        <TextareaItem title='个人介绍:' rows={3} onChange={val => this.handleChange('info',val)}/>
        <Button type='primary' onClick={this.saveUsersData}>保存</Button>
      </div>
    )
  }
}

export default DashenInfo;