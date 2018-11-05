/*
用户个人中心路由组件
 */
import React from 'react'
import {Result, List, WhiteSpace, Button,Modal} from 'antd-mobile'
import Cookie from 'js-cookie';
import PropTyeps from 'prop-types';


const Item = List.Item;
const Brief = Item.Brief;

export default class Personal extends React.Component {2

  static propTypes ={
    updateErr:PropTyeps.func.isRequired,
    history:PropTyeps.object.isRequired
  };

  logout = () => {
    Modal.alert('退出登录', '你确认退出登录?', [
      {
        text: '取消', onPress: () => {
        }
      },
      {
        text: '确认', onPress: () => {
          //清除cookie
          Cookie.remove('userid');
          //
          this.props.updateErr({});
          //在重定向到登录
          this.props.history.replace('/login')
        }
      },
    ])
  };

  render() {
    const {users} = this.props;
    return (
      <div>
        <Result
          img={<img src={require(`../../assets/avatars/${users.header}.png`)} style={{width: 50}} alt="header"/>}
          title={users.username}
          message={users.company}
        />

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {users.post}</Brief>
            <Brief>简介: {users.info}</Brief>
            {users.salary ? <Brief>薪资: {users.salary}</Brief> : ''}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>退出登录</Button>
        </List>
      </div>
    )
  }
}