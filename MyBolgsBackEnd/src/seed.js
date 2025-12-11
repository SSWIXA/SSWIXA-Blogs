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
    title: "欢迎来到我的博客",
    content: "这是我的第一篇博客文章。欢迎访问我的个人博客！在这里我会分享一些技术文章和个人心得。",
    views: 10,
    tags: ["个人日记", "博客介绍"],
    likes: 10,
    dislikes: 0
  },
  {
    title: "Vue.js 入门指南",
    content: "Vue.js 是一个流行的前端框架，它使得构建交互式 Web 应用变得更加容易。在这篇文章中，我们将介绍 Vue.js 的基本概念和核心特性。",
    views: 25,
    tags: ["Vue.js", "前端框架", "JavaScript"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "MongoDB 基础教程",
    content: "MongoDB 是一个 NoSQL 数据库，它使用 BSON 格式存储数据。本文将介绍 MongoDB 的基本操作，包括如何创建、读取、更新和删除文档。",
    views: 42,
    tags: ["MongoDB", "数据库", "NoSQL"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "Node.js 与 Express 实战",
    content: "Express 是 Node.js 最流行的 Web 框架之一。在这篇文章中，我们将学习如何使用 Express 构建 RESTful API，并与 MongoDB 数据库进行交互。",
    views: 31,
    tags: ["Node.js", "Express", "后端开发"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "前端性能优化技巧",
    content: "在现代 Web 开发中，性能优化是至关重要的。本文将分享一些实用的前端性能优化技巧，帮助你的网站加载更快，用户体验更好。",
    views: 57,
    tags: ["前端开发", "性能优化", "Web"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "React Hooks 完全指南",
    content: "React Hooks 是 React 16.8 引入的新特性，它让你可以在不编写 class 的情况下使用 state 以及其他的 React 特性。本文将详细介绍各种常用的 Hooks。",
    views: 63,
    tags: ["React", "Hooks", "前端框架"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "TypeScript 入门教程",
    content: "TypeScript 是 JavaScript 的一个超集，添加了可选的静态类型和基于类的面向对象编程。本文将带你从零开始学习 TypeScript 的基础知识。",
    views: 48,
    tags: ["TypeScript", "JavaScript", "编程语言"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "CSS Grid 布局详解",
    content: "CSS Grid Layout 是 CSS 中最强大的布局系统之一。它是一个二维布局系统，可以处理列和行，不像 Flexbox 主要是一维布局系统。",
    views: 39,
    tags: ["CSS", "布局", "前端开发"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "Docker 容器化部署实践",
    content: "Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。",
    views: 52,
    tags: ["Docker", "容器化", "DevOps"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "Git 版本控制最佳实践",
    content: "Git 是一个分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。本文将介绍 Git 的基本操作和一些高级技巧，帮助你更好地管理代码版本。",
    views: 71,
    tags: ["Git", "版本控制", "开发工具"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "RESTful API 设计原则",
    content: "REST 是一种软件架构风格，它定义了客户端和服务器之间如何通过 HTTP 协议进行交互。本文将介绍 RESTful API 的设计原则和最佳实践。",
    views: 45,
    tags: ["API", "REST", "后端开发"],
    likes: 0,
    dislikes: 0
  },
  {
    title: "Webpack 打包优化策略",
    content: "Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。当 Webpack 处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。",
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