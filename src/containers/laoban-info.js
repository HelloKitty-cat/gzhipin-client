import {connect} from 'react-redux';
//UI组件
import LaobanInfo from '../components/laobanInfo';
//
import {update} from '../redux/actions';

export default connect(
  state => ({users:state.users}),
  {update}
)(LaobanInfo);