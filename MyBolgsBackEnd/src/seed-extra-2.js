// 第二批增量文章（id 33 起）
// 与 seed-extra.js 一样，只作为追加数据源，配合 seed-append.js 使用。
const extraPosts2 = [
  {
    id: 33,
    title: "Event Loop 再深入：宏任务、微任务与执行顺序",
    author: "博主",
    category: "前端开发",
    summary: "setTimeout(fn, 0) 和 Promise.then 谁先执行？这道题背后是浏览器事件循环的完整机制。这篇把它一次性讲清楚。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Event Loop 再深入：宏任务、微任务与执行顺序"
      },
      {
        type: "paragraph",
        data: "很多人能背出「微任务先于宏任务」，但遇到嵌套的 Promise 和 setTimeout 就乱了。关键是要理解事件循环每一轮到底做了什么。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、一轮循环的完整顺序"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "执行一个宏任务（同步代码整体算一个宏任务）",
          "清空所有微任务队列（包括执行过程中新产生的微任务）",
          "必要时渲染页面",
          "取下一个宏任务，重复"
        ]
      },
      {
        type: "code",
        language: "javascript",
        data: `console.log('1: 同步')

setTimeout(() => console.log('2: setTimeout'), 0)

Promise.resolve()
  .then(() => {
    console.log('3: then')
    setTimeout(() => console.log('4: 嵌套 setTimeout'), 0)
  })

console.log('5: 同步结束')

// 输出顺序：1 → 5 → 3 → 2 → 4`
      },
      {
        type: "paragraph",
        data: "注意第 4 步：嵌套的 setTimeout 是新一轮宏任务，所以它排在已经排队的 setTimeout 后面。微任务则会在当前宏任务结束前一并清空。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、async/await 的本质"
      },
      {
        type: "paragraph",
        data: "await 后面的代码等价于包在 Promise.then 里，也就是微任务。所以 await 之后的代码一定在本轮同步代码之后、下一个宏任务之前执行。"
      },
      {
        type: "quote",
        data: "记住一句话：同步 → 微任务（清空）→ 渲染 → 宏任务。整轮循环就是这样转的。",
        author: "前端笔记"
      }
    ],
    views: 24,
    tags: ["JavaScript", "Event Loop", "前端开发"],
    likes: 5,
    dislikes: 0
  },
  {
    id: 34,
    title: "闭包与作用域链：那些年我们踩过的坑",
    author: "博主",
    category: "前端开发",
    summary: "从经典 for 循环 var 问题出发，讲清楚闭包到底是什么、为什么会内存泄漏，以及 V8 到底怎么优化它。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        "data": "闭包与作用域链：那些年我们踩过的坑"
      },
      {
        type: "paragraph",
        data: "闭包的定义很简单：函数能记住并访问它定义时所在的作用域，即使那个作用域已经执行完。但真正理解它，要从作用域链说起。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 经典面试题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// 输出 3, 3, 3

// 解法一：let 块级作用域
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// 输出 0, 1, 2

// 解法二：IIFE 捕获
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 0))(i)
}`
      },
      {
        type: "heading",
        level: 2,
        data: "一、作用域链是怎么形成的"
      },
      {
        type: "paragraph",
        data: "每个函数在创建时都会保存一个 [[Environment]] 内部属性，指向它定义时所在的词法环境。查找变量时，先找自己，再沿着这条链往外找，直到全局作用域。这就是词法作用域——由代码写在哪里决定，不由调用位置决定。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、闭包真的会内存泄漏吗"
      },
      {
        type: "paragraph",
        data: "严格来说不会——闭包只是让变量活着，这是语言设计的一部分。真正的问题是「你不小心让一个巨大的对象长期存活」，比如把 DOM 节点存在闭包里又没解绑事件监听。现代 V8 已经会回收闭包里实际没被引用的变量，但语义上我们仍要谨慎。"
      },
      {
        type: "quote",
        data: "闭包不是 bug，是特性；内存泄漏不是闭包的错，是你的引用关系没理清。",
        author: "前端笔记"
      }
    ],
    views: 21,
    tags: ["JavaScript", "闭包", "前端开发"],
    likes: 4,
    dislikes: 0
  },
  {
    id: 35,
    title: "Promise 内部机制与 async/await 的真相",
    author: "博主",
    category: "前端开发",
    summary: "Promise 状态一旦改变就不可逆，但为什么 .then 里抛错不会中断程序？这篇从实现角度拆一遍。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        "data": "Promise 内部机制与 async/await 的真相"
      },
      {
        type: "paragraph",
        data: "Promise 是 ES6 引入的异步编程方案，但它解决的不是「让代码异步」，而是「让异步代码的错误处理和控制流变得可组合」。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、状态机模型"
      },
      {
        type: "paragraph",
        data: "一个 Promise 只有三种状态：pending、fulfilled、rejected。状态只能从 pending 变成后两者之一，且不可逆。这就是「一次且仅一次」的语义保证。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 一个极简 Promise 骨架
class MiniPromise {
  constructor(executor) {
    this.status = 'pending'
    this.value = undefined
    this.callbacks = []

    const resolve = (v) => {
      if (this.status !== 'pending') return
      this.status = 'fulfilled'
      this.value = v
      this.callbacks.forEach(cb => cb.onFulfilled(v))
    }
    executor(resolve, reject)
  }

  then(onFulfilled) {
    return new MiniPromise((resolve) => {
      this.callbacks.push({
        onFulfilled: (v) => resolve(onFulfilled(v))
      })
    })
  }
}`
      },
      {
        type: "heading",
        level: 2,
        data: "二、为什么 .then 要返回新 Promise"
      },
      {
        type: "paragraph",
        data: "为了链式调用。每次 then 都返回一个新的 Promise，它的结果由回调返回值决定。如果回调返回的是另一个 Promise，会自动展开（Promise Resolution Procedure）——这是 Promise 最精妙也最容易写错的地方。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、async/await 是语法糖吗"
      },
      {
        type: "paragraph",
        data: "基本是。async 函数返回 Promise，await 把后续代码包装成微任务。但引擎层面做了优化，比手写 then 链更快，也更容易调试（栈信息完整）。"
      },
      {
        type: "quote",
        data: "try/catch 能抓住 await 的错误，是因为 await 把 rejected Promise 重新抛成了同步异常。",
        author: "前端笔记"
      }
    ],
    views: 18,
    tags: ["JavaScript", "Promise", "前端开发"],
    likes: 3,
    dislikes: 0
  },
  {
    id: 36,
    title: "Vue Router 路由守卫：别再被 next 搞晕了",
    author: "博主",
    category: "前端开发",
    summary: "全局前置、路由独享、组件内守卫的执行顺序，以及 next() 的各种坑。附一份后台鉴权的实际配置。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        "data": "Vue Router 路由守卫：别再被 next 搞晕了"
      },
      {
        type: "paragraph",
        data: "路由守卫是前端权限控制的第一道门。Vue Router 4 的守卫 API 比 3 更清晰，但「必须调用 next」这条规矩依然让很多人踩坑。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、完整执行顺序"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "导航触发",
          "失活组件内 beforeRouteLeave",
          "全局前置 beforeEach",
          "路由独享 beforeEnter",
          "组件内 beforeRouteUpdate",
          "异步组件解析",
          "组件内 beforeRouteEnter",
          "全局解析 beforeResolve",
          "导航确认 afterEach"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "二、我博客里的鉴权配置"
      },
      {
        type: "code",
        language: "typescript",
        data: `router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.path === '/admin' && !token) {
    next('/login')
    return
  }

  if (to.path === '/login' && token) {
    next('/admin')
    return
  }

  next()
})`
      },
      {
        type: "paragraph",
        data: "最重要的规矩：每条分支都要调用一次 next，且只调用一次。漏掉不调用，页面就永远卡住；调用两次，导航行为会变得诡异。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、前端鉴权只是体验，不是安全"
      },
      {
        type: "paragraph",
        data: "路由守卫能防止用户看到不该看的页面，但挡不住直接调 API。真正的安全必须靠后端在每个接口上验证 JWT。我前面修的那个漏洞就是活生生的例子——前端有登录页，后端写接口却裸奔。"
      },
      {
        type: "quote",
        data: "前端守卫管「看得见」，后端鉴权管「改得动」。缺一个都不行。",
        author: "安全笔记"
      }
    ],
    views: 19,
    tags: ["Vue Router", "前端开发", "鉴权"],
    likes: 4,
    dislikes: 0
  },
  {
    id: 37,
    title: "从 Vuex 迁移到 Pinia：一次轻量化的取舍",
    author: "博主",
    category: "前端开发",
    summary: "Pinia 少了 mutation、天然支持 TS、不用嵌套模块。这篇记录迁移过程和值得注意的差异。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        "data": "从 Vuex 迁移到 Pinia：一次轻量化的取舍"
      },
      {
        type: "paragraph",
        data: "Vuex 的问题不是不好用，而是太重：state / mutation / action 三层结构，为了改一个值要写一堆样板代码。Pinia 把这些砍掉了。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、核心差异"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "没有 mutations，action 里可以直接改 state",
          "不用 modules，每个 store 天然独立",
          "完整的 TypeScript 类型推导",
          "支持 SSR 和热更新，开发体验更好"
        ]
      },
      {
        type: "code",
        language: "typescript",
        data: `// stores/article.ts
export const useArticleStore = defineStore('article', {
  state: () => ({
    list: [] as Article[],
    loading: false
  }),

  getters: {
    total: (state) => state.list.length
  },

  actions: {
    async load() {
      this.loading = true
      try {
        this.list = await fetchArticles()
      } finally {
        this.loading = false
      }
    }
  }
})`
      },
      {
        type: "heading",
        level: 2,
        data: "二、迁移时踩的坑"
      },
      {
        type: "paragraph",
        data: "最大的坑是把 mutation 逻辑直接搬进 action 后，忘了保持「同步修改」和「异步流程」的边界。虽然 Pinia 允许直接改 state，但复杂逻辑还是建议拆成纯函数，否则状态变更散落在各处，调试时很难追踪。"
      },
      {
        type: "quote",
        data: "Pinia 让简单的事更简单，但不代表复杂的事可以随便做。",
        author: "前端笔记"
      }
    ],
    views: 16,
    tags: ["Pinia", "Vue 3", "状态管理"],
    likes: 3,
    dislikes: 0
  },
  {
    id: 38,
    title: "Nginx 反向代理与 HTTPS 配置速查",
    author: "博主",
    category: "运维",
    summary: "把本地 5000 端口的服务挂到域名上、配 Let's Encrypt 证书、处理 WebSocket 升级——这几件事我用得到就记下来了。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        "data": "Nginx 反向代理与 HTTPS 配置速查"
      },
      {
        type: "paragraph",
        data: "用 Render 这类平台省去了自己配 Nginx 的麻烦，但内网部署时还是绕不开。这份配置是我踩过坑之后留下来的模板。"
      },
      {
        type: "code",
        language: "nginx",
        data: `server {
    listen 80;
    server_name blog.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name blog.example.com;

    ssl_certificate     /etc/letsencrypt/live/blog.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blog.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /ws {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`
      },
      {
        type: "heading",
        level: 2,
        data: "几个容易忘的点"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "X-Forwarded-Proto 不传，后端生成的重定向可能还是 http",
          "WebSocket 必须升级协议头，否则握手失败",
          "client_max_body_size 默认 1MB，上传图片会 413，记得调大",
          "证书续期用 certbot renew，配 cron 每月跑一次"
        ]
      },
      {
        type: "quote",
        data: "反向代理不是转发请求那么简单，请求头里的上下文信息都得带过去。",
        author: "运维笔记"
      }
    ],
    views: 22,
    tags: ["Nginx", "HTTPS", "运维"],
    likes: 5,
    dislikes: 0
  },
  {
    id: 39,
    title: "Cron 定时任务：从写对到写稳",
    author: "博主",
    category: "运维",
    summary: "五段表达式、环境变量差异、日志和输出重定向，以及为什么你的 cron 在终端能跑、定时却不执行。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        data: "Cron 定时任务：从写对到写稳"
      },
      {
        type: "paragraph",
        data: "cron 最让人抓狂的地方：同样的命令手动执行没问题，放进 crontab 就不动。绝大多数情况是环境变量和路径的问题。"
      },
      {
        type: "code",
        language: "bash",
        data: `# 每 5 分钟保活一次
*/5 * * * * /usr/bin/curl -s -o /dev/null https://example.com/health

# 每天凌晨 2 点备份，输出追加到日志
0 2 * * * /usr/bin/bash /opt/scripts/backup.sh >> /var/log/backup.log 2>&1

# 每月 1 号续期证书
0 3 1 * * /usr/bin/certbot renew --quiet`
      },
      {
        type: "heading",
        level: 2,
        data: "一、写对表达式"
      },
      {
        type: "paragraph",
        data: "五段依次是：分、时、日、月、周。「日」和「周」同时指定时是或的关系，不是且——这是最常见的误解。想避免歧义，其中一个用星号。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、写稳的三个习惯"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "命令一律用绝对路径：cron 的 PATH 极简，找不到 node / npm 是常态",
          "输出必须重定向：否则 stdout 会变成邮件，堆积在 /var/spool/mail",
          "脚本开头显式 source 环境：source /etc/profile 或 export PATH"
        ]
      },
      {
        type: "quote",
        data: "cron 没有交互 shell，你习以为常的环境变量对它全都不存在。",
        author: "运维笔记"
      }
    ],
    views: 14,
    tags: ["Cron", "Linux", "运维"],
    likes: 2,
    dislikes: 0
  },
  {
    id: 40,
    title: "MongoDB 聚合管道：从 match 到 facet 实战",
    author: "博主",
    category: "数据库",
    summary: "统计文章分类分布、按月归档、算总浏览量——这些用 find 很别扭的需求，聚合管道几行就搞定。",
    contentBlocks: [
      {
        "type": "heading",
        level: 1,
        data: "MongoDB 聚合管道：从 match 到 facet 实战"
      },
      {
        type: "paragraph",
        data: "聚合管道把数据处理拆成多个阶段，文档像流水一样依次流过。掌握几个核心阶段，大部分统计需求都能搞定。"
      },
      {
        type: "code",
        language: "javascript",
        data: `db.posts.aggregate([
  { $match: { createdAt: { $gte: new Date('2026-01-01') } } },
  { $group: {
      _id: '$category',
      count: { $sum: 1 },
      totalViews: { $sum: '$views' },
      avgLikes: { $avg: '$likes' }
  } },
  { $sort: { totalViews: -1 } },
  { $project: {
      category: '$_id',
      count: 1,
      totalViews: 1,
      avgLikes: { $round: ['$avgLikes', 1] },
      _id: 0
  } }
])`
      },
      {
        type: "heading",
        level: 2,
        data: "一、阶段顺序决定性能"
      },
      {
        type: "paragraph",
        data: "$match 尽量放最前面，这样后面的阶段处理的数据量最小。如果 $match 后面紧跟 $sort，且字段有索引，MongoDB 能直接利用索引排序，避免内存排序。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、$facet 一次算多组结果"
      },
      {
        type: "paragraph",
        data: "文章页需要同时显示「分类分布」和「月度归档」，与其查两次数据库，不如用 $facet 在一个管道里分叉，各算各的。"
      },
      {
        type: "code",
        language: "javascript",
        data: `db.posts.aggregate([
  { $facet: {
      byCategory: [
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ],
      byMonth: [
        { $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            count: { $sum: 1 }
        } },
        { $sort: { _id: -1 } }
      ]
  } }
])`
      },
      {
        type: "quote",
        data: "聚合管道的性能关键：让数据尽早变少。",
        author: "数据库笔记"
      }
    ],
    views: 17,
    tags: ["MongoDB", "聚合", "数据库"],
    likes: 4,
    dislikes: 0
  },
  {
    id: 41,
    title: "Express 中间件：洋葱模型到底怎么转",
    author: "博主",
    category: "后端开发",
    summary: "为什么 next() 之后的代码会在响应返回后执行？从源码角度理解 Express 的中间件栈。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        data: "Express 中间件：洋葱模型到底怎么转"
      },
      {
        type: "paragraph",
        data: "Express 的中间件经常被比作洋葱：请求从外往里穿，响应从里往外穿。但只有真正写过「next() 之后打日志」的人，才会感受到这个模型的精妙。"
      },
      {
        type: "code",
        language: "javascript",
        data: `app.use((req, res, next) => {
  const start = Date.now()
  console.log('进入 A')
  next()
  // 这行会在下游全部执行完后才跑
  console.log('离开 A，耗时', Date.now() - start, 'ms')
})

app.get('/', (req, res) => {
  console.log('处理路由')
  res.send('ok')
})`
      },
      {
        type: "heading",
        level: 2,
        data: "一、原理其实很简单"
      },
      {
        type: "paragraph",
        data: "Express 内部维护一个函数数组。next() 做的就是调用数组里的下一个函数，并把同一个 next 传下去。每个中间件函数在调用 next 时并没有「结束」——它只是把控制权交出去，等下游返回后继续执行自己后面的代码。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、错误中间件为什么是四参数"
      },
      {
        type: "paragraph",
        data: "Express 通过函数参数个数来区分普通中间件和错误处理中间件：只有声明了 (err, req, res, next) 四个参数，才会被当作错误处理器。少一个都不行——这是 JS 里用 length 判断的经典案例。"
      },
      {
        type: "code",
        language: "javascript",
        data: `app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: '服务器内部错误' })
})`
      },
      {
        type: "quote",
        data: "next() 不是「跳到下一个」，而是「把栈帧压进去，等它回来」。",
        author: "后端笔记"
      }
    ],
    views: 20,
    tags: ["Express", "Node.js", "后端开发"],
    likes: 4,
    dislikes: 0
  },
  {
    id: 42,
    title: "数据库事务与隔离级别：一句话讲清一个概念",
    author: "博主",
    category: "数据库",
    summary: "脏读、不可重复读、幻读的区别，以及 MySQL 四个隔离级别各自解决了什么。用具体场景讲，不背定义。",
    contentBlocks: [
      {
        "type": "heading",
        level: 1,
        data: "数据库事务与隔离级别：一句话讲清一个概念"
      },
      {
        type: "paragraph",
        data: "事务的 ACID 里，隔离性最容易被误解。隔离级别本质上是「在并发和正确性之间」的一组开关。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、三种异常现象"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "脏读：读到了别人还没提交的数据（人家可能回滚）",
          "不可重复读：同一事务内两次读同一行，值变了（别人 UPDATE 提交了）",
          "幻读：同一事务内两次查同一条件，行数变了（别人 INSERT 提交了）"
        ]
      },
      {
        type: "paragraph",
        data: "关键区别：不可重复读针对「同一行的内容变了」，幻读针对「结果集的行数变了」。一个 Update，一个 Insert。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、四个隔离级别"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "读未提交：啥都不防，最快也最危险",
          "读已提交：防脏读，Oracle / PostgreSQL 默认",
          "可重复读：防脏读 + 不可重复读，MySQL InnoDB 默认，配合 MVCC 和间隙锁还能 largely 防幻读",
          "串行化：全防，但并发性能最差"
        ]
      },
      {
        type: "quote",
        data: "隔离级别越高，正确性越强，并发越弱。没有最好，只有合适。",
        author: "数据库笔记"
      },
      {
        type: "paragraph",
        data: "MongoDB 4.0 之后支持多文档事务，行为类似 MySQL 的读已提交。但能不用就别用——跨分片事务的性能代价很高，大部分场景可以用嵌式文档设计规避。"
      }
    ],
    views: 26,
    tags: ["数据库", "事务", "MySQL"],
    likes: 6,
    dislikes: 0
  },
  {
    id: 43,
    title: "前端错误监控：从 window.onerror 到 Sentry",
    author: "博主",
    category: "前端开发",
    summary: "线上报错用户不说你永远不知道。这篇讲怎么捕获 JS 错误、Promise 拒绝和资源加载失败，以及上报时该带哪些上下文。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        data: "前端错误监控：从 window.onerror 到 Sentry"
      },
      {
        type: "paragraph",
        data: "本地跑得好好的，用户那边白屏了——没有监控的话，你只能靠猜。前端监控的第一步是把错误送回来。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、三类错误都要抓"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 1. 运行时错误（同步）
window.addEventListener('error', (e) => {
  report({ type: 'js', message: e.message, stack: e.error?.stack })
})

// 2. Promise 未捕获拒绝
window.addEventListener('unhandledrejection', (e) => {
  report({ type: 'promise', reason: String(e.reason) })
})

// 3. 资源加载失败（捕获阶段才能拿到）
window.addEventListener('error', (e) => {
  if (e.target !== window) {
    report({ type: 'resource', src: e.target.src || e.target.href })
  }
}, true)`
      },
      {
        type: "heading",
        level: 2,
        data: "二、上报要带上下文"
      },
      {
        type: "paragraph",
        data: "光有一个错误栈没用。至少带上：用户 ID、当前路由、浏览器和版本、发生时间、最近几条用户操作（面包屑）。这些信息能让你还原现场，而不是对着堆栈猜。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、什么时候上 Sentry"
      },
      {
        type: "paragraph",
        data: "个人项目自己写个上报接口就够了。团队协作、需要聚合分析、需要 source map 还原时，Sentry 这类平台能省掉大量造轮子的时间。免费的额度对个人项目完全够用。"
      },
      {
        type: "quote",
        data: "监控的价值不在于「抓到错误」，而在于「抓到后能还原现场」。",
        author: "前端笔记"
      }
    ],
    views: 15,
    tags: ["监控", "Sentry", "前端开发"],
    likes: 3,
    dislikes: 0
  },
  {
    id: 44,
    title: "WebSocket 实战：从轮询到双向推送",
    author: "博主",
    category: "后端开发",
    summary: "HTTP 轮询为什么浪费、WebSocket 握手做了什么、断线重连和心跳怎么设计。用博客消息通知做例子。",
    contentBlocks: [
      {
        "type": "heading",
        level: 1,
        data: "WebSocket 实战：从轮询到双向推送"
      },
      {
        type: "paragraph",
        data: "轮询的浪费很明显：大部分请求返回的都是「没有新消息」。WebSocket 建立一次连接后双方随时可发，把这个浪费消灭了。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、握手：从 HTTP 升级"
      },
      {
        type: "paragraph",
        data: "WebSocket 连接以一个普通 HTTP 请求开始，带 Upgrade: websocket 和 Sec-WebSocket-Key 头。服务端返回 101 状态码后，这条 TCP 连接就脱离 HTTP，进入帧协议通信。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、前端必备的重连逻辑"
      },
      {
        type: "code",
        language: "javascript",
        data: `let socket
let retry = 0

function connect() {
  socket = new WebSocket('wss://example.com/ws')

  socket.onopen = () => {
    retry = 0
    // 启动心跳
    socket.send(JSON.stringify({ type: 'ping' }))
  }

  socket.onclose = () => {
    const delay = Math.min(1000 * 2 ** retry++, 30000)
    setTimeout(connect, delay) // 指数退避
  }
}`
      },
      {
        type: "paragraph",
        data: "指数退避是关键：失败次数越多，重试间隔越长，上限 30 秒。否则服务端一挂，所有客户端疯狂重连，把恢复中的服务再次打垮。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、心跳的意义"
      },
      {
        type: "paragraph",
        data: "NAT 和防火墙会清理长期空闲的连接。定时发 ping、收到 pong，既保活又能及时发现连接已经死了。服务端通常 30 秒收不到心跳就主动断开。"
      },
      {
        type: "quote",
        data: "WebSocket 不难，难的是连接断开之后你怎么处理。",
        author: "后端笔记"
      }
    ],
    views: 23,
    tags: ["WebSocket", "实时通信", "后端开发"],
    likes: 5,
    dislikes: 0
  },
  {
    id: 45,
    title: "JWT vs Session：认证方案怎么选",
    author: "博主",
    category: "后端开发",
    summary: "无状态不是免费的午餐。这篇对比两种方案的存储、撤销、跨域和安全性，以及为什么我把 token 存在 localStorage 又后悔了。",
    contentBlocks: [
      {
        "type": "heading",
        level: 1,
        data: "JWT vs Session：认证方案怎么选"
      },
      {
        type: "paragraph",
        data: "JWT 常被吹成「无状态、可扩展」的银弹，但它的代价是撤销困难。Session 被说成「有状态、难扩展」，但共享存储之后其实没那么糟。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、核心区别"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Session：服务端存状态，浏览器只拿一个 sessionId Cookie",
          "JWT：状态编码进 token 本身，服务端只验证签名",
          "Session 想撤销：删掉服务端记录即可",
          "JWT 想撤销：等过期，或者维护黑名单（又变回有状态）"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "二、localStorage 的 XSS 风险"
      },
      {
        type: "paragraph",
        data: "我最初把 JWT 存在 localStorage，方便 axios 拦截器直接读。但任何 XSS 都能拿走它。更稳妥的做法是放在 HttpOnly Cookie 里——JS 读不到，浏览器自动带上。代价是要处理 CSRF（SameSite 属性 + CSRF Token）。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、我的选择"
      },
      {
        type: "paragraph",
        data: "个人博客这种场景：JWT + 7 天过期 + localStorage，够用。真要上生产、有多用户和权限系统，我会选 HttpOnly Cookie + Session，或者使用带刷新令牌的短效 JWT。"
      },
      {
        type: "quote",
        data: "安全方案没有绝对正确，只有和你的威胁模型匹配。",
        author: "安全笔记"
      }
    ],
    views: 29,
    tags: ["JWT", "认证", "安全"],
    likes: 7,
    dislikes: 0
  },
  {
    id: 46,
    title: "CORS 完全解析：为什么预检请求让你崩溃",
    author: "博主",
    category: "后端开发",
    summary: "简单请求和预检请求的边界、Access-Control-* 各头的作用，以及 origin: '*' 为什么不能和 credentials 一起用。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        data: "CORS 完全解析：为什么预检请求让你崩溃"
      },
      {
        type: "paragraph",
        data: "CORS 是浏览器同源策略的补丁，不是服务端安全机制。理解这一点，很多配置上的困惑就解开了。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、什么情况下会预检"
      },
      {
        type: "paragraph",
        data: "请求方法不是 GET/HEAD/POST，或者 Content-Type 不是 application/x-www-form-urlencoded、multipart/form-data、text/plain，或者带了自定义头（比如 Authorization），浏览器就会先发一个 OPTIONS 预检。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 前端发了自定义头
axios.post(url, data, {
  headers: { Authorization: 'Bearer xxx' }
})
// 浏览器先自动发 OPTIONS，服务端不返回正确的 CORS 头，
// 真正的 POST 根本不会发出去`
      },
      {
        type: "heading",
        level: 2,
        data: "二、服务端要返回什么"
      },
      {
        type: "code",
        language: "javascript",
        data: `app.use(cors({
  origin: ['https://blog.example.com'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))`
      },
      {
        type: "heading",
        level: 2,
        data: "三、星号的陷阱"
      },
      {
        type: "paragraph",
        data: "Access-Control-Allow-Origin: * 不能和 credentials: true 一起用——浏览器会直接拒绝。需要携带 Cookie 时必须明确列出来源。我的博客是公开 API 不带 Cookie，所以用 * 没问题；一旦加了登录态，就得改白名单。"
      },
      {
        type: "quote",
        data: "CORS 拦的是浏览器读不读响应，拦不住别人用 curl 调你的接口。鉴权还是得后端做。",
        author: "安全笔记"
      }
    ],
    views: 27,
    tags: ["CORS", "HTTP", "前端开发"],
    likes: 6,
    dislikes: 0
  },
  {
    id: 47,
    title: "算法笔记：双指针与滑动窗口的套路",
    author: "博主",
    category: "编程语言",
    summary: "面试官爱考、工作里也真用得到。把这两类题的识别信号和模板总结一下，下次遇到不用现想。",
    contentBlocks: [
      {
        "type": "heading",
        level: 1,
        data: "算法笔记：双指针与滑动窗口的套路"
      },
      {
        type: "paragraph",
        data: "刷算法题最怕每次都从零开始想。双指针和滑动窗口有非常明确的识别信号，掌握模板后能解决一大类问题。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、什么时候用双指针"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "有序数组 + 找两个数/三数之和 → 左右指针夹逼",
          "链表 + 找中点/环 → 快慢指针",
          "原地修改数组（去重、移动零）→ 读写指针"
        ]
      },
      {
        type: "code",
        language: "javascript",
        data: `// 有序数组两数之和
function twoSum(nums, target) {
  let left = 0, right = nums.length - 1
  while (left < right) {
    const sum = nums[left] + nums[right]
    if (sum === target) return [left, right]
    if (sum < target) left++
    else right--
  }
  return []
}`
      },
      {
        type: "heading",
        level: 2,
        data: "二、滑动窗口模板"
      },
      {
        type: "paragraph",
        data: "题目要求「最长/最短子串」「满足某条件的连续区间」，八成是滑动窗口。右指针扩窗口，左指针收缩，维护一个计数器或 Map。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 无重复字符的最长子串
function lengthOfLongestSubstring(s) {
  const seen = new Map()
  let left = 0, max = 0

  for (let right = 0; right < s.length; right++) {
    const ch = s[right]
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1
    }
    seen.set(ch, right)
    max = Math.max(max, right - left + 1)
  }
  return max
}`
      },
      {
        type: "quote",
        data: "识别题型比硬想解法更重要。看到「连续」「最长」「有序」，先往这两个方向靠。",
        author: "算法笔记"
      }
    ],
    views: 32,
    tags: ["算法", "JavaScript", "编程语言"],
    likes: 8,
    dislikes: 0
  },
  {
    id: 48,
    title: "观察者模式在前端的真实应用",
    author: "博主",
    category: "前端开发",
    summary: "不是只有 EventEmitter 才叫观察者。从 Vue 的响应式到 DOM 事件，再到 Node 的 EventBus，到处都是它的影子。",
    contentBlocks: [
      {
        "type": "heading",
        level: 1,
        data: "观察者模式在前端的真实应用"
      },
      {
        type: "paragraph",
        data: "设计模式书里讲得云里雾里的东西，其实每天都在用。观察者模式的定义是：一个对象维护一串依赖它的对象，状态变化时自动通知。"
      },
      {
        type: "code",
        language: "javascript",
        data: `class EventBus {
  constructor() {
    this.events = new Map()
  }

  on(name, fn) {
    if (!this.events.has(name)) this.events.set(name, new Set())
    this.events.get(name).add(fn)
    return () => this.events.get(name).delete(fn) // 返回取消订阅
  }

  emit(name, payload) {
    this.events.get(name)?.forEach(fn => fn(payload))
  }
}`
      },
      {
        type: "heading",
        level: 2,
        data: "一、Vue 响应式就是观察者"
      },
      {
        type: "paragraph",
        data: "ref 内部有个 Dep（依赖集合），effect 运行时把自己收集进去，值变化时通知所有 effect 重新执行。这就是观察者模式 + 依赖收集。理解了这一点，很多响应式的「不更新」问题就好排查了。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、别忘了取消订阅"
      },
      {
        type: "paragraph",
        data: "观察者模式最常见的 bug 是内存泄漏：组件销毁了，订阅还在，事件一来就回调一个已经不存在的组件。所以 on() 最好返回取消函数，在 onUnmounted 里调用。"
      },
      {
        type: "quote",
        data: "有订阅就要有退订。这是观察者模式的铁律。",
        author: "前端笔记"
      }
    ],
    views: 18,
    tags: ["设计模式", "JavaScript", "前端开发"],
    likes: 4,
    dislikes: 0
  },
  {
    id: 49,
    title: "Vite 为什么这么快：从预构建到 HMR",
    author: "博主",
    category: "前端工程化",
    summary: "启动快、热更新快，背后是 esbuild 和原生 ESM。这篇拆开 Vite 的两阶段架构，顺便解释依赖预构建到底在干什么。",
    contentBlocks: [
      {
        "type": "heading",
        "level": 1,
        data: "Vite 为什么这么快：从预构建到 HMR"
      },
      {
        type: "paragraph",
        data: "Webpack 启动时要扫描整个依赖图、打包成一个 bundle。Vite 换个思路：开发阶段直接用浏览器原生 ESM，让浏览器自己去加载模块。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、两阶段架构"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "开发阶段：esbuild 预构建依赖 + 原生 ESM 按需加载",
          "生产阶段：Rollup 打包，追求最优的 chunk 和 tree shaking"
        ]
      },
      {
        type: "paragraph",
        data: "预构建解决两个问题：一是 CommonJS 依赖浏览器不认识，二是 lodash-es 这类库有几百个小模块，不合并会发起几百个请求。esbuild 用 Go 写的，速度快一个数量级。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、HMR 的边界"
      },
      {
        type: "paragraph",
        data: "Vite 的热更新默认是模块级：改一个文件，只重新加载这个模块及其依赖链。但有些框架插件做不到细粒度，会导致整页刷新。遇到「一改就刷新」的情况，先检查是不是插件的 HMR 边界没配好。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 组件里手动处理 HMR 边界
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // 自定义更新逻辑
  })
}`
      },
      {
        type: "quote",
        data: "Vite 快不是因为 magic，是因为它把「不需要做的事」全砍掉了。",
        author: "工程化笔记"
      }
    ],
    views: 25,
    tags: ["Vite", "前端工程化", "构建工具"],
    likes: 6,
    dislikes: 0
  },
  {
    id: 50,
    title: "写技术博客的这半年：一些诚实的复盘",
    author: "博主",
    category: "个人日记",
    summary: "从写作动机到选题焦虑，从「想写完美」到「先发出去」。不聊技术，聊聊坚持本身。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "写技术博客的这半年：一些诚实的复盘"
      },
      {
        type: "paragraph",
        data: "博客上线半年多，文章从 18 篇涨到 50 多篇。回头看，最大的收获不是流量，而是「把模糊的理解写清楚」这个过程本身。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、写作暴露理解漏洞"
      },
      {
        type: "paragraph",
        data: "很多知识点我以为自己懂了，一动笔就卡住——「为什么这里用微任务」「这个索引到底什么时候生效」。卡住的地方，就是理解的边界。写完一篇，那个边界就往前推了一点。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、完美主义是最大的敌人"
      },
      {
        type: "paragraph",
        data: "我曾经的草稿箱里躺着十几篇「差一点就写好」的文章。后来定了个规矩：先发出去，再迭代。一篇 80 分但存在的文章，价值远大于 100 分但永远在草稿里的文章。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、写给谁看"
      },
      {
        type: "paragraph",
        data: "写给半年后的自己。现在觉得理所当然的东西，半年后可能忘得干干净净。这篇博客就是我的外置大脑。"
      },
      {
        type: "quote",
        data: "输出不是输入的总结，而是理解的开始。",
        author: "写作笔记"
      }
    ],
    views: 41,
    tags: ["个人日记", "写作", "复盘"],
    likes: 12,
    dislikes: 0
  },
  {
    id: 51,
    title: "内网服务健康检查：/health 该返回什么",
    author: "博主",
    category: "运维",
    summary: "一个能返回 200 的接口不等于健康。区别存活探针和就绪探针，顺带聊聊为什么保活请求别打首页。",
    contentBlocks: [
      {
        "type": "heading",
        level: 1,
        data: "内网服务健康检查：/health 该返回什么"
      },
      {
        type: "paragraph",
        data: "我最初的健康检查就是 curl 首页，200 就算活着。后来发现数据库断了但首页还能返回缓存页面，监控一片绿，用户那边全是错。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、区分两种探针"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "存活探针（liveness）：进程在不在，挂了就重启容器",
          "就绪探针（readiness）：能不能接流量，没准备好就从负载均衡摘掉"
        ]
      },
      {
        type: "paragraph",
        data: "区分的意义在于：数据库短暂不可用时，你不想重启服务（重启也没用），只想知道「暂时别给我流量」。"
      },
      {
        type: "code",
        language: "javascript",
        data: `app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

app.get('/ready', async (req, res) => {
  const dbOk = await checkDbConnection()
  res.status(dbOk ? 200 : 503).json({ ready: dbOk })
})`
      },
      {
        type: "heading",
        level: 2,
        data: "二、保活请求别打首页"
      },
      {
        type: "paragraph",
        data: "Render 免费层会休眠，我用 UptimeRobot 每 5 分钟打一次 /health。这个接口不查库、不渲染、不加载静态资源，几毫秒就返回。打首页的话，等于每 5 分钟制造一次完整的数据库查询。"
      },
      {
        type: "quote",
        data: "健康检查的职责是「快速回答问题」，不是「顺便把活干了」。",
        author: "运维笔记"
      }
    ],
    views: 20,
    tags: ["健康检查", "运维", "监控"],
    likes: 5,
    dislikes: 0
  },
  {
    id: 52,
    title: "给博客加文章的正确姿势：别跑 seed.js",
    author: "博主",
    category: "个人日记",
    summary: "一次差点清空线上数据的惊险操作，以及我后来写的增量脚本。顺便解释幂等设计为什么重要。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "给博客加文章的正确姿势：别跑 seed.js"
      },
      {
        type: "paragraph",
        data: "我的博客有个 seed.js，用来初始化 18 篇示例文章。它的第二行逻辑是 deleteMany({})——清空所有文章再插入。每次想加文章，我都得先想起这件事。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、危险在哪"
      },
      {
        type: "paragraph",
        data: "seed.js 的设计目标是「初始化」，不是「追加」。如果你在生产环境手滑跑了一次，所有真实文章、浏览量、点赞数全部归零。这种脚本应该改名成 reset-database.js，让名字本身就带警告。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、增量脚本怎么写"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 按 id 和 title 双重去重
const existing = await Post.find({}, { id: 1, title: 1 }).lean()
const existingIds = new Set(existing.map(p => p.id))
const existingTitles = new Set(existing.map(p => p.title))

const toInsert = extraPosts.filter(
  p => !existingIds.has(p.id) && !existingTitles.has(p.title)
)
await Post.insertMany(toInsert)`
      },
      {
        type: "paragraph",
        data: "关键特性是幂等：跑一次和跑十次的结果一样。这样即使不确定上次有没有成功，也能安全地重跑。这是运维脚本最重要的性质。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、写在最后"
      },
      {
        type: "paragraph",
        data: "现在加文章只需要：编辑 seed-extra.js，跑 node src/seed-append.js，验证数量。整个过程不碰旧数据。"
      },
      {
        type: "quote",
        data: "破坏性操作要有明显的名字，安全操作要能重复执行。",
        author: "踩坑记录"
      }
    ],
    views: 11,
    tags: ["个人日记", "MongoDB", "运维"],
    likes: 3,
    dislikes: 0
  }
];

export default extraPosts2;
