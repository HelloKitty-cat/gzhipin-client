import {connect} from 'react-redux';
import navlist from '../components/nav-list';
import {withRouter} from 'react-router-dom';
import {sendChatList} from '../redux/actions';

export default withRouter(connect(
  state => ({}),
  {sendChatList}
)(navlist));