import React from 'react';
import { List,Badge } from 'antd-mobile';
import { connect } from 'react-redux';
@connect(
  state=>state
)
class Msg extends React.Component {
  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = a[a.length-1].create_time
      const b_last = b[b.length-1].create_time
      return b_last - a_last
    })
    return (
      <div>
        <List>
          {
            chatList.map(v=>{
              const lastItem = v[v.length-1]
              const targetId = v[0].from==userid?v[0].to:v[0].from
              const unreadNum=v.filter(v=>!v.read&&v.to==userid).length
              if(!userinfo[targetId]){
                return null
              }
              // const name = userinfo[targetId] && userinfo[targetId].name
              // const avatar = userinfo[targetId] && userinfo[targetId].avatar
              return (
                <Item
                  extra={<Badge text={unreadNum} />}
                  key={lastItem._id}
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                  arrow="horizontal"
                  onClick={()=>{
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                  >
                  {lastItem.content}
                  <Brief>{userinfo[targetId].name}</Brief>
                </Item>
              )
            })
          }
        </List>
      </div>
    )
  }
}
export default Msg;
