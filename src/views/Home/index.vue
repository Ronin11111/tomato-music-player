<template>
  <div>
    <div>
      <p class="title">推荐歌单</p>
      <!-- 4.2.引入元素间距layout组件 -->
      <van-row gutter="7">
        <!--gutter设置元素间间距-->
        <keep-alive>
          <van-col span="8" v-for="obj in arrList" :key="obj.id" @click="listPlay(obj.id)">
          <!-- 4.3.引入图片组件(填充模式) -->
          <van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
          <p class="song_name">{{ obj.name }}</p>
        </van-col>
        </keep-alive>
      </van-row>
    </div>
    <div>
      <p class="title">最新音乐</p>
        <songItem
          v-for="obj in songList"
          :key="obj.id"
          :name="obj.name"
          size="large"
          :author="obj.song.artists[0].name"
          :id="obj.id"
        ></songItem>
    </div>
  </div>
</template>

<script>
// 四.铺设歌单页面
// 4.1.使用vant组件-使用van-row,van-col布局页面
// 注意：v-row是行数，可将van-col布局在一行中，会默认分行显示
// 4.2.van-image显示图片
// 4.3.调整样式，即间距，图片大小等
// 4.4.引入api数据请求的方法并调用,获取数据
// 4.5.将获取的数据在页面中v-for循环显示，铺设页面

// 五.最新音乐单元格铺设
// 5.1.使用vant组件-使用cell单元格铺设
// 5.2.调整样式,自定义组件内标签-使用插槽技术
// 5.3.调用api方法，获取数据
// 5.4.v-for铺设数据

// 4.3.导入api方法
import { RecommendAPI, songListAPI } from "@/api/index";
// 导入van-cell组件,并在components中注册
import songItem from "@/components/songItem.vue";

export default {
  components:{
    songItem
  },
  data() {
    return {
      arrList: [],
      songList: [],
    };
  },
  // 注意：api请求挂载在created阶段
  async created() {
    // 提示：在created中再定义函需要单独调用
    // 自己的做法：
    /* async function request(){
      const RecommendDate= await RecommendAPI({limit:6})
      console.log(RecommendDate);
    }
    request() */
    // 推荐：直接在created中赋值使用，省去函数的定义和调用
    const resData = await RecommendAPI({ limit: 6 }); //传参显示数据条数
    console.log(resData);
    // 将获取的数据赋值给变量，循环显示
    this.arrList = resData.data.result;

    // 5.2.获取最新音乐的网络请求
    const resSong = await songListAPI({ limit: 10 });
    console.log(resSong);
    this.songList = resSong.data.result;
  },
  methods:{
    // 实现编程式路由跳转
    listPlay(listid){
      this.$router.push({
        name:"PlayList",
        params:{
          id:listid
        } //传递歌单ID
      })
    }
  }
};
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #fff;
  color: #1d1c1c;
  font-size: 0.42rem;
  font-weight: 600;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
div .van-cell {
  border-bottom: 0.02rem solid #fff;
}
</style>