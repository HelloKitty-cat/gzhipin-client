import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import Headportrait from '../head-portrait'
import {Redirect} from "react-router-dom";

class LaobanInfo extends Component {

  static propTypes = {
    users:PropTypes.object.isRequired,
    update:PropTypes.func.isRequired
  };

  state = {
    header:'',  //头像
    info:'',    //介绍
    post:'',    //职位
    salary:'',  //月薪
    company:''  //公司
  };

  //公共函数改变状态
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
      this.props.update({...this.state,type:'laoban'});
  };

  render() {
    const {msg,header} = this.props.users;
    if (header){
      return <Redirect to='/dashen'/>
    }
    return (
      <div style={{marginTop:'-50px',marginBottom:'-60px'}}>
        <NavBar>老板信息完善</NavBar>
        <Headportrait changeHeader={this.changeHeader}/>
        {msg ? <p className='err-message'>{msg}</p> : ''}
        <InputItem onChange={val => this.handleChange('post',val)}>招聘职位:</InputItem>
        <InputItem onChange={val => this.handleChange('company',val)}>公司名称:</InputItem>
        <InputItem onChange={val => this.handleChange('salary',val)}>职位薪资:</InputItem>
        <TextareaItem title='职位要求:' rows={3} onChange={val => this.handleChange('info',val)}/>
        <Button type='primary' onClick={this.saveUsersData}>保存</Button>
      </div>
    )
  }
}

export default LaobanInfo;