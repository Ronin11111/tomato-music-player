// 3.2.在api/文件.js中封装具体的请求和请求方法
// 作用：对组件页面中所需的网络请求都单独封装，文件名一一对应
import request from '@/utils/request';
// 按需导出
// 导出对象为函数，即为实际发送请求的axios方法
// 本地浏览器对代理服务器发送的请求都为get请求，实际请求会有服务器自行选择
// 本地所传的数据，都在params变量中存放提交

// 1.推荐歌单的网络请求
export const Recommend=params=>
    request({
        url: '/personalized',
        params  //文档中可传参数为{limit：}
    })

// 2.获取最新音乐的网络请求
export const songList=params=>
    request({
        url:'/personalized/newsong',
        params
    })
