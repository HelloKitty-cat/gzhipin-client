/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem,Icon} from 'antd-mobile'
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';


const Item = List.Item;

export default class Chat extends Component {

  static propTypes = {
    history:PropTypes.object.isRequired,
    userChatList:PropTypes.object.isRequired,
    sendChatList:PropTypes.func.isRequired,
  };

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
    console.log(content);
    //发送数据
    this.props.sendMessage({content, from, to});

    //清空用户输入
    this.setState({
      content: ''
    })
  };


  componentDidMount() {
    this.props.sendChatList();
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight);
  }


  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight);
  }


  render() {
    const {userChatList} = this.props;
    const from = Cookies.get('userid');

    const to = this.props.match.params.id;

    const chat_id = [from,to].sort().join('-');


    if (!userChatList.users[to]){
      return null;
    }

    const targetUser = userChatList.users[to];

    //过滤掉其他消息
    const chatMsgs = userChatList.chatMsgs.filter(charMsg => charMsg.chat_id === chat_id);

    chatMsgs.sort((a,b) =>{
      return Date.parse(a.create_time) - Date.parse(b.create_time);
    });
    
    return (
      <div id='chat-page'>
        <NavBar onClick={()=> this.props.history.goBack()} icon={<Icon type="left" />}>{targetUser.username}</NavBar>
        <List>
          {
            chatMsgs.map((chatMsg,index) => {
              if (chatMsg.to === from){
                //说明其他用户发送给当前用户的
                return (
                  <Item
                    thumb={require(`../../assets/avatars/${targetUser.header}.png`)}
                    key={index}
                  >
                    {chatMsg.content}
                  </Item>
                )
              } else {
                //说明当前用户发送给其他用户的
                return (
                  <Item
                    className='chat-me'
                    extra='我'
                    key={index}
                  >
                    {chatMsg.content}
                  </Item>
                )
              }
            })
          }
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            onChange={val => this.setState({content:val})}
            value={this.state.content}
            extra={
              <span onClick={this.sendMessage}>发送</span>
            }
          />
        </div>
      </div>
    )
  }
}