import React, {Component} from 'react';
import {Button, InputItem, NavBar,} from "antd-mobile";
import Headportrait from "../head-portrait";

class DashenInfo extends Component {
  render() {
    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <Headportrait changeHeader={this.changeHeader}/>
        {/*{msg ? <p className='err-message'>{msg}</p> : ''}*/}
        <InputItem onChange={val => this.handleChange('post',val)}>求职岗位:</InputItem>
        <TextareaItem title='个人介绍:' rows={3}/>
        <Button type='primary' onClick={this.saveUsersData}>保存</Button>
      </div>
    )
  }
}

export default DashenInfo;