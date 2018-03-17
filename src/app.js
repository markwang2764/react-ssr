import React from 'react';
import { Route, Switch } from 'react-router-dom'


import Login from './container/login/login'
import Regiter from './container/register/register'
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo';
import DashBoard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';
import './config'
import './index.css'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      err:false
    }
  }
  componentDidCatch(err,info){
    this.setState({err:true})
  }
  render(){
    return this.state.err
    ?
    <h2>页面出错了</h2>
    :
    (
      <div>
        <AuthRoute />
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Regiter}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={DashBoard}></Route>
        </Switch>
      </div>
    )
  }
}
export default App;
