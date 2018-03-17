import express from 'express'
const bodyParser = require('body-parser')
const cookieParser=require('cookie-parser')
const model = require('./model')
import path from 'path'
const Chat = model.getModel('chat')
// github.com/css-modules-require-hook/preset
import csshook from 'css-modules-require-hook/preset'
// github.com/asset-require-hook
import assethook from 'asset-require-hook';
assethook({
  extensions: ['png','gif']
})
import staticPath from '../build/asset-manifest.json'

const app = express()
//work with express
const server=require('http').Server(app)
const io = require('socket.io')(server)
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../src/app';
import reducers from '../src/reducer';
import {renderToString,renderToNodeStream} from 'react-dom/server'
io.on('connection',function(socket){
  //监听当前msg
  socket.on('sendmsg',function(data){
    const {from,to,msg}=data
    const chatid= [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function(err,doc){
      // 拿到信息广播到全局
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
app.use(function(req,res,next){
  if(req.url.startsWith('/user/')||req.url.startsWith('/static')){
    return next()
  }
  const store = createStore(reducers,compose(
    applyMiddleware(thunk)
  ))
  let context = {}
  // const markup = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter
  //       location={req.url}
  //       context={context}
  //       >
  //       <App></App>
  //     </StaticRouter>
  //   </Provider>
  // )
  const obj={
    '/msg':'React聊天消息列表',
    '/boss': 'boss查看牛人列表页'
  }
    res.write(  `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width,height=device-height, user-scalable=no,initial-scale=1, minimum-scale=1, maximum-scale=1,target-densitydpi=device-dpi ">
          <meta name="theme-color" content="#000000">
          <title>React App</title>
          <link rel="stylesheet" href="/${staticPath['main.css']}">
          <meta name='keywords' content='React,Redux,Imooc,聊天,SSR'>
          <meta name='description' content='${obj[req.url]}'>
          <meta name='author' content='Imooc'>
        </head>
        <body>
          <div id="root">`)
    const markupStream = renderToNodeStream(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
          >
          <App></App>
        </StaticRouter>
      </Provider>
    )
    markupStream.pipe(res,{end:false})
    markupStream.on('end',()=>{
      res.write(`
          </div>
            <script src="/${staticPath['main.js']}"></script>
          </body>
          </html>
          `)
    res.end()
    })

  // res.sendFile(path.resolve('build/index.html'))
 })
app.use('/',express.static(path.resolve('build')))


server.listen(9093,function(){
  console.log('node app start 9093');
})
