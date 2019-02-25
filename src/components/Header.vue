
<!--
    template下边,有且只能有一个跟组件
-->
<template>
    <div class="header">
        <router-link :to="{name:'root'}">
            <img src="../assets/cnodejs_light.svg" alt="">
        </router-link>
        <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">新手入门</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">关于</a></li>
            <li><a href="#">注册</a></li>
            <li><a href="#">登录</a></li>
        </ul>
        
    </div>
</template>

<script>
export default {
    name:'Header'
}
</script>

<style scoped>  
/* style 后边跟 scoped  表示这里的样式只对当前组件有效，如果不加就会对整个应用都有效 */
.header{
    background-color:#444;
    height:50px;
    padding:0 120px
}

img{
    max-width:120px;
    margin-top: 10px;
}
ul{
    list-style:none;
    float:right;
    margin:4px;
}
li{
    display:inline-block;
    padding:10px 15px;
}
a{
    text-decoration:none;
    color:#ccc;
    font-size: 14px;
    text-shadow:navy;
}
</style>



