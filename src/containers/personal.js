import {connect} from 'react-redux';
//UI组件
import Personal from '../components/personal';
//

export default connect(
  state => ({users:state.users}),
  {}
)(Personal);