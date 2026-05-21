# API 文檔

本文檔描述了博客系統的 RESTful API 接口。

## 基礎信息

- **基礎 URL**: `http://localhost:5000`
- **API 版本**: `/api/v1`
- **認證方式**: Bearer Token (待實現)
- **數據格式**: JSON

## 統一響應格式

### 成功響應
```json
{
  "code": 200,
  "success": true,
  "message": "操作成功",
  "data": { ... }
}
```

### 錯誤響應
```json
{
  "code": 400,
  "success": false,
  "message": "錯誤消息",
  "errors": { ... }
}
```

### 分頁響應
```json
{
  "code": 200,
  "success": true,
  "message": "獲取成功",
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

## 文章接口

### 1. 獲取所有文章列表
```
GET /api/v1/articles
```

**響應示例:**
```json
{
  "code": 200,
  "success": true,
  "message": "獲取文章列表成功",
  "data": [
    {
      "_id": "xxx",
      "title": "文章標題",
      "summary": "文章摘要",
      "views": 100,
      "likes": 50,
      "dislikes": 0,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. 獲取文章統計信息
```
GET /api/v1/articles/stats
```

**響應示例:**
```json
{
  "code": 200,
  "success": true,
  "message": "獲取統計信息成功",
  "data": {
    "totalArticles": 100,
    "totalViews": 10000,
    "totalLikes": 5000
  }
}
```

### 3. 搜索文章
```
GET /api/v1/articles/search?title=關鍵詞&page=1&limit=10
```

**查詢參數:**
- `title` (必填): 搜索關鍵詞，支持模糊匹配
- `page` (可選): 頁碼，默認 1
- `limit` (可選): 每頁數量，默認 10

### 4. 分頁獲取文章
```
GET /api/v1/articles/paginated?page=1&limit=10&tag=Vue&category=技術
```

**查詢參數:**
- `page` (可選): 頁碼，默認 1
- `limit` (可選): 每頁數量，默認 10
- `tag` (可選): 標籤過濾
- `category` (可選): 分類過濾
- `author` (可選): 作者過濾

### 5. 獲取單篇文章詳情
```
GET /api/v1/articles/:id
```

**響應:** 自動增加瀏覽量

### 6. 創建文章
```
POST /api/v1/articles
```

**請求體:**
```json
{
  "title": "文章標題",
  "summary": "文章摘要（可選）",
  "contentBlocks": [
    {
      "type": "paragraph",
      "data": "段落內容"
    }
  ],
  "tags": ["Vue", "JavaScript"],
  "author": "作者名",
  "category": "分類"
}
```

**響應:** 201 Created

### 7. 更新文章
```
PATCH /api/v1/articles/:id
```

**請求體:** 只傳遞需要更新的字段
```json
{
  "title": "新標題"
}
```

### 8. 刪除文章
```
DELETE /api/v1/articles/:id
```

### 9. 點贊文章
```
PUT /api/v1/articles/:id/like
```

### 10. 取消點贊
```
DELETE /api/v1/articles/:id/like
```

### 11. 點踩文章
```
PUT /api/v1/articles/:id/dislike
```

### 12. 取消點踩
```
DELETE /api/v1/articles/:id/dislike
```

## 圖片上傳接口

### 13. 上傳圖片
```
POST /api/v1/upload
```

**請求格式:** `multipart/form-data`

**表單字段:**
| 字段 | 類型 | 說明 |
|------|------|------|
| `image` | File | 圖片文件 |

**限制:**
- 大小: ≤ 5MB
- 格式: jpg / png / gif / webp

**響應示例:**
```json
{
  "code": 200,
  "success": true,
  "message": "上傳成功",
  "data": {
    "url": "/uploads/1716000000-123456.png"
  }
}
```

**訪問上傳的圖片:**
```
GET http://localhost:5000/uploads/1716000000-123456.png
```

## HTTP 狀態碼

| 狀態碼 | 說明 |
|--------|------|
| 200 | 成功 |
| 201 | 創建成功 |
| 400 | 請求參數錯誤 |
| 401 | 未授權 |
| 403 | 禁止訪問 |
| 404 | 資源不存在 |
| 422 | 參數驗證失敗 |
| 500 | 服務器內部錯誤 |

## 錯誤處理

所有 API 都返回統一的錯誤格式，前端應根據 `code` 和 `message` 進行相應的錯誤處理和用戶提示。
