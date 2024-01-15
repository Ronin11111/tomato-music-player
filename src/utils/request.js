// 三.将网络进行请求封装
// 作用：便于修改，将代码模块化，不接触底层的逻辑代码
// 3.1.在utils/request.js中，对axios进行二次封装，封装根路径
import axios from 'axios';
// import {JSONBig} from 'json-bigint';

// 定义网络请求的基路径
const request=axios.create({baseURL:"http://localhost:3000"})
// axios.defaults.transformResponse = [
//     // data即为JSON格式字符串
//     function(data){
//       try{
//         return JSONBig.parse(data)
//       }
//       catch(err){
//         return data
//       }
//     }
//   ];
// 对外导出请求对象
export default request