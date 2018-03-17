import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import { Switch,Route } from 'react-router-dom';
import NavLinkBar from '../navlink/navlink';
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';
import Msg from '../msg/msg';
import { getMsgList,recvMsg } from '../../redux/chat.redux';

@connect(
  state=>state,
  {getMsgList,recvMsg}
)
class DashBoard extends Component {
  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
    // if(!this.props.chat.chatmsg.length){
    //   this.props.getMsgList()
    //   this.props.recvMsg()
    // }
  }
  render(){
    const {pathname}=this.props.location
    const user=this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type=='genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type=='boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },{
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    let title = 'kong'
    return (
      <div>
        <NavBar className="fixd-header" mode='dard'>{title}</NavBar>
        <div className="page-content">
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}
export default DashBoard;
