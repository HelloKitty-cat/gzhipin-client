import {connect} from 'react-redux';

//引入UI组件
import Login from '../components/login'

//引入actions
import {login} from '../redux/actions';

export default connect(
  state => ({users:state.users}),  //状态数据
  {login}   //操作状态数据的方法
)(Login);