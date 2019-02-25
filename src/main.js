// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'   //引入axios,路由 这些全局使用的东西，都是在main.js中引入的



Vue.prototype.$http = Axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 设置一个全局过滤器，来显示时间
Vue.filter('formatDate',function(str){
  if(!str) return ''
  var date = new Date(str);  
  var time = new Date().getTime()- date.getTime()  //现在事件 - 传入事件 = 相差时间
  if(time<0){
    return ''
  }else if((time/1000)<30){
    return '刚刚'
  }else if((time/1000)<60){
    return parseInt(time / 1000)+'秒前'
  }else if((time/60000)<60){
    return parseInt(time / 60000)+'分钟前'
  }else if((time/3600000)<24){
    return parseInt(time/3600000)+'小时前'
  }else if((time/86400000)<31){
    return parseInt(time / 86400000)+'天前'
  }else if((time/2592000000)<12){
    return parseInt(time / 2592000000)+'月前'
  }else{
    return parseInt(time/31104000000)+'年前'
  }
})

// 这个过滤器 处理显示板块的文字 
Vue.filter('tabFormat',function(post){
  if(post.top == true){
    return '置顶'
  }else if(post.good == true){
    return '精华'
  }else if(post.tab == 'ask'){
    return '问答'
  }else if(post.tab == 'share'){
    return '分享'
  }else{
    return '招聘'
  }
})
