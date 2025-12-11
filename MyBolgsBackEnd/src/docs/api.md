# API 文档

## 文章管理接口

### 1. 获取所有文章
```
GET /api/articles
```

**响应示例:**
```json
[
  {
    "_id": "文章ID",
    "title": "文章标题",
    "content": "文章内容",
    "views": 0,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### 2. 分页获取文章
```
GET /api/articles/page/:page/limit/:limit
```

**参数:**
- page: 页码 (默认: 1)
- limit: 每页条数 (默认: 10)

**响应示例:**
```json
{
  "articles": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### 3. 根据标题搜索文章
```
GET /api/articles/search?title=关键词
```

**参数:**
- title: 搜索关键词

**响应示例:**
```json
[
  {
    "_id": "文章ID",
    "title": "匹配的文章标题",
    "content": "文章内容",
    "views": 0,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### 4. 获取单篇文章
```
GET /api/articles/:id
```

**响应示例:**
```json
{
  "_id": "文章ID",
  "title": "文章标题",
  "content": "文章内容",
  "views": 10,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### 5. 创建文章
```
POST /api/articles
```

**请求体:**
```json
{
  "title": "文章标题",
  "content": "文章内容"
}
```

**响应示例:**
```json
{
  "_id": "文章ID",
  "title": "文章标题",
  "content": "文章内容",
  "views": 0,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### 6. 更新文章
```
PUT /api/articles/:id
```

**请求体:**
```json
{
  "title": "更新后的标题",
  "content": "更新后的内容"
}
```

**响应示例:**
```json
{
  "_id": "文章ID",
  "title": "更新后的标题",
  "content": "更新后的内容",
  "views": 0,
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

### 7. 删除文章
```
DELETE /api/articles/:id
```

**响应示例:**
```json
{
  "message": "文章删除成功"
}
```