// src/axios.ts  
import axios from 'axios';  
  
const instance = axios.create({  
  baseURL: 'http://rap2api.taobao.org/app/mock', // 替换为你的基础 URL  
  timeout: 5000, // 请求超时时间  
  // 其他 Axios 配置...  
});  
  
export default instance;