import {connect} from 'react-redux';

import {sendMessage,sendChatList} from '../redux/actions';

import Chat from '../components/chat'

export default connect(
  state => ({userChatList:state.userChatList}),
  {sendMessage,sendChatList}
)(Chat);