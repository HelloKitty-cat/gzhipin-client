import {connect} from 'react-redux';

import {sendMessage,sendChatList,updateUnReadCount} from '../redux/actions';

import Chat from '../components/chat'

export default connect(
  state => ({userChatList:state.userChatList}),
  {sendMessage,sendChatList,updateUnReadCount}
)(Chat);