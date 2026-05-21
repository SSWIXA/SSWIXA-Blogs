import Post from './models/Post.js';
import mongoose from 'mongoose';

// 直接连接数据库
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/blog');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// 示例博客文章数据
const posts = [
  {
    id: 1,
    title: "欢迎来到我的博客",
    author: "博主",
    category: "个人日记",
    summary: "这是我的第一篇博客文章。欢迎访问我的个人博客！在这里我会分享一些技术文章和个人心得。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "欢迎来到我的博客"
      },
      {
        type: "paragraph",
        data: "大家好！这是我创建的第一篇博客文章。经过一段时间的努力，我的个人博客终于上线了。"
      },
      {
        type: "paragraph",
        data: "在这个博客里，我会分享我在编程和技术领域的一些心得体会，也会记录生活中的点滴感悟。希望这里能成为一个知识分享和交流的平台。"
      },
      {
        type: "heading",
        level: 2,
        data: "博客内容规划"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "前端开发技术分享",
          "后端开发经验总结",
          "数据库使用心得",
          "个人项目展示",
          "学习笔记和教程"
        ]
      },
      {
        type: "paragraph",
        data: "如果你对任何技术话题感兴趣，或者有任何建议和想法，欢迎在评论区留言交流。让我们一起学习，共同进步！"
      }
    ],
    views: 10,
    tags: ["个人日记", "博客介绍"],
    likes: 10,
    dislikes: 0
  },
  {
    id: 2,
    title: "Vue.js 入门指南",
    author: "博主",
    category: "前端开发",
    summary: "Vue.js 是一个流行的前端框架，它使得构建交互式 Web 应用变得更加容易。在这篇文章中，我们将介绍 Vue.js 的基本概念和核心特性。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Vue.js 入门指南"
      },
      {
        type: "paragraph",
        data: "Vue.js 是一套用于构建用户界面的渐进式JavaScript框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。"
      },
      {
        type: "heading",
        level: 2,
        data: "Vue.js 的核心特性"
      },
      {
        type: "paragraph",
        data: "Vue.js 有许多优秀的特性，使其成为前端开发者的首选框架之一："
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "响应式数据绑定",
          "组件化开发",
          "虚拟DOM",
          "轻量级且易于学习",
          "生态系统完善"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "简单的 Vue 实例"
      },
      {
        type: "code",
        language: "javascript",
        data: `const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})`
      },
      {
        type: "paragraph",
        data: "以上代码创建了一个简单的 Vue 实例，展示了 Vue.js 的基本用法。通过数据绑定，我们可以轻松地将数据渲染到页面上。"
      }
    ],
    views: 25,
    tags: ["Vue.js", "前端框架", "JavaScript"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 3,
    title: "MongoDB 基础教程",
    author: "博主",
    category: "数据库",
    summary: "MongoDB 是一个 NoSQL 数据库，它使用 BSON 格式存储数据。本文将介绍 MongoDB 的基本操作，包括如何创建、读取、更新和删除文档。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "MongoDB 基础教程"
      },
      {
        type: "paragraph",
        data: "MongoDB 是一个基于分布式文件存储的开源数据库系统。它属于 NoSQL 数据库，使用 BSON（Binary JSON）格式存储数据。"
      },
      {
        type: "heading",
        level: 2,
        data: "MongoDB 基本概念"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "数据库（Database）：数据库是一个集合的物理容器",
          "集合（Collection）：集合类似于关系数据库中的表",
          "文档（Document）：文档是 MongoDB 中的基本单元，类似于关系数据库中的行"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "常用操作命令"
      },
      {
        type: "code",
        language: "bash",
        data: `# 显示所有数据库
show dbs

# 切换到指定数据库
use blog

# 显示当前数据库中的集合
show collections

# 查询文档
db.posts.find()

# 插入文档
db.posts.insert({title: \"新文章\", author: \"博主\"})`
      },
      {
        type: "paragraph",
        data: "这些是 MongoDB 最基本的操作命令。掌握这些命令可以帮助你快速上手 MongoDB 数据库的使用。"
      }
    ],
    views: 42,
    tags: ["MongoDB", "数据库", "NoSQL"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 4,
    title: "Node.js 与 Express 实战",
    author: "博主",
    category: "后端开发",
    summary: "Express 是 Node.js 最流行的 Web 框架之一。在这篇文章中，我们将学习如何使用 Express 构建 RESTful API，并与 MongoDB 数据库进行交互。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Node.js 与 Express 实战"
      },
      {
        type: "paragraph",
        data: "Express 是一个简洁而灵活的 Node.js Web 应用框架，提供了一系列强大特性帮助你创建各种 Web 应用。"
      },
      {
        type: "heading",
        level: 2,
        data: "创建 Express 应用"
      },
      {
        type: "code",
        language: "javascript",
        data: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});`
      },
      {
        type: "paragraph",
        data: "这段代码展示了如何使用 Express 创建一个简单的 Web 服务器。通过这种方式，你可以快速搭建起一个 Web 应用的基础框架。"
      },
      {
        type: "heading",
        level: 2,
        data: "中间件的使用"
      },
      {
        type: "paragraph",
        data: "Express 中间件是一个函数，它可以访问请求对象(req)、响应对象(res)以及应用程序的请求-响应循环中的下一个中间件函数。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 日志中间件
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`);
  next();
});`
      }
    ],
    views: 31,
    tags: ["Node.js", "Express", "后端开发"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 5,
    title: "前端性能优化技巧",
    author: "博主",
    category: "前端开发",
    summary: "在现代 Web 开发中，性能优化是至关重要的。本文将分享一些实用的前端性能优化技巧，帮助你的网站加载更快，用户体验更好。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "前端性能优化技巧"
      },
      {
        type: "paragraph",
        data: "随着 Web 应用变得越来越复杂，性能优化成为了提升用户体验的关键因素。一个好的网站应该具备快速加载和流畅交互的特点。"
      },
      {
        type: "heading",
        level: 2,
        data: "常见的优化策略"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "压缩和合并资源文件",
          "使用 CDN 加速静态资源",
          "优化图片大小和格式",
          "减少 HTTP 请求次数",
          "启用浏览器缓存",
          "使用懒加载技术"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "代码分割"
      },
      {
        type: "paragraph",
        data: "代码分割是一种将代码拆分成小块的技术，可以按需加载，从而减少初始加载时间。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 动态导入实现代码分割
import('./module.js').then(module => {
  // 使用加载的模块
});`
      }
    ],
    views: 57,
    tags: ["前端开发", "性能优化", "Web"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 6,
    title: "React Hooks 完全指南",
    author: "博主",
    category: "前端开发",
    summary: "React Hooks 是 React 16.8 引入的新特性，它让你可以在不编写 class 的情况下使用 state 以及其他的 React 特性。本文将详细介绍各种常用的 Hooks。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "React Hooks 完全指南"
      },
      {
        type: "paragraph",
        data: "Hooks 是 React 16.8 的新增特性，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。"
      },
      {
        type: "heading",
        level: 2,
        data: "useState Hook"
      },
      {
        type: "paragraph",
        data: "useState 是最基本的 Hook，它允许你在函数组件中添加 state。"
      },
      {
        type: "code",
        language: "javascript",
        data: `import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`
      },
      {
        type: "heading",
        level: 2,
        data: "useEffect Hook"
      },
      {
        type: "paragraph",
        data: "useEffect Hook 允许你在函数组件中执行副作用操作，例如数据获取、订阅或手动更改 DOM。"
      }
    ],
    views: 63,
    tags: ["React", "Hooks", "前端框架"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 7,
    title: "TypeScript 入门教程",
    author: "博主",
    category: "编程语言",
    summary: "TypeScript 是 JavaScript 的一个超集，添加了可选的静态类型和基于类的面向对象编程。本文将带你从零开始学习 TypeScript 的基础知识。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "TypeScript 入门教程"
      },
      {
        type: "paragraph",
        data: "TypeScript 是 JavaScript 的一个超集，由微软开发的自由和开源的编程语言。TypeScript 扩展了 JavaScript，为其添加了可选的静态类型和基于类的面向对象编程。"
      },
      {
        type: "heading",
        level: 2,
        data: "为什么选择 TypeScript"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "静态类型检查可以在编译时发现错误",
          "提供了更好的代码提示和自动完成",
          "增强了代码的可读性和可维护性",
          "支持最新的 ECMAScript 特性"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "基础类型示例"
      },
      {
        type: "code",
        language: "typescript",
        data: `// 基本类型声明
let isDone: boolean = false;
let count: number = 10;
let name: string = "TypeScript";

// 数组类型
let list: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// 函数类型
function add(a: number, b: number): number {
  return a + b;
}`
      }
    ],
    views: 48,
    tags: ["TypeScript", "JavaScript", "编程语言"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 8,
    title: "CSS Grid 布局详解",
    author: "博主",
    category: "前端开发",
    summary: "CSS Grid Layout 是 CSS 中最强大的布局系统之一。它是一个二维布局系统，可以处理列和行，不像 Flexbox 主要是一维布局系统。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "CSS Grid 布局详解"
      },
      {
        type: "paragraph",
        data: "CSS Grid Layout 是一个二维网格布局系统，旨在彻底改变我们设计CSS网格的方式。CSS网格非常适合创建复杂的网页布局。"
      },
      {
        type: "heading",
        level: 2,
        data: "Grid 基本概念"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "网格容器(Grid Container)",
          "网格项(Grid Item)",
          "网格线(Grid Line)",
          "网格轨道(Grid Track)",
          "网格单元格(Grid Cell)"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "创建网格容器"
      },
      {
        type: "code",
        language: "css",
        data: `.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 50px 50px;
}`
      },
      {
        type: "paragraph",
        data: "以上代码创建了一个 3 列 2 行的网格布局。每一列宽度为 100px，每一行高度为 50px。"
      }
    ],
    views: 39,
    tags: ["CSS", "布局", "前端开发"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 9,
    title: "Docker 容器化部署实践",
    author: "博主",
    category: "运维",
    summary: "Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Docker 容器化部署实践"
      },
      {
        type: "paragraph",
        data: "Docker 是一个开源的应用容器引擎，基于 Go 语言并遵从 Apache2.0 协议开源。Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。"
      },
      {
        type: "heading",
        level: 2,
        data: "Docker 核心概念"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "镜像(Image)：Docker 镜像是一个特殊的文件系统",
          "容器(Container)：镜像运行时的实体",
          "仓库(Repository)：集中存放镜像文件的场所"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "常用 Docker 命令"
      },
      {
        type: "code",
        language: "bash",
        data: `# 构建镜像
docker build -t myapp .

# 运行容器
docker run -p 3000:3000 myapp

# 查看运行中的容器
docker ps

# 停止容器
docker stop <container_id>`
      }
    ],
    views: 52,
    tags: ["Docker", "容器化", "DevOps"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 10,
    title: "Git 版本控制最佳实践",
    author: "博主",
    category: "开发工具",
    summary: "Git 是一个分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。本文将介绍 Git 的基本操作和一些高级技巧，帮助你更好地管理代码版本。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Git 版本控制最佳实践"
      },
      {
        type: "paragraph",
        data: "Git 是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。Git 是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。"
      },
      {
        type: "heading",
        level: 2,
        data: "基本工作流程"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "克隆仓库：git clone <repository_url>",
          "修改文件：编辑项目文件",
          "添加到暂存区：git add <file>",
          "提交更改：git commit -m \"commit message\"",
          "推送到远程仓库：git push origin main"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "分支管理"
      },
      {
        type: "code",
        language: "bash",
        data: `# 创建并切换到新分支
git checkout -b feature/new-feature

# 查看所有分支
git branch -a

# 合并分支
git merge feature/new-feature

# 删除分支
git branch -d feature/new-feature`
      }
    ],
    views: 71,
    tags: ["Git", "版本控制", "开发工具"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 11,
    title: "RESTful API 设计原则",
    author: "博主",
    category: "后端开发",
    summary: "REST 是一种软件架构风格，它定义了客户端和服务器之间如何通过 HTTP 协议进行交互。本文将介绍 RESTful API 的设计原则和最佳实践。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "RESTful API 设计原则"
      },
      {
        type: "paragraph",
        data: "REST（Representational State Transfer）是一种软件架构风格，由 Roy Fielding 在他的博士论文中提出。RESTful API 是遵循 REST 原则的 Web 服务接口。"
      },
      {
        type: "heading",
        level: 2,
        data: "REST 架构约束"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "客户端-服务器架构：关注点分离",
          "无状态：每个请求都包含处理该请求所需的所有信息",
          "可缓存：响应可以被标记为可缓存或不可缓存",
          "统一接口：通过标准的 HTTP 方法操作资源",
          "分层系统：客户端通常无法知道是否直接连接到最终服务器"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "HTTP 方法与 CRUD 操作"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "GET：获取资源",
          "POST：创建资源",
          "PUT：更新资源",
          "DELETE：删除资源"
        ]
      }
    ],
    views: 45,
    tags: ["API", "REST", "后端开发"],
    likes: 0,
    dislikes: 0
  },
  {
    id: 12,
    title: "Webpack 打包优化策略",
    author: "博主",
    category: "前端工程化",
    summary: "Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。当 Webpack 处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Webpack 打包优化策略"
      },
      {
        type: "paragraph",
        data: "Webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。"
      },
      {
        type: "heading",
        level: 2,
        data: "常见优化手段"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "代码分割：将代码拆分成多个 bundle",
          "Tree Shaking：移除未使用的代码",
          "压缩资源：减小打包后文件的大小",
          "使用 CDN：加速静态资源加载",
          "缓存策略：合理利用浏览器缓存"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "配置示例"
      },
      {
        type: "code",
        language: "javascript",
        data: `module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
  },
  performance: {
    hints: false
  }
};`
      }
    ],
    views: 36,
    tags: ["Webpack", "构建工具", "前端工程化"],
    likes: 0,
    dislikes: 0
  }
];

// 插入数据
const seedPosts = async () => {
  try {
    // 连接数据库
    await connectDB();

    // 清空现有数据（可选）
    await Post.deleteMany({});
    console.log('已清空现有文章数据');

    // 插入新数据
    const createdPosts = await Post.insertMany(posts);
    console.log(`成功插入 ${createdPosts.length} 篇文章`);

    // 关闭数据库连接
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('插入数据时出错:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedPosts();