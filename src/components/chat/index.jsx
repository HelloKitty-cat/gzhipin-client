/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import Cookies from 'js-cookie';

const Item = List.Item;

export default class Chat extends Component {

  state ={
    content: ''
  };

  sendMessage = () =>{
    //from
    const from = Cookies.get('userid');
    //to
    const to = this.props.match.params.id;

    //消息内容
    const {content} = this.state;

    //发送数据
    this.props.sendMessage({from,to,content});
  };

  render() {
    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          <Item
            thumb={require('../../assets/avatars/头像1.png')}
          >
            你好
          </Item>
          <Item
            thumb={require('../../assets/avatars/头像1.png')}
          >
            你好2
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好2
          </Item>
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            onChange={val => this.setState({content:val})}
            extra={
              <span onClick={this.sendMessage}>发送</span>
            }
          />
        </div>
      </div>
    )
  }
}