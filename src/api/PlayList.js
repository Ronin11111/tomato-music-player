import request from '@/utils/request';

// 请求推荐歌单列表
export const playList=(id)=>
request({
    method:'get',
    url:`/playlist/detail?id=${id}`,
})