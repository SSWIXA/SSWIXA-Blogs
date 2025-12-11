// src/axios.ts  
import axios from 'axios';  
  
const instance = axios.create({  
  baseURL: 'http://localhost:5000/api', // 修改为基础 URL 指向后端 API  
  timeout: 5000, // 请求超时时间  
  // 其他 Axios 配置...  
});  
  
export default instance;