// src/axios.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 10000, // 增加超時時間到 10 秒
  headers: {
    'Content-Type': 'application/json'
  }
});

// 請求攔截器 - 添加認證 token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 響應攔截器 - 統一處理 API 響應格式和錯誤
instance.interceptors.response.use(
  (response) => {
    // 如果後端返回了統一格式，提取 data 字段
    if (response.data && typeof response.data === 'object') {
      // 檢查是否為統一響應格式
      if ('success' in response.data) {
        if (!response.data.success) {
          // 業務邏輯錯誤
          return Promise.reject(new Error(response.data.message || '操作失敗'));
        }
        return response.data.data || response.data;
      }
    }
    return response.data;
  },
  (error) => {
    // 處理 HTTP 錯誤
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        // 認證失敗，清除本地 token
        localStorage.removeItem('token');
        // 可以在這裡添加重定向到登錄頁面的邏輯
        if (!window.location.hash.includes('/login')) {
          window.location.href = '/#/login';
        }
        return Promise.reject(new Error('未授權，請重新登錄'));
      }

      if (status === 403) {
        return Promise.reject(new Error('禁止訪問'));
      }

      if (status === 404) {
        return Promise.reject(new Error('資源不存在'));
      }

      if (status === 422) {
        // 驗證錯誤
        const errorMessage = data?.message || '參數驗證失敗';
        const errors = data?.errors;
        return Promise.reject({ message: errorMessage, errors });
      }

      if (status === 500) {
        return Promise.reject(new Error('服務器內部錯誤'));
      }

      // 其他錯誤
      const message = data?.message || error.message || '請求失敗';
      return Promise.reject(new Error(message));
    }

    // 網絡錯誤或請求超時
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('請求超時，請稍後重試'));
    }

    if (error.message === 'Network Error') {
      return Promise.reject(new Error('網絡錯誤，請檢查網絡連接'));
    }

    return Promise.reject(error);
  }
);

export default instance;
