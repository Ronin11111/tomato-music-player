<template>
  <div>
    <!-- 12.将van-cell进行单独封装，在主页和搜索部分导入复用 -->
    <van-cell center :title="name" size="large" :label="author + ' - ' + name">
      <!-- 注意：拼接字符串 -->
      <!-- 自定义组件内标签-插槽技术 -->
      <!-- 自定义右侧图标 ，引入icon组件库-->
      <!-- 注意：插槽部分使用双标签包括 -->
      <template #right-icon>
        <i class="tomatto fanqie" @click="play"></i>
      </template>
    </van-cell>
  </div>
</template>

<script>
import router from "@/router";

export default {
  props: {
    name: String,
    author: String,
    id: Number,
  },
  methods: {
    play() {
      this.$router.push({
        path: "/play",
        query: {
          id: this.id, // 歌曲id, 通过路由跳转传递过去
        },
      });
    },
  },
};
</script>

<style scoped>
.van-cell {
  border-bottom: 0.013rem solid rgba(170, 170, 169, 0.769);
}
.tomatto{
  font-size: 0.47rem;
}

</style>