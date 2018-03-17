import React from 'react';
import { List,InputItem,NavBar,Icon,Grid } from 'antd-mobile';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getMsgList,sendMsg,recvMsg,readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util';
const socket = io('ws://localhost:9093')

@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component {
  constructor(){
    super()
    this.state={
      msg: [],
      text:"",
      showEmoji: false
    }
  }
  componentDidMount() {
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount() {
    const to= this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel(){
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 0);
  }
  handleSubmit(){
    // 发送信息到后端
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
  }
  render(){
    const emoji = '😂 😍 🔥 🤔 😊 🙄 😘 😂 😍 🔥 🤔 😊 🙄 😘 😂 😍 🔥 🤔 😊 🙄 😘 😂 😍 🔥 🤔 😊 🙄 😘 😂 😍 🔥 🤔 😊 🙄 😘 😂 😍 🔥 🤔 😊 🙄 😘'.split(' ').filter(v=>v).map(v=>({text:v}))
    const userid= this.props.match.params.user
    const Item = List.Item
    const users= this.props.chat.users
    const chatid = getChatId(userid,this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
    if(!users[userid]){
      return null
    }
    return (
      <div id="chat-page">
        <NavBar mode='dark' icon={<Icon type="left" />}
        onLeftClick={()=>{
          this.props.history.goBack()
        }}>
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v=>{
          const avatar = users[v.from].avatar?require(`../img/${users[v.from].avatar}.png`):null
          return v.from==userid?(
            <List key={v._id}>
              <Item
                thumb={avatar}>{v.content}</Item>
            </List>
          ):(
            <List key={v._id}>
              <Item className='chat-me'
                extra={<img src={avatar} />}>{v.content}</Item>
            </List>
          )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value={this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra={
                <div>
                  <span onClick={()=>{
                    this.setState({
                      showEmoji: !this.state.showEmoji
                    })
                    this.fixCarousel()
                  }} style={{marginRight: '15px'}}>😂</span>
                  <span onClick={()=>this.handleSubmit()}>发送</span>
                </div>
                }
              >
            </InputItem>
          </List>
          {
            this.state.showEmoji?
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el=>{
                this.setState({
                  text:this.state.text+el.text
                })
              }}
            />
            :null
          }
        </div>
      </div>
    )
  }
}
export default Chat;
