import React, { Component } from 'react';
import axios from 'axios'

import UserCard from '../usercard/usercard';
import {connect} from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux';
@connect(
  state=>state.chatuser,
  {getUserList}
)
class Genius extends Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render(){
    return (
      <UserCard userlist={this.props.userList}/>
    )
  }
}
export default Genius;
