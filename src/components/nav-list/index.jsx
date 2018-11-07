/*
用户列表的UI组件
 */
import React from 'react'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import PropTypes from 'prop-types';
const Header = Card.Header;
const Body = Card.Body;

class UserList extends React.Component {

 static propTypes = {
   item:PropTypes.object.isRequired,
   sendChatList:PropTypes.func.isRequired
 };
 componentDidMount (){
   this.props.sendChatList();
 }

  render() {
    const {header,username,post,company,salary,info,_id} = this.props.item;
    return (
      <WingBlank>
        <div onClick={() => this.props.history.push(`/chat/${_id}`)}>
          <WhiteSpace/>
          <Card>
            <Header
              thumb={ header ? require(`../../assets/avatars/${header}.png`) : ''}
              extra={username}
            />
            <Body>
            <div>职位: {post}</div>
            {company ? <div>公司: {company}</div> : ''}
            {salary ? <div>月薪: {salary}</div> : ''}
            <div>描述: {info}</div>
            </Body>
          </Card>
        </div>
      </WingBlank>
    )
  }
}

export default UserList;