import {connect} from 'react-redux';
//UI组件
import Laoban from '../components/laoban';

import {getUserList} from '../redux/actions';

export default connect(
  state => ({userList:state.userList}),
  {getUserList}
)(Laoban);