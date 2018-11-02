import {connect} from 'react-redux';

//引入UI组件
import Register from '../components/register'

//引入actions
import {register} from '../redux/actions';

export default connect(
  state => ({users:state.users}),  //状态数据
  {register}   //操作状态数据的方法
)(Register);