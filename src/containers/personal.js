import {connect} from 'react-redux';
//UI组件
import Personal from '../components/personal';

import {sendChatList, updateErr} from '../redux/actions';

export default connect(
  state => ({users:state.users}),
  {updateErr,sendChatList}
)(Personal);