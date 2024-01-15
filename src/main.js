import { createApp } from 'vue'
import App from './App.vue'
import '@/mobile/flexible';  //浏览器适配插件（js文件，路径名webpack自动补充）
import '@/styles/reset.css'
// 导入icon的css文件
import "@/styles/icon.css";
// 1.5.引入路由对象
import router from '@/router/index';
// 二.导入vant组件
// 2.1.tabbar组件
import { Tabbar, TabbarItem ,NavBar, Col, Row ,Image as VanImage,Cell,Icon,Search ,List ,Card ,Sticky,Tag } from 'vant';

// 3.4.对封装的网络请求模块在main.js中引入
import {RecommendAPI} from '@/api/index';
// 测试请求数据是否成功
async function myFn(){
    // 注意：axios是使用promise封装的方法，所以得到的数据为promise对象
    const data=await RecommendAPI({limit:20})
    console.log(data);
}
// 注意调用函数
myFn()

// 1.6.注册在app上
createApp(App).use(router).use(Tabbar).use(TabbarItem).use(NavBar).
use(Col).use(Row).use(VanImage).use(Cell).use(Icon).use(Search).use(List).use(Card ).use(Sticky).use(Tag).mount('#app')
