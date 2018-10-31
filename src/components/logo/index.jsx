import React, {Component} from 'react';

import job from './job.png';
import './index.less';

class Logo extends Component {
  render() {
    return (
      <div className='logo-container'>
        <img src={job} alt="job"/>
      </div>
    )
  }
}

export default Logo;