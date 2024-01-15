import request from '@/utils/request';
// 1.热搜关键词
export const HotSong=params=>
request({
    url:'/search/hot',
    params
})
// 2.热搜关键词对应歌单
export const hotSongList=params=>
request({
    url: '/cloudsearch',
    params
})
