<template>
  <div class="PostList">
    <!-- 
            在数据没有返回的时候，显示这个正在加载的gif
    -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/isLoading.gif">
    </div>

    <!-- 
            数据一旦返回，就显示下边这个div,这个div就是主题帖子列表
    -->
    <div class="posts" v-else>
      <ul>
        <li>
          <div class="toobar">
            <span @click="change" :class="[tab === ''?'active':'deactive']">全部</span>
            <span @click="change" :class="[tab === 'good'?'active':'deactive']">精华</span>
            <span @click="change" :class="[tab === 'share'?'active':'deactive']">分享</span>
            <span @click="change" :class="[tab === 'ask'?'active':'deactive']">问答</span>
            <span @click="change" :class="[tab === 'job'?'active':'deactive']">招聘</span>
          </div>
        </li>
        <li v-for="post in posts" :key="post.id">
          <!-- 头像 -->
          <img :src="post.author.avatar_url">
          <!--动态绑定数据，一定爱用v-bind-->
          <!-- 回复/浏览 -->
          <span class="allcount">
            <span class="reply_count">{{post.reply_count}}</span>/
            <span class="visit_count">{{post.visit_count}}</span>
          </span>
          
          <!-- 帖子的分类 -->
          <span :class="[{put_good:(post.good == true),put_top:(post.top == true),'topiclist_tab':(post.top != true&& post.good != true)}]">
            <span>{{post | tabFormat}}</span>
          </span>

          <!-- 标题 -->
          <router-link :to="{
              name:'post_content',
              params:{
                  id:post.id,
                  name:post.author.loginname
              }
          }">
            <span class="post_title">{{post.title}}</span>
          </router-link>

          <!-- 最终回复时间 -->
          <span class="last_reply">
            <!-- 管道符后边，加过滤器的名字，来确定时间 -->
            {{post.last_reply_at | formatDate}}
          </span>
        </li>


        <li>
          <!-- 分页 -->
          <Pagination @handleList="renderList"></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'
export default {
  name: "PostList",
  data() {
    return {
      // 默认没有加载
      isLoading: false,
      posts: [] ,//页面列表数组
      postpage:1,
      tab:''
    };
  },
  components:{
    Pagination
  },
  methods: {
    getData() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params:{
            page: this.postpage,
            limit: 20,
            tab:this.tab
          }
        })
        .then(res => {
          this.isLoading = false; //加载成功后，去除动画
          this.posts = res.data.data;
        })
        .catch(err => {
          // 处理返回失败后的问题
          console.log(err);
        });
    },
     change(event){
          if(event.currentTarget.innerText ==='全部'){
            this.tab = ''
          }else if(event.currentTarget.innerText ==='精华'){
            this.tab = 'good'
          }else if(event.currentTarget.innerText ==='分享'){
            this.tab = 'share'
          }else if(event.currentTarget.innerText ==='问答'){
            this.tab = 'ask'
          }else if(event.currentTarget.innerText ==='招聘'){
            this.tab = 'job'
          }else{
            
          }
          this.getData();
        },
    renderList(value){
      this.postpage = value
      this.getData();
    } 
  },
  beforeMount() {
    // getData()方法，要在页面载入之前开始执行，用beforeMount 钩子函数
    this.isLoading = true; //加载成功之前，显示加载动画
    this.getData(); //在页面加载之前，获取数据
  }
};
</script>

<style scoped>
.PostList{
    background-color: #e1e1e1;
  }
  .posts {
    margin-top: 10px;
  }

  .PostList img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;
  }

  ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
  }

  li:not(:first-child):hover {
    background: #f5f5f5;
  }

  li:last-child:hover {
    background: white;
  }

  li span {
    line-height: 30px;
  }

  .allcount {
    width: 70px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .posts .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }

  .put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

   .posts .topiclist_tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }

  .toobar {
    height: 40px;
    background-color: #f5f5f5;
  }

  .toobar .deactive {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }

  /* .toobar span:hover {
    color: #9e78c0;
  } */

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }
  .post_title{
    max-width:70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    display: inline-block;
    vertical-align: middle;
  }
  .toobar .active{
    color:#fff;
    font-size: 15px;
    background:#80bd01;
    border-radius:3px;
    padding:3px 4px;
  }
</style>


