import React, {Component} from 'react';
import {Grid,List} from 'antd-mobile';

class Headportrait extends Component {

  state = {
    icon:null
  };

  chooseHead = ({icon,text}) =>{
    this.setState({
      icon
    });
    this.props.changeHeader(text);
  };

  render() {
    const data = Array.from(new Array(20)).map((item, index) => ({
      icon: require(`./avatars/头像${index+1}.png`),
      text: `头像${index+1}`,
    }));
    const {icon} = this.state;
    const headerShow = icon ? <div>已选择头像<img src={icon}/></div> : '请选择头像';
    return (
        <List renderHeader={() => headerShow }>
        <Grid data={data}  columnNum={5} onClick={this.chooseHead}/>
        </List>
    )
  }
}
export default Headportrait ;