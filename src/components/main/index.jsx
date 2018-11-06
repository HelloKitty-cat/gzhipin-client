import React, {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Cookie from 'js-cookie';
import {NavBar,Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import LaobanInfo from '../../containers/laoban-info';
import DashenInfo from '../../containers/dashen-info';
import Laoban from '../../containers/laoban';
import Dashen from '../../containers/dashen';
import Message from "../../containers/message";
import Personal from "../../containers/personal";
import Chat from '../../containers/chat'
import getRedirectPath from '../../utils'
import NavFooter from '../navfooter'




class Main extends Component {

  static propTypes = {
    users:PropTypes.object.isRequired,
    getUserInfo:PropTypes.func.isRequired
  };

  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ];

  render() {

    //1.本地没有cookie,直接访问网址，跳转到登录
    const userid = Cookie.get('userid');
    if (!userid){
      return <Redirect to='/login'/>
    }
    //2.本地有cookie,redux中没有状态(y用户登录了,但是用户刷新了页面)，根据cookie发送ajax请求当前的状态数据，保存在redux中
    const {users} = this.props;
    if (!users._id){
      this.props.getUserInfo();
      return  <Icon type='loading' size='large' style={{position:'absolute',top:0,left:0,bottom:0,right:0,margin:'auto',width:'50px',height:'50px'}}></Icon>
    }
    //3.本地有cookie，直接使用

    const {pathname} = this.props.location;   //获取页面的路由地址

    if (pathname === '/'){
        return <Redirect to={getRedirectPath(users.type,users.header)}/>
    }

    const {navList} = this;

    if (users.type === 'dashen'){
      navList[0].hide = true;
    }else if (users.type === 'laoban'){
      navList[1].hide = true;
    }

    //找到路由路径对于的nav对象
    const current = this.navList.find(nav => pathname===nav.path);

    return (
      <div >
        {current ? <NavBar className='navBar-header'>{current.title}</NavBar> : ''}
        <div style={{ paddingTop: '50px',paddingBottom:'60px'}}>
          <Switch>
            <Route path='/laobanInfo' component={LaobanInfo}/>
            <Route path='/laoban' component={Laoban}/>
            <Route path='/dashenInfo' component={DashenInfo}/>
            <Route path='/dashen' component={Dashen}/>
            <Route path='/message' component={Message}/>
            <Route path='/personal' component={Personal}/>
            <Route path='/chat/:id' component={Chat} />
          </Switch>
        </div>
        {current ? <NavFooter navList={this.navList}/> : ''}
      </div>
    )
  }
}

export default Main;