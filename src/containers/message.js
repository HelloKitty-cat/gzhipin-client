import {connect} from 'react-redux';
//UI组件
import Message from '../components/message';
//
import {sendChatList} from '../redux/actions'

export default connect(
  state => ({userChatList:state.userChatList}),
  {sendChatList}
)(Message);