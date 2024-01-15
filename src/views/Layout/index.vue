<template>
  <div class="container">
    <!-- 2.3.Navbal头部导航使用 -->
    <!-- 注意：头部导航需要使用fixed固定，且脱离文档流 -->
    <!-- 同时：组件挂载点部分设定上下边距，避免被遮挡 -->
    <van-nav-bar :title="actTitle" round fixed/>
    <!-- 2.2.tabbal导航栏的使用 -->
    <van-tabbar route>
      <van-tabbar-item class="home" replace to="/layout/home" @click="active=1"> 
        <template #icon> 
          <i :class="active?'tomatto fanqie':'tomatto fanqie1'"></i>
        </template>
        首页</van-tabbar-item>
      <van-tabbar-item class="search" replace to="/layout/search" @click="active=0">搜索
        <template #icon> 
          <i :class="!active?'tomatto fanqie':'tomatto fanqie1'"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 1.8.挂载二级路由 -->
    <router-view class="main"></router-view>
  </div>
</template>

<script>

export default {
  // 3.实现导航栏切换效果
  // 3.1.在路由对象上使用meta属性，在其中定义title属性
  // 3.2.给title添加动态属性,:title
  // 3.3.定义title变量，赋默认值
  // 3.4.侦听$route的改变，将其上的title值同步赋值给导航栏

  data () {
    return {
      // 3.3.定义title默认值
      actTitle:this.$route.meta.title,
      active:1,
    }
  },
  // 3.4.侦听$route的变化，并赋值给navbal
  watch: {
    $route(){
      this.actTitle=this.$route.meta.title
    }
  },
  setup() {
    const onClickLeft = () => history.back();
    return {
      onClickLeft,
    };
  },
  }

</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.container{
  background: rgba(250, 248, 227, 0.741);
}
.main {
  padding-top: 0.58rem;
  padding-bottom: 1.2rem;
}
.van-nav-bar{
  background: #f79e9e
}
.van-tabbar-item{
  background: #f79e9e
}
.home{
  border-radius: 0.25rem 0 0 0;
  font-size: 0.3rem;
}
.search{
  border-radius: 0 0.25rem 0 0;
}
.main{
  padding-top:1.1rem;
}
/deep/.van-nav-bar__title{
  font-size: .46rem;
}
.tomatto{
  font-size: 0.56rem;
}
</style>