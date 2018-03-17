import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Grid,List } from 'antd-mobile';
class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(){
    super()
    this.state={
      icon: '',
      text: ''
    }
  }
  render(){
    const avatarList = 'android,behance,Dribbble,facebook,google-plus,instagram,linkedin,pinterest,rss,skype,thumblr,yahoo,youtube'.split(',')
    .map(v=>({
      icon:require(`../img/${v}.png`),
      text:v
    }))
    const gridHeader = this.state.icon?(<div>
      <span>已选择头像</span>
      <img style={{width:20}} src={this.state.icon} />
    </div>)
    :'请选择头像'
    return(
      <div style={{marginTop: '45px'}}>
        <List renderHeader={()=>gridHeader}>
        <Grid data={avatarList} columnNum={5}
        onClick={ele=>{
          this.setState(ele)
          this.props.selectAvatar(ele.text)
        }}/>
        </List>
      </div>
    )
  }
}
export default AvatarSelector;
