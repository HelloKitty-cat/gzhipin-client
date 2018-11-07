import {connect} from 'react-redux';
import navfooter from '../components/navfooter';
import {withRouter} from 'react-router-dom';

export default withRouter(connect(
  state => ({unReadCount:state.userChatList.unReadCount}),
  {}
)(navfooter));