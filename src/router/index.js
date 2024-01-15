// 单独封装路由组件，在main.js中引入注册使用
import { createApp } from 'vue'
// 1.引入router和相关组件
import {createRouter,createWebHashHistory} from 'vue-router'
import Home from '@/views/Home';
import Layout from '@/views/Layout';
import Search from '@/views/Search';
import Play from '@/views/Play';  
import PlayList from '@/views/PlayList';
//自动查找文件夹下的index.vue文件

// 2.创建路由规则
const routes=[
    // 2.2.路径重定向
    {
        path:'/',
        redirect: '/layout'
    },
    {
        path:'/layout',
        component:Layout,
        // 2.3.重定向至二级路由页面
        // 注意：要补齐完整路径
        redirect:'/layout/home',
        // 2.1.创建二级路由
        children:[
            {
                path:'home',
                component:Home,
                // 3.1.给路由对象绑定title属性
                meta:{  
                    // meta中存放路由对象的额外信息
                    title:'首页'
                }
            },
            {
                path:'search',
                component:Search,
                meta:{
                    title:'搜索'
                }
            },
        ]
    },
    {
        path:'/play',
        component:Play
    },
    {
        path:'/playList/:id',
        name:'PlayList',
        component:PlayList,
        props: true  //在组件中可使用路由所传递的参数
    },
]

// 3.创建路由对象实例
const router=createRouter({
    routes,
    history:createWebHashHistory()
})

// 4.导入router对象
export default router