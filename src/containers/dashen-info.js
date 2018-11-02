import {connect} from 'react-redux';
//UI组件
import DashenInfo from '../components/dashenInfo';
//
import {updateDashen} from '../redux/actions';

export default connect(
  state => ({users:state.users}),
  {updateDashen}
)(DashenInfo);