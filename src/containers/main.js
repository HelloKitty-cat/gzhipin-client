import {connect} from 'react-redux';

import Main from '../components/main'
import {getUserInfo} from '../redux/actions';

export default connect(
  state => ({users:state.users}),
  {getUserInfo}
)(Main);