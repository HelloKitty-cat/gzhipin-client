import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
const Item = TabBar.Item;

class NavFooter extends Component {
  static propTypes = {
    navList:PropTypes.array.isRequired
  };
  render() {
    const {pathname} = this.props.location;

    //接收props数组
    const navList = this.props.navList.filter(nav => !nav.hide);  //过滤掉hide为true的,不显示

    return (
      <TabBar>
        {navList.map((item,index) => <Item
        key={index}
        title={item.title}
        icon={{uri: require(`./images/${item.icon}.png`)}}  //icon	默认展示图片
        selectedIcon={{uri:require(`./images/${item.icon}-selected.png`)}}  //selectedIcon	选中后的展示图片
        selected={pathname === item.path}   //selected	是否选中
        onPress={() => this.props.history.replace(item.path)}
        ></Item>)
        }
      </TabBar>
    )
  }
}
//将当前组件包装成路由组件返回，就有三个属性
export default withRouter(NavFooter);