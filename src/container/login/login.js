import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List,InputItem, WingBlank, WhiteSpace,Button} from 'antd-mobile'
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import HocForm from '../../component/hoc-form/hoc-form';

// function hello () {
//     console.log('hello react');
// }
// function WrapperHello (fn) {
//   return function(){
//       console.log('before say hello');
//       fn()
//       console.log('after say hello');
//   }
// }
// hello = WrapperHello(hello)
// hello()
// class Hello extends React.Component{
//   render(){
//     return <h2>hello react</h2>
//   }
// }
// 属性代理 反向继承
// // function WrapperHello (Comp) {
//   class WrapComp extends Comp{
//    componentDidMount(){
//      console.log('新增的生命周期')
//    }
//     render(){
//       return (<div>
//         <p>这HOC高阶组件特有的元素</p>
//         <Comp name='text' {...this.props}></Comp>
//       </div>)
//     }
//   }
//   return WrapComp
// }
// function WrapperHello (Comp) {
//   class WrapComp extends React.Component{
//     render(){
//       return (<div>
//         <p>这HOC高阶组件特有的元素</p>
//         <Comp name='text' {...this.props}></Comp>
//       </div>)
//     }
//   }
//   return WrapComp
// }
// Hello = WrapperHello(Hello)

// @WrapperHello
// class Hello extends React.Component{
//   render(){
//     return <h2>hello react</h2>
//   }
// }
@connect(
  state=>state.user,
  {login}
)
@HocForm
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    console.log(this.props);
  }
  register(){
    this.props.history.push('/register')
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render(){
    return (
      <div>
        {this.props.redirectTo&&this.props.redirectTo!=  './login'?<Redirect to={this.props.redirectTo} />:null}
        <Logo />
        {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
        <WingBlank>
          <List>
            <InputItem
              onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <InputItem
              onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
          </List>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login;
