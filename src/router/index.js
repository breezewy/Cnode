import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfor from '../components/UserInfor'
import SlideBar from '../components/SlideBar'


Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root',
      path:'/',
      components:{
        main:PostList
      }
    },
    {
      name:'post_content',
      path:'/topic/:id&author=:name',
      components:{
        main:Article,
        slidebar:SlideBar
      }
    },
    {
      name:'user_infor',
      path:'/userinfor/:name',
      components:{
        main:UserInfor
      }
    }
  ]
})
