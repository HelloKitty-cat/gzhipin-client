import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'antd-mobile';

import {HashRouter,Switch,Route} from 'react-router-dom';
import Login from './components/login';
import Main from './components/main';
import Register from './components/register';
import {Provider} from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route component={Main}/> {/* 当我输入的路由地址不匹配时，默认跳转main界面*/}
        </Switch>
      </HashRouter>
    </Provider>
    )
  , document.getElementById('root'));


