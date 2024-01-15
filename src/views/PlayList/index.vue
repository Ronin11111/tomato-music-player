<template>
  <div class="container">
    <van-sticky>
      <!-- 粘性布局 -->
      <van-card
        :desc="playList.description"
        :title="playList.name"
        :thumb="playList.coverImgUrl"
      >
        <!--       <template #desc>
        <van-text-ellipsis :content="playList.description" expand-text="展开" collapse-text="收起" />
      </template> -->
        <template #tags>
          <van-tag
            plain
            type="primary"
            class="tags-item"
            v-for="(item, ind) in tags"
            :key="ind"
            >{{ item }}</van-tag
          >
        </template>
        <template #price>
          <van-icon
            name="arrow-left"
            class="backIcon"
            size="0.6rem"
            @click="$router.back()"
          />
        </template>
        <template #bottom>
          <van-image
            class="avatar"
            width=".8rem"
            height=".8rem"
            round
            fit="cover"
            :src="avatarImg"
          />
          <span class="avatar-name">{{ nickname }}</span>
        </template>
      </van-card>
    </van-sticky>

    <div>
      <van-cell title="全部歌曲" class="title" />
      <songItem
        v-for="(obj, ind) in songLists"
        :key="ind"
        :name="obj.name"
        :author="obj.author"
        :id="obj.id"
      ></songItem>
    </div>
  </div>
</template>

<script>
// 推荐歌单页面
// 1.点击对应歌单，实现页面路由跳转
// 2.在created阶段，发起axios请求，请求对应歌单数据
// 3.获取对应歌单中的歌曲内容，v-for使用歌单组件，进行页面渲染
import songItem from "@/components/songItem.vue";
import { playListAPI } from "@/api/index";
import router from "@/router";

export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
      tags: [],
    },
  },
  data() {
    return {
      songLists: [],
      playList: [],
      avatarImg:'',
      nickname:''
    };
  },
  components: {
    songItem,
  },
  created() {
    // 发起歌单数据请求
    this.getList(this.id);
  },
  methods: {
    async getList(listId) {
      try {
        const { data } = await playListAPI(listId);
        // this.songLists = data.data.results;
        console.log(data);
        this.playList = data.playlist;
        this.tags = this.playList.tags;
        this.songLists = data.playlist.tracks;
        this.avatarImg=data.playlist.creator.avatarUrl;
        this.nickname=data.playlist.creator.nickname
      } catch (err) {
        console.log("请求歌单失败", err);
      }
    },
  },
};
</script>

<style scoped>
.backIcon {
  position: relative;
  top: -4.1rem;
  left: -3.6rem;
  color: rgb(250, 247, 220);
}
.tags-item {
  margin-right: 0.1rem;
  padding-top: 0.025rem;
  padding-bottom: 0.025rem;
}
/deep/.van-card__title,
/deep/.van-card__desc {
  margin-bottom: 0.2rem;
}
/deep/.van-card__desc {
    color: #724242;
}
.van-card {
  border-radius: 0 0 0.8rem 0rem;
  background: #f79e9e;
  height: 4.7rem;
}
/deep/.van-card__header {
  padding-top: 1rem;
}
/deep/.van-card__thumb {
  margin-left: 0.7rem;
  margin-right: 0.3rem;
  height: 4rem;
  width: 2.5rem;
}
/deep/.van-card__title {
  font-size: 0.4rem;
}
/deep/.van-tag--primary.van-tag--plain {
    color: #71610f;
}
.title {
  font-size: 0.43rem;
  margin-top: 0.7rem;
  font-weight: 540;
}
.avatar{
  top:-0.47rem;
  left: -0.4rem;
  border: .05rem solid rgb(254, 254, 0) 
}
.avatar-name{
  position: relative;
  top: -.85rem;
  left: -0.2rem;
  color: #2f2525;
  font-size: .32rem;
}
</style>
