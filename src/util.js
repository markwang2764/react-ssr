export function getRedirectPath ({type,avatar}) {
  let url = (type==='boss')?'/boss':'/genius'
  if(!avatar){
    url += 'info'
  }
  return url
}
export function getChatId (userId,targetId) {
  return [userId,targetId].sort().join('_')
}
//递归对比 复杂度太高 不可接受
//react建议 只做浅层对比
// import {Map,is} from 'immutable';
// let obj = Map({name:1,title:'imooc'})
// let obj1 = Map({name:1,title:'imooc'})
// console.log((is(obj,obj1)));
// immutable优点
// 1.减少内存使用
// 2.并发安全
// 3.降级项目复杂度
// 4.便于比较复杂数据 定制shouldComponentUpdate
// 5.时间旅行功能方便
// 6.函数式编程
// 缺点：
// 1.学习成本
// 2.库的大小
// 3.对先有项目入侵严重
// 新项目使用 老项目评估再用
export function compareObj(obj1,obj2){
  if(obj1==obj2){
    return true
  }
  if(Object.keys(obj1).length!==Object.keys(obj2).length){
    return false
  }
  for(let k in obj1){
    if(typeof obj1[k]=='object')
    {
      return compareObj(obj1[k],obj2[k])
    }
    else if(obj1[k]!==obj2[k])
    {
      return false
    }
  }
  return true
}
