# sswixa-blogs

一个前后端分离的个人技术博客系统，Vue 3 + Express + MongoDB 全栈项目。

## 技术栈

| 层       | 技术                      | 说明               |
| -------- | ------------------------- | ------------------ |
| 前端     | Vue 3 + TypeScript + Vite | Composition API    |
| UI       | Element Plus              | 组件库             |
| 路由     | Vue Router 4              | Hash 模式          |
| 状态管理 | Pinia                     | 轻量状态管理       |
| HTTP     | Axios                     | 请求/响应拦截器    |
| 轮播     | Swiper                    | 视差效果           |
| 代码高亮 | Monaco Editor             | VS Code 同款编辑器 |
| 后端     | Express 5                 | Node.js Web 框架   |
| 数据库   | MongoDB + Mongoose        | 文档型数据库       |
| 图片上传 | Multer                    | 本地文件存储       |

## 功能特性

### 前台展示

- **首页**：全屏视差轮播 + 文章列表 + 右侧个人信息栏
- **文章详情**：支持 7 种内容块渲染（段落/标题/代码/图片/引用/列表/分割线）
- **代码高亮**：Monaco Editor 渲染代码块，支持 20+ 种编程语言
- **侧边栏**：动态分类树，按文章类别分组导航
- **分类筛选**：按分类浏览所有文章
- **全文搜索**：顶部搜索栏，支持模糊匹配
- **暗黑模式**：全站暗黑/明亮主题切换
- **樱花特效 + 看板娘**：Live2D 动画 + Canvas 樱花飘落
- **图片预览**：点击图片放大查看

### 后台管理

- **文章列表**：分页展示，每页 10 条
- **创建/编辑文章**：可视化内容块编辑器
  - 段落、标题（H2-H5）、代码块（选择语言）
  - 图片上传（本地上传或粘贴 URL）
  - 引用、有序/无序列表、分割线
  - 内容块拖拽排序（上下移动）
- **删除文章**：确认对话框 + 自动回页
- **图片上传**：支持本地上传，限制 5MB / jpg/png/gif/webp

### API

- **版本控制**：`/api/v1/` 前缀
- **统一响应格式**：`{ code, success, message, data }`
- **文章 CRUD**：创建/读取/更新/删除
- **分页查询**：支持 page/limit/category/tag/author 筛选
- **模糊搜索**：按标题关键词搜索
- **统计接口**：文章总数/总浏览/总点赞
- **点赞/踩**：RESTful 风格 toggle
- **图片上传**：POST `/api/v1/upload`
- **API 文档**：详见 [API.md](API.md)

## 项目结构

```
sswixa-blogs/
├── MyBolgs/                    # 前端
│   ├── src/
│   │   ├── api/                 # API 接口封装
│   │   ├── axios/               # Axios 配置 + 拦截器
│   │   ├── components/          # 公共组件
│   │   │   ├── Sakura/          # 樱花特效
│   │   │   ├── backTop/         # 回到顶部
│   │   │   └── live_2d/         # Live2D 看板娘
│   │   ├── router/              # 路由配置
│   │   ├── store/               # Pinia 状态
│   │   ├── utils/               # 工具函数
│   │   └── views/               # 页面级组件
│   └── vite.config.ts
├── MyBolgsBackEnd/             # 后端
│   ├── src/
│   │   ├── config/              # 数据库连接
│   │   ├── controllers/         # 控制器
│   │   ├── middlewares/         # 中间件
│   │   ├── models/              # Mongoose 模型
│   │   ├── routes/              # 路由 + 版本控制
│   │   ├── utils/               # 工具类（ApiResponse）
│   │   └── seed.js              # 种子数据（18 篇文章）
│   └── public/uploads/          # 图片上传目录
├── API.md                       # API 文档
├── start.bat                    # Windows 一键启动
└── start.sh                     # Linux/macOS 一键启动
```

## 快速开始

### 前置环境

- Node.js >= 18
- MongoDB >= 4.0

### 一键启动（Windows）

```
start.bat
```

### 手动启动

**1. 启动 MongoDB**

```bash
mongod --dbpath="D:\Software\mongodb\data\db"
```

**2. 安装依赖 + 启动后端**

```bash
cd MyBolgsBackEnd
cnpm install
node src/seed.js          # 导入 18 篇种子文章
npm start                  # 启动在 http://localhost:5000
```

**3. 安装依赖 + 启动前端**

```bash
cd MyBolgs
cnpm install
npm run dev                # 启动在 http://localhost:5173
```

### 访问

| 服务     | 地址                          |
| -------- | ----------------------------- |
| 博客首页 | http://localhost:5173         |
| 后台管理 | http://localhost:5173/#/admin |
| 后端 API | http://localhost:5000/api/v1  |
| 健康检查 | http://localhost:5000/health  |

## 数据模型

```javascript
Post {
  title:         String,      // 标题（必填）
  summary:       String,      // 摘要
  contentBlocks: [{           // 内容块数组
    type:        String,      // paragraph | heading | code | image | quote | list | divider
    data:        String,      // 内容
    level:       Number,      // 标题级别 1-6
    language:    String,      // 代码语言
    url:         String,      // 图片 URL
    alt:         String,      // 图片 ALT
    caption:     String,      // 图片说明
    author:      String,      // 引用作者
    style:       String,      // ordered | unordered
    items:       [String]     // 列表项
  }],
  views:         Number,      // 浏览量
  likes:         Number,      // 点赞数
  dislikes:      Number,      // 点踩数
  tags:          [String],    // 标签
  author:        String,      // 作者
  category:      String,      // 分类
  createdAt:     Date,        // 创建时间（自动）
  updatedAt:     Date         // 更新时间（自动）
}
```

## 贡献

1. Fork 本仓库
2. 新建分支 `git checkout -b feature/xxx`
3. 提交代码 `git commit -m "描述改动"`
4. 推送 `git push origin feature/xxx`
5. 创建 Pull Request

## License

MIT
