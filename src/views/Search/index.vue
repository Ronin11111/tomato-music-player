<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      @input="reqFn"
    >
    </van-search>
    <!-- 搜索容器 -->
    <div class="search_wrap" v-if="songList.length === 0">
      <p class="hot_title">热门搜索</p>
      <!-- 热搜词容器 -->
      <div class="hot_name_wrap">
        <!-- 热搜词标签块 -->
        <span
          class="hot_item"
          v-for="(obj, ind) in hotList"
          :key="ind"
          @click="btn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <!-- 7.4.v-if与v-else两个页面互斥 -->
    <!-- 注意：判断条件为songList是否为空 -->
    <div class="search_wrap" v-else>
      <p class="hot_title">最佳匹配</p>
      <!-- 热搜歌单容器 -->
      <div class="hot_name_wrap">
        <!-- 热搜歌单列表-->
        <!-- van-list组件：自动检测触底执行onload事件 -->
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <songItem
            v-for="obj in songList"
            :key="obj.id"
            :name="obj.name"
            size="large"
            :author="obj.ar[0].name"
            :id="obj.id"
          ></songItem>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
// 九.历史记录
// 9.1.将搜索历史存入本地并展示
// 9.2.点击即可删除/搜索

// 六.热搜关键词
// 6.1.使用vant组件-搜索组件
// 6.2.调用api接口，获取数据
// 注意：调用的接口包括：热搜关键词，热搜搜索结果
// 6.3.拿取数据，进行页面铺设小组件
// 6.4.点击小组件，内容在搜索框中显示,@click事件

// 七.点击热搜-搜索关键词
// 7.1.点击热搜关键词，发起对应的axios请求（定义单独函数），在@click函数中调用
// 7.2.将数据存在变量数组中
// 7.3.将数据v-if进行渲染，使用van-cell组件铺设热搜歌曲页面
// 7.4.热搜歌曲页面与热搜关键词页面互斥，v-if，判断条件为②中数组是否为空

// 八.搜索框搜索结果
// 8.1.给搜索框绑定input事件
// 8.2.当搜索框中值改变时，发起axios请求
// 8.3.将数据返回，铺设页面
// 8.4.判断搜索框中值是否为空,空则return,且将数据数组设为空

// 9.搜索结果-加载更多
// 9.1.使用van-list组件，自动检测触底执行onload函数
// 9.2.定义onload事件，在onload中发起axios请求，并改变传参变量offset，请求下一页数据
// 9.3.将原数据与新数据进行拼接
// 9.4.修改van-list中参数值

// 10.修复加载更多中的Bugs
// 10.1.当无数据时，提示无数据
// (1)输入框输入，无数据，不跳转页面，list=[]
// (2)触底无更多数据,提示，将finished改为True
// 10.2.当finished为True时，会导致下一次触底时也为无更多数据
// (1)将触发的数据请求事件中将finish改为false
// 10.3.三个函数中都为独立的网络请求，每次独立的网络请求结束后
// △：即将每次网络请求结束之后，将loading改为false

// 11.输入框防抖-在n秒内，只执行最后一次触发函数
// 11.1.设setTimeout()定时器，将input事件放入定时器中
// 11.2.定义变量保存设setTimeout函数
// 11.3.若变量有值，则代表input事件被触发，则清空clearTimeout()
// 注意：判断条件在11.1之前

// 12.页码bug修复
// bug：在搜索结果为加载更多时，偏移量修改，会造成切换搜索结果之后，偏移量还是从该偏移量传递数据
import { HotSongAPI, hotSongListAPI } from "@/api/index";
// 导入van-cell组件
import songItem from "@/components/songItem.vue";
export default {
  components: {
    songItem,
  },
  data() {
    return {
      value: "",
      hotList: [], //热搜关键词
      songList: [], //热搜歌单
      loading: false, //当loading为false时，van-list组件自动检测是否触底
      finished: false, //当finished为false时，为加载全部，数据加载完毕，改为true
      page: 1, //数据请求时offset属性的变量值
      timer: null, //保存setTimeout()
    };
  },

  // 6.3.调用请求，获取数据
  async created() {
    const resList = await HotSongAPI();
    console.log(resList);
    this.hotList = resList.data.result.hots;
  },

  methods: {
    // 1.点击热词
    async btn(value) {
      // 10.2.bugs：手动修改finished值
      this.finished = false;

      // 12.1.页码bugs修复
      this.page = 1;

      // 点击实现变量赋值
      this.value = value;
      // 7.3.在@click中，调用axios函数
      const lists = await this.getSongs();
      //使用await将函数返回的promise对象转为值,保存在变量中

      // 10.1.bug：当输入框中无数据，不显示数据
      if (lists.data.result.songs === undefined){
        return (this.songList = []);
      }
      console.log(lists);
      this.songList = lists.data.result.songs;
      // 10.3.数据加载完毕，将loading改为false
      this.loading = false;
    },

    // 2.封装网络请求
    async getSongs() {
      return await hotSongListAPI({
        // 7.2.传入搜索栏中对应的value值，进行axios请求传参
        keywords: this.value, //传入关键词的必选参数
        limit: 20, //条数限制
        offset: (this.page - 1) * 20, //偏移量设置
      });
      // 注意：async返回的为Promise对象，返回的为函数内return的值
      // await在async函数体内使用，返回的为后接收的promise对象的值
    },

    // 3.搜索框事件
    async reqFn() {
      // 输入框-防抖
      // 判断timer中是否有对象，有则为触发了input函数，clearTimeout
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        // 10.2.bugs：手动修改finished值
        this.finished = false;
        // 12.1.页码bugs修复
        this.page = 1;

        if (this.value.length === 0) {
          return (this.songList = []);
        }
        const lists = await this.getSongs();
        this.songList = lists.data.result.songs;
        this.loading = false;
      }, 900);
    },

    // 9.加载更多数据-onload事件
    async onLoad() {
      //van-list的onload事件中，会自动将loading改为true,当数据全部更新完毕，将其值改为false即可
      this.page++;
      const lists = await this.getSongs();
      // 10.1.bug：当触底无更多数据，提示无数据
      if (lists.data.result.songs === undefined) {
        this.finished = true; //当finished参数为true,则加载所有数据
        this.loading = false;
        return;
      }
      this.songList = [...this.songList, ...lists.data.result.songs];
      console.log(this.songList);
      this.loading = false; //将loading变量改为false,才可继续检测是否触底
    },
  },
};
</script>

<style scoped>
.van-search{
  background: #ffffffd5;
}
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.4rem;
  color: #373737;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0rem;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  background: linear-gradient(rgb(252, 133, 133),rgb(246, 162, 120),rgb(241, 232, 181));
  border-radius: 0.853333rem;
  border: 1px solid #fff;
  box-shadow:3px 3px 3px #fff;
}
</style>