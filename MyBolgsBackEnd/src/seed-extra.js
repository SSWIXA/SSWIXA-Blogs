// 增量文章数据（id 19 起）
// 注意：本文件只存放「追加」用的文章，绝不可直接跑 seed.js 清空线上数据。
// seed-append.js 会按 id 去重，安全地往现有库里补充。

const extraPosts = [
  {
    id: 19,
    title: "从 JavaScript 到 Go：一次思维方式的切换",
    author: "博主",
    category: "编程语言",
    summary: "写了多年 JavaScript 再上手 Go，最难的从来不是语法，而是并发模型和错误处理的 thinking style。这篇记录我真正卡住的几个点。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "从 JavaScript 到 Go：一次思维方式的切换"
      },
      {
        type: "paragraph",
        data: "Go 的语法一周就能看完，但真正写出来像 Go 的代码，花了我差不多两个月。原因不是语言特性多，而是它逼你换一种方式思考错误、并发和依赖。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、错误是值，不是异常"
      },
      {
        type: "paragraph",
        data: "JavaScript 里习惯 try/catch 一把梭，Go 里错误是函数返回值的一部分。刚开始觉得啰嗦，写多了才发现好处：错误处理变成了显式的控制流，你没法假装它不存在。"
      },
      {
        type: "code",
        language: "go",
        data: `func loadConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("read config %s: %w", path, err)
    }
    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, fmt.Errorf("parse config: %w", err)
    }
    return &cfg, nil
}`
      },
      {
        type: "paragraph",
        data: "%w 包裹错误是关键——保留了原始错误链，调用方还能用 errors.Is / errors.As 判断类型。这是 Go 1.13 之后处理错误的正确姿势。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、并发不是 Promise.all"
      },
      {
        type: "paragraph",
        data: "JS 的异步是单线程事件循环，Go 的 goroutine 是真并发。最大的坑是共享状态：在 JS 里你几乎不用考虑数据竞争，在 Go 里只要两个 goroutine 写同一个变量，就该想到锁或 channel。"
      },
      {
        type: "code",
        language: "go",
        data: `func fetchAll(urls []string) []Result {
    results := make(chan Result, len(urls))
    var wg sync.WaitGroup

    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            results <- fetch(u)
        }(url)
    }

    wg.Wait()
    close(results)

    out := make([]Result, 0, len(urls))
    for r := range results {
        out = append(out, r)
    }
    return out
}`
      },
      {
        type: "quote",
        data: "不要通过共享内存来通信，而要通过通信来共享内存。",
        author: "Go 并发编程哲学"
      },
      {
        type: "heading",
        level: 2,
        data: "三、依赖管理更直白"
      },
      {
        type: "paragraph",
        data: "没有 package.json 那种嵌套依赖树，go.mod 显式声明模块和版本。go build 出来的二进制自带运行时，丢到服务器上就能跑，不用装 Node 版本管理器。部署那一刻你会感谢这个设计。"
      },
      {
        type: "divider"
      },
      {
        type: "paragraph",
        data: "总结：从 JS 转 Go，别急着写并发。先把「错误必须处理」这个习惯建立起来，再理解 channel 的所有权语义，最后才是性能优化。顺序反了会掉进很多坑里。"
      }
    ],
    views: 18,
    tags: ["Go", "编程语言", "后端开发"],
    likes: 3,
    dislikes: 0
  },
  {
    id: 20,
    title: "高并发系统设计：先搞懂限流、削峰和队列",
    author: "博主",
    category: "后端开发",
    summary: "高并发不是「加机器」三个字就完了。这篇从第一性原理拆一下：系统的瓶颈在哪、为什么限流是保护而非拒绝、消息队列到底解决了什么。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "高并发系统设计：先搞懂限流、削峰和队列"
      },
      {
        type: "paragraph",
        data: "很多人一提高并发就想到加缓存、加机器、上 Kubernetes。但如果不先弄清楚「系统为什么扛不住」，这些手段只是把问题往后推。真正的起点是：找到那个先崩溃的瓶颈。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、瓶颈永远是某个具体资源"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "CPU 打满：序列化、加密、正则回溯、死循环",
          "内存爆掉：大对象缓存、无界队列、连接泄漏",
          "磁盘 IO：日志同步写、数据库慢查询",
          "连接池耗尽：慢 SQL 占着连接不放，比没有连接更致命",
          "带宽打满：响应体过大、图片未压缩"
        ]
      },
      {
        type: "paragraph",
        data: "优化的第一步永远是测量，不是猜测。先上监控，看 P99 而不是平均值——平均值会骗人，P99 才是用户真实感受到的卡顿。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、限流是保护，不是拒绝"
      },
      {
        type: "paragraph",
        data: "限流的核心思想：与其让系统在流量洪峰下整体崩溃，不如有策略地牺牲一部分请求。常见算法有四种——固定窗口最简单但有临界突变，滑动窗口平滑一些，漏桶保证恒定速率，令牌桶允许突发。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 令牌桶：允许一定程度的突发流量
class TokenBucket {
  constructor(capacity, refillRatePerSec) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRatePerSec;
    this.lastRefill = Date.now();
  }

  take(n = 1) {
    const now = Date.now();
    this.tokens = Math.min(
      this.capacity,
      this.tokens + ((now - this.lastRefill) / 1000) * this.refillRate
    );
    this.lastRefill = now;
    if (this.tokens < n) return false;
    this.tokens -= n;
    return true;
  }
}`
      },
      {
        type: "heading",
        level: 2,
        data: "三、队列削峰的本质是「时间换空间」"
      },
      {
        type: "paragraph",
        data: "秒杀场景下把请求丢进 MQ，消费者按自己的速度处理——这招之所以有效，是因为把「同一瞬间的高压」摊平成了「一段时间内的稳定压力」。代价是用户不能立刻拿到结果，需要轮询或推送。"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "请求入队立即返回「处理中」",
          "消费者按固定并发数慢慢处理",
          "处理完写回状态，前端轮询或 WebSocket 通知"
        ]
      },
      {
        type: "quote",
        data: "削峰不是消灭流量，而是改变流量到达系统的时间分布。",
        author: "系统设计笔记"
      },
      {
        type: "paragraph",
        data: "队列引入后必须面对新问题：重复消费（幂等）、消息丢失（确认机制）、消息积压（扩容消费者）。这些才是真正的工程难点。"
      }
    ],
    views: 22,
    tags: ["高并发", "系统设计", "后端开发"],
    likes: 5,
    dislikes: 0
  },
  {
    id: 21,
    title: "MongoDB 索引设计与 explain 实战",
    author: "博主",
    category: "数据库",
    summary: "博客文章数一多，列表页就开始慢。这篇用真实查询走一遍 explain，讲清楚复合索引的最左前缀、覆盖索引，以及为什么「加了索引反而更慢」。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "MongoDB 索引设计与 explain 实战"
      },
      {
        type: "paragraph",
        data: "MongoDB 的索引和 MySQL 的 B+ 树索引本质类似，但「复合索引的字段顺序」这个细节，踩过坑的人才会真正记住。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、先看 explain，别凭感觉"
      },
      {
        type: "code",
        language: "javascript",
        data: `db.posts.find({ category: "后端开发", views: { $gte: 50 } })
  .sort({ createdAt: -1 })
  .explain("executionStats")`
      },
      {
        type: "paragraph",
        data: "重点看三个字段：executionStats.totalDocsExamined（实际扫描文档数）、totalKeysExamined（扫描索引键数）、nReturned（返回数）。如果 examined 远大于 returned，说明索引没吃上。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、最左前缀原则"
      },
      {
        type: "paragraph",
        data: "建 { category: 1, views: 1, createdAt: -1 } 这个复合索引后，查询条件从 category 开始才能用上。只按 views 查？索引失效，全表扫描。字段顺序的经验法则：等值条件在前，范围条件在后，排序字段放最后。"
      },
      {
        type: "code",
        language: "javascript",
        data: `// 好：等值 → 范围 → 排序
db.posts.createIndex({ category: 1, views: 1, createdAt: -1 })

// 这个查询能完整命中索引
db.posts.find({ category: "后端开发", views: { $gte: 50 } })
  .sort({ createdAt: -1 })`
      },
      {
        type: "heading",
        level: 2,
        data: "三、索引不是越多越好"
      },
      {
        type: "paragraph",
        data: "每个索引都要占用内存和磁盘，写操作时要同步维护所有索引。一个集合上挂十几个「可能有用」的索引，写入性能会明显下降。用 db.collection.getIndexes() 定期审查，删掉从没被用到的那个。"
      },
      {
        type: "divider"
      },
      {
        type: "paragraph",
        data: "最后提醒：MongoDB 5 之前的版本在索引选择上没那么聪明，遇到复杂查询可以用 hint() 强制指定索引，但这是权宜之计，不是常态方案。"
      }
    ],
    views: 15,
    tags: ["MongoDB", "数据库", "性能优化"],
    likes: 2,
    dislikes: 0
  },
  {
    id: 22,
    title: "Vue 3 Composition API：从「能用」到「好用」",
    author: "博主",
    category: "前端开发",
    summary: "Options API 写熟了再切 Composition API，一开始只是换个写法。这篇讲我真正体会到它价值的地方：逻辑复用、类型推导和副作用管理。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Vue 3 Composition API：从「能用」到「好用」"
      },
      {
        type: "paragraph",
        data: "刚切到 Composition API 时，我只是把 data 改成 ref、methods 改成 function，觉得「不过如此」。直到写一个复杂的搜索页，才明白它的真正价值在于：相关逻辑可以聚在一起，而不是散落在 data / methods / watch 三个地方。"
      },
      {
      "type": "heading",
      "level": 2,
      "data": "一、用 composable 抽离逻辑"
      },
      {
        type: "code",
        language: "typescript",
        data: `// useArticleList.ts
export function useArticleList() {
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const page = ref(1)

  const load = async () => {
    loading.value = true
    try {
      articles.value = await fetchArticles(page.value)
    } finally {
      loading.value = false
    }
  }

  watch(page, load)
  onMounted(load)

  return { articles, loading, page, load }
}`
      },
      {
        type: "paragraph",
        data: "这个 composable 里，状态、副作用、加载时机是一个完整闭环。组件里只需要 `const { articles, loading } = useArticleList()`，读起来清爽很多。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、ref 和 reactive 怎么选"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "基本类型用 ref，必须 .value，但类型推导最稳",
          "对象/数组用 reactive，直接改属性，但解构会丢响应性",
          "不确定就用 ref，心智负担最低",
          "toRefs 可以在解构 reactive 时保留响应性"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "三、副作用一定要清理"
      },
      {
        type: "paragraph",
        data: "定时器、事件监听、WebSocket，在 onMounted 里创建就要在 onUnmounted 里销毁。否则路由来回切几次，定时器还在后台跑，内存泄漏就是这么来的。"
      },
      {
        type: "code",
        language: "typescript",
        data: `let timer: number | undefined
onMounted(() => { timer = window.setInterval(tick, 1000) })
onUnmounted(() => { if (timer) clearInterval(timer) })`
      },
      {
        type: "quote",
        data: "Composition API 不是让你写得更短，而是让相关的代码待在一起。",
        author: "前端笔记"
      }
    ],
    views: 20,
    tags: ["Vue 3", "前端开发", "TypeScript"],
    likes: 4,
    dislikes: 0
  },
  {
    id: 23,
    title: "Docker 多阶段构建：把镜像从 1GB 压到 100MB",
    author: "博主",
    category: "运维",
    summary: "我的博客镜像曾经塞满了 node_modules 和 40 个 Live2D 模型。这篇记录多阶段构建、依赖裁剪和大文件精简的具体做法。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Docker 多阶段构建：把镜像从 1GB 压到 100MB"
      },
      {
        type: "paragraph",
        data: "第一版 Dockerfile 简单粗暴：FROM node:20，COPY 全部文件，npm install，CMD 启动。能跑，但镜像巨大，每次部署拉取都要等半天。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、多阶段构建隔离构建依赖"
      },
      {
        type: "paragraph",
        data: "前端只需要构建产物，不需要 Vite、TypeScript、eslint 这些开发依赖。用一个 stage 构建，另一个 stage 只 COPY dist 目录，构建工具就不会进最终镜像。"
      },
      {
        type: "code",
        language: "dockerfile",
        data: `FROM node:20-alpine AS frontend-build
WORKDIR /build
COPY MyBolgs/package.json ./
RUN npm install --no-audit --no-fund
COPY MyBolgs/ ./
RUN npm run build-only

FROM node:20-alpine
WORKDIR /app/MyBolgsBackEnd
COPY MyBolgsBackEnd/package.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY MyBolgsBackEnd/src ./src
COPY --from=frontend-build /build/dist /app/MyBolgs/dist
CMD ["node", "src/server.js"]`
      },
      {
        type: "heading",
        level: 2,
        data: "二、alpine 镜像不是万能的"
      },
      {
        type: "paragraph",
        data: "alpine 用 musl libc，有些原生模块（比如 sharp、canvas）会编译失败。遇到这种情况要么装 build-base 编译工具链，要么老老实实用 node:20-slim。别为了省几十 MB 把自己卡死。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、大文件的取舍"
      },
      {
        type: "paragraph",
        data: "我的看板娘有 40 个模型，加起来 670MB+。全塞进镜像完全不划算。最终方案：镜像里只放两个默认模型，其余放对象存储，前端按需拉取。配合 .dockerignore 排除 .git、node_modules、模型目录，镜像立刻瘦下来。"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          ".dockerignore 排除 .git / node_modules / *.log",
          "生产依赖用 --omit=dev",
          "静态资源走 CDN 或对象存储",
          "按层缓存：先 COPY package.json，再 COPY 源码"
        ]
      }
    ],
    views: 28,
    tags: ["Docker", "DevOps", "部署"],
    likes: 6,
    dislikes: 0
  },
  {
    id: 24,
    title: "给 API 加上 JWT 鉴权：一次真实的安全修复",
    author: "博主",
    category: "后端开发",
    summary: "发现写接口裸奔之后，我做了什么。这篇记录从发现问题、验证漏洞到修复验证的完整过程，以及为什么登录接口不能挂鉴权。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "给 API 加上 JWT 鉴权：一次真实的安全修复"
      },
      {
        type: "paragraph",
        data: "我的博客后台有登录功能，图片上传也挂了 JWT。但某天回头看路由文件，发现文章的增删改四个接口居然一个中间件都没有——登录形同虚设。"
      },
      {
      "type": "heading",
      "level": 2,
      "data": "一、怎么验证漏洞是真的"
      },
      {
        type: "paragraph",
        data: "不要靠读代码猜。直接发一个不带 Authorization 头的 POST 请求：如果返回 401，说明被拦住了；如果返回参数校验错误（比如「内容不能为空」），说明请求已经进了 controller，鉴权根本没生效。"
      },
      {
        type: "code",
        language: "bash",
        data: `curl -X POST https://example.com/api/v1/articles \\
  -H "Content-Type: application/json" \\
  -d '{"title":"probe"}'`
      },
      {
        type: "heading",
        level: 2,
        data: "二、修复：在路由层挂中间件"
      },
      {
        type: "code",
        language: "javascript",
        data: `import { authMiddleware } from '../../middlewares/auth.js';

router.post('/', authMiddleware, createArticle);
router.patch('/:id', authMiddleware, updateArticle);
router.put('/:id', authMiddleware, updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);`
      },
      {
        type: "paragraph",
        data: "为什么挂在路由层而不是全局 app.use？因为登录接口本身不能鉴权（否则永远登不进去），文章列表和详情要允许匿名访问。白名单式地挂载，比全局挂载再排除更清晰。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、哪些接口故意不挂"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "登录接口：鉴权的入口，挂了就死锁",
          "文章列表/详情：博客是给人看的，必须公开",
          "点赞/点踩：读者交互，挂了会破坏匿名访问；代价是可以被刷，后续再加限流"
        ]
      },
      {
        type: "quote",
        data: "安全修复的第一步不是写代码，而是能复现问题；最后一步也不是写完，而是重新发一次请求确认返回 401。",
        author: "踩坑记录"
      },
      {
        type: "paragraph",
        data: "另外顺手检查了密钥：如果代码里有硬编码的兜底 JWT_SECRET，一定要删掉。环境变量缺失时直接启动失败，比悄悄用一个弱密钥安全得多。"
      }
    ],
    views: 12,
    tags: ["JWT", "API", "安全", "后端开发"],
    likes: 4,
    dislikes: 0
  },
  {
    id: 25,
    title: "Render 免费部署踩坑：防休眠、区域和蓝图",
    author: "博主",
    category: "运维",
    summary: "免费层 15 分钟无请求就休眠，冷启动能等半分钟。这篇记录我用 UptimeRobot 保活、切换新加坡区域和编写 render.yaml 的实际经验。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Render 免费部署踩坑：防休眠、区域和蓝图"
      },
      {
        type: "paragraph",
        data: "Render 免费层适合个人项目，但有三个坑：休眠、区域不可改、环境变量容易漏配。逐个说。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、休眠与保活"
      },
      {
        type: "paragraph",
        data: "免费 Web Service 连续 15 分钟无请求会休眠，下次访问要冷启动。我用 UptimeRobot 每 5 分钟打一次 /health 接口。注意：用一个极轻量的健康检查端点，别打首页——首页可能查数据库、拉 Live2D 模型，白白浪费资源。"
      },
      {
        type: "code",
        language: "javascript",
        data: `app.get('/health', (req, res) => {
  res.json({ success: true, timestamp: new Date().toISOString() });
});`
      },
      {
        type: "heading",
        level: 2,
        data: "二、区域选错只能重建"
      },
      {
        type: "paragraph",
        data: "创建服务时选了美西，国内访问延迟高得离谱。后来发现区域创建后不能改，只能新建服务再切域名。血泪教训：先把区域想清楚，亚洲用户就在 Blueprint 里写 region: singapore。"
      },
      {
        type: "code",
        language: "yaml",
        data: `services:
  - type: web
    name: sswixa-blogs
    runtime: docker
    dockerfilePath: ./Dockerfile
    region: singapore
    plan: free
    healthCheckPath: /health
    autoDeploy: true
    envVars:
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        generateValue: true`
      },
      {
        type: "heading",
        level: 2,
        data: "三、环境变量的两种写法"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "sync: false：敏感值不在仓库里，创建服务时手动填",
          "generateValue: true：让 Render 自动生成随机密钥，避免硬编码",
          "本地 .env 必须加进 .gitignore，且定期 rotate 数据库密码"
        ]
      }
    ],
    views: 26,
    tags: ["Render", "部署", "运维"],
    likes: 5,
    dislikes: 0
  },
  {
    id: 26,
    title: "从 0 到 1 搭个人博客：架构复盘",
    author: "博主",
    category: "个人日记",
    summary: "前后端分离、内容块编辑器、Live2D 看板娘、樱花特效、Docker + Render。回头看哪些决定是对的，哪些是技术债。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "从 0 到 1 搭个人博客：架构复盘"
      },
      {
        type: "paragraph",
        data: "博客从最初的静态页面，一路迭代成现在这套前后端分离的系统。写一个复盘，给以后想自己搭博客的人参考。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、做对的决定"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "内容块编辑器：比 Markdown 更直观，非技术内容也能排",
          "统一响应格式：前端拦截器一处处理，省掉大量重复代码",
          "Docker 一体化部署：换服务器不用重新配环境",
          "哈希路由：静态托管不用配 fallback，少踩很多坑"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "二、现在的债"
      },
      {
        type: "paragraph",
        data: "后端还留着几份旧版路由文件，虽然没被引用，但容易误导后来人。Mongoose 版本偏老，在新版 Node 下会打印弃用警告。还有 seed.js 那个 deleteMany——每次想加文章都得提心吊胆，这次终于改成了增量脚本。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、技术选型的第一性原理"
      },
      {
        type: "paragraph",
        data: "个人项目不需要追求最潮的架构。判断标准就三个：我能不能在一小时内本地跑起来？出问题能不能快速定位？迁移成本高不高？满足这三点，就是好方案。"
      },
      {
        type: "quote",
        data: "能长期维护的系统，不是设计得最完美的那个，而是你愿意一直打开来改的那个。",
        author: "博客复盘"
      }
    ],
    views: 33,
    tags: ["个人日记", "架构", "复盘"],
    likes: 7,
    dislikes: 0
  },
  {
    id: 27,
    title: "Chrome DevTools 性能分析：找到真正的卡顿点",
    author: "博主",
    category: "前端开发",
    summary: "Performance 面板不是看个总时长就完了。这篇讲怎么用火焰图定位长任务、强制回流和重复渲染，以及我博客里 Monaco 编辑器的一次优化。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Chrome DevTools 性能分析：找到真正的卡顿点"
      },
      {
        type: "paragraph",
        data: "「页面卡」是个模糊描述。可能脚本执行太久，可能布局重算太频繁，也可能只是图片太大。Performance 面板能把这些拆开给你看。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、录制的正确姿势"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "打开 DevTools → Performance，勾选 Screenshots 和 Web Vitals",
          "点击录制，复现卡顿操作",
          "停止录制，先看 Main 轨道的灰色长条——那是 Long Task",
          "点开长条看火焰图，找到最宽的那一帧调用栈"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "二、我遇到的 Monaco 坑"
      },
      {
        type: "paragraph",
        data: "博客文章页用 Monaco Editor 渲染代码块。最初在组件 setup 里直接 import 整个 monaco-editor，导致首屏 bundle 暴涨，解析脚本就花了 800ms。改成动态 import + 只在文章页加载后，首屏时间砍掉一半。"
      },
      {
        type: "code",
        language: "typescript",
        data: `// 按需加载，不进首屏 bundle
onMounted(async () => {
  const monaco = await import('monaco-editor')
  editor = monaco.editor.create(container.value!, options)
})`
      },
      {
        type: "heading",
        level: 2,
        data: "三、别忽略强制同步布局"
      },
      {
        type: "paragraph",
        data: "在循环里先写 DOM 样式再读 offsetHeight，会触发布局抖动（Layout Thrashing）。Performance 面板里表现为大量紫色的 Layout 和 Recalculate Style 交替出现。解决办法：把读操作批量放前面，写操作批量放后面。"
      },
      {
        type: "quote",
        data: "优化前先测量。你猜的瓶颈，八成不是真正的瓶颈。",
        author: "性能分析笔记"
      }
    ],
    views: 17,
    tags: ["前端开发", "性能优化", "Chrome"],
    likes: 3,
    dislikes: 0
  },
  {
    id: 28,
    title: "Redis 缓存三兄弟：击穿、穿透与雪崩",
    author: "博主",
    category: "后端开发",
    summary: "三个词经常一起出现，但成因和解法完全不同。用生活化的例子讲清楚，顺带写点可落地的代码。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "Redis 缓存三兄弟：击穿、穿透与雪崩"
      },
      {
        type: "paragraph",
        data: "缓存问题的面试八股，但真线上出事时，能分清这三种情况才不会乱改配置。"
      },
      {
        type: "heading",
        level: 2,
        data: "缓存穿透：查了一个根本不存在的东西"
      },
      {
        type: "paragraph",
        data: "有人不停请求 id=-1 的文章，缓存里永远没有，每次都打到数据库。解法：布隆过滤器挡掉不可能存在的 key，或者对空结果也缓存一个短 TTL 的占位值。"
      },
      {
        type: "heading",
        level: 2,
        data: "缓存击穿：热点 key 刚好过期"
      },
      {
        type: "paragraph",
        data: "一篇爆款文章缓存过期，同一瞬间上万个请求全部穿透到数据库。解法：热点数据永不过期（后台异步更新），或者用互斥锁只让一个请求去回源，其他请求等待。"
      },
      {
        type: "code",
        language: "javascript",
        data: `async function getWithLock(key, loader) {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)

  const lockKey = 'lock:' + key
  const locked = await redis.set(lockKey, '1', 'NX', 'EX', 10)
  if (!locked) {
    // 没抢到锁，稍等再读缓存
    await new Promise(r => setTimeout(r, 50))
    return getWithLock(key, loader)
  }

  try {
    const data = await loader()
    await redis.set(key, JSON.stringify(data), 'EX', 300)
    return data
  } finally {
    await redis.del(lockKey)
  }
}`
      },
      {
        type: "heading",
        level: 2,
        data: "缓存雪崩：大片 key 同时失效"
      },
      {
        type: "paragraph",
        data: "设置缓存时用了同一个 TTL，某个整点集体过期，数据库瞬间被压垮。解法很简单：TTL 加随机抖动，比如 300 秒 ± 60 秒。"
      },
      {
        type: "quote",
        data: "穿透是「查不到」，击穿是「热点过期」，雪崩是「集体过期」。成因不同，药方也不同。",
        author: "缓存笔记"
      }
    ],
    views: 19,
    tags: ["Redis", "缓存", "后端开发"],
    likes: 4,
    dislikes: 0
  },
  {
    id: 29,
    title: "CAP 定理：为什么分布式系统没法两全",
    author: "博主",
    category: "后端开发",
    summary: "不是「三选二」那么简单。这篇从网络分区这个前提出发，解释为什么一致性和可用性必须二选一，以及 CP / AP 各自适合什么场景。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "CAP 定理：为什么分布式系统没法两全"
      },
      {
        type: "paragraph",
        data: "CAP 定理最容易被误读成「一致性、可用性、分区容错性三选二」。其实更准确的说法是：分区容错是分布式系统的既定事实，你只能在 C 和 A 之间选。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、先理解分区（P）"
      },
      {
        type: "paragraph",
        data: "网线断了、交换机挂了、机房之间延迟暴增——节点之间无法通信就是分区。只要系统跑在多台机器上，分区迟早会发生。所以 P 不是选项，是前提。"
      },
      {
        type: "heading",
        level: 2,
        data: "二、分区发生时你必须做选择"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "选一致性（CP）：宁可返回错误，也不返回可能过期的数据。典型：ZooKeeper、HBase",
          "选可用性（AP）：先返回本地数据，哪怕它可能和其他节点不一致。典型：Cassandra、多数电商购物车"
        ]
      },
      {
        type: "paragraph",
        data: "没有对错，只有场景。银行转账必须 CP——宁可失败也不能让两个账户对不上。社交动态可以 AP——晚几秒看到好友的帖子没人会在意。"
      },
      {
        type: "heading",
        level: 2,
        data: "三、BASE 理论是 AP 的延伸"
      },
      {
        type: "paragraph",
        data: "基本可用（Basically Available）、软状态（Soft state）、最终一致性（Eventually consistent）。AP 系统不追求强一致，但保证经过一段时间后所有副本收敛。工程上通过异步复制、读修复、反熵协议实现。"
      },
      {
        type: "quote",
        data: "分布式系统的设计，本质是在「什么时候说谎」和「什么时候拒绝服务」之间做取舍。",
        author: "系统设计笔记"
      },
      {
        type: "paragraph",
        data: "最后补一句：CAP 讨论的是单个读写操作的原子一致性，不等于放弃事务。Paxos、Raft 这些共识算法就是在有分区风险的前提下实现强一致的方案。"
      }
    ],
    views: 24,
    tags: ["分布式", "系统设计", "后端开发"],
    likes: 6,
    dislikes: 0
  },
  {
    id: 30,
    title: "TypeScript 类型体操：从会用到能用",
    author: "博主",
    category: "编程语言",
    summary: "条件类型、映射类型、模板字面量类型——这些不是炫技，而是让库的使用者少写重复代码。挑几个我在项目里真用上的类型技巧。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "TypeScript 类型体操：从会用到能用"
      },
      {
        type: "paragraph",
        data: "网上很多类型体操例子（比如实现加法、斐波那契）看着厉害，但工作中用不上。这篇只写我实际在业务代码里用过的几个技巧。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、条件类型做返回值推断"
      },
      {
        type: "code",
        language: "typescript",
        data: `type ApiResult<T> = T extends { data: infer D }
  ? { ok: true; data: D }
  : { ok: false; error: string }

function unwrap<T>(res: T): ApiResult<T> {
  // ...
}`
      },
      {
        type: "heading",
        level: 2,
        data: "二、映射类型改字段可选性"
      },
      {
        type: "paragraph",
        data: "后端返回的文章完整对象，前端表单只需要其中几个字段。与其手写两个接口，不如用 Pick / Partial / Omit 组合出来。"
      },
      {
        type: "code",
        language: "typescript",
        data: `interface Post {
  _id: string
  title: string
  summary: string
  contentBlocks: Block[]
  views: number
}

// 创建文章时的表单类型
type PostForm = Omit<Post, '_id' | 'views'>

// 更新时所有字段可选
type PostPatch = Partial<PostForm>`
      },
      {
        type: "heading",
        level: 2,
        data: "三、模板字面量类型约束字符串"
      },
      {
        type: "code",
        language: "typescript",
        data: `type EventName = \`on\${Capitalize<string>}\`
// onLike / onDelete / onMount ...

type Route = \`/api/v1/\${'articles' | 'auth' | 'upload'}\``
      },
      {
        type: "heading",
        level: 2,
        data: "四、什么时候该停手"
      },
      {
        type: "paragraph",
        data: "类型系统是为了表达意图，不是为了证明你聪明。如果一个类型连写它的同事都要看十分钟才能读懂，就该拆开、加注释，或者干脆用 any 加运行时校验。类型复杂度也是技术债。"
      },
      {
        type: "quote",
        data: "好的类型设计，是让错误在编辑器里就暴露出来，而不是在用户手机上。",
        author: "前端笔记"
      }
    ],
    views: 21,
    tags: ["TypeScript", "编程语言", "前端开发"],
    likes: 5,
    dislikes: 0
  },
  {
    id: 31,
    title: "内网部署与 Gitea 私有仓库管理小记",
    author: "博主",
    category: "运维",
    summary: "团队内部的代码仓库怎么搭、怎么备份、怎么处理 master / main 分支不一致。都是些琐碎但每次都会踩的小坑。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "内网部署与 Gitea 私有仓库管理小记"
      },
      {
        type: "paragraph",
        data: "公共仓库用 GitHub / Gitee，内部项目放在自建 Gitea 上。这套组合用久了，积累了一些不大但很烦的坑。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、Gitea 部署要点"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "用 Docker Compose 起服务，数据卷单独挂出来，升级镜像不丢数据",
          "ROOT_URL 必须写对，否则 clone 地址会生成错误",
          "注册默认关闭，避免内网里任何人都能建账号",
          "定期备份 gitea.db 和仓库目录，别只备份数据库"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "二、master / main 分支冲突"
      },
      {
        type: "paragraph",
        data: "GitHub 新仓库默认 main，Gitea 老仓库默认 master，两边同步时就会打架。我的处理方式是：统一用一个名字（比如 master），在 .git/config 里明确 upstream 分支，push 时带完整引用。"
      },
      {
        type: "code",
        language: "bash",
        data: `# 查看当前分支映射
git branch -vv

# 推送到远程 master，不管本地叫什么
git push origin HEAD:master

# 同步多个远程
git remote -v
git push github master
git push gitee master
git push gitea master`
      },
      {
        type: "heading",
        level: 2,
        data: "三、别滥用 force push"
      },
      {
        type: "paragraph",
        data: "分支历史不一致时 force push 确实最快，但它会覆盖别人的提交。内网小团队也要先确认没人在这条分支上干活，再动手。"
      },
      {
        type: "quote",
        data: "工具越顺手，越要克制。git push -f 是手术刀，不是锤子。",
        author: "运维笔记"
      }
    ],
    views: 14,
    tags: ["Gitea", "Git", "运维"],
    likes: 2,
    dislikes: 0
  },
  {
    id: 32,
    title: "从 TCP 粘包说起：重新理解 Socket 协议",
    author: "博主",
    category: "编程语言",
    summary: "TCP 是字节流，不保留消息边界。为什么会出现粘包、四种常见的分包方案，以及 UDP 为什么没有这个问题。",
    contentBlocks: [
      {
        type: "heading",
        level: 1,
        data: "从 TCP 粘包说起：重新理解 Socket 协议"
      },
      {
        type: "paragraph",
        data: "初学网络编程时觉得「粘包」是个 bug，后来才明白：TCP 本来就是字节流协议，它压根不保证你发一次、对方收一次。所谓粘包，是我们按「消息」理解数据时产生的认知错位。"
      },
      {
        type: "heading",
        level: 2,
        data: "一、为什么会粘"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "发送端：Nagle 算法把小包攒起来一起发",
          "接收端：内核缓冲区积累多个包，应用一次 read 全部读出",
          "MTU 限制：大包被拆成多个 IP 分片，接收端重组后顺序可能交错"
        ]
      },
      {
        type: "heading",
        level: 2,
        data: "二、四种分包方案"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "固定长度：每条消息定长，不够补位。简单但浪费带宽",
          "分隔符：用 \\n 或特殊字符分界。适合文本协议，如 Redis RESP",
          "长度前缀：前 4 字节声明 payload 长度。最常用，如 HTTP Content-Length",
          "TLV 格式：Type-Length-Value，扩展性好，协议设计常用"
        ]
      },
      {
        type: "code",
        language: "javascript",
        data: `// 长度前缀示例：4 字节大端长度 + payload
function frame(payload) {
  const body = Buffer.from(payload)
  const header = Buffer.alloc(4)
  header.writeUInt32BE(body.length, 0)
  return Buffer.concat([header, body])
}

function parse(buffer) {
  if (buffer.length < 4) return null
  const len = buffer.readUInt32BE(0)
  if (buffer.length < 4 + len) return null // 还没收全
  return buffer.subarray(4, 4 + len).toString()
}`
      },
      {
        type: "heading",
        level: 2,
        data: "三、UDP 没有粘包吗"
      },
      {
        type: "paragraph",
        data: "UDP 是数据报协议，保留消息边界，一次 sendto 对应一次 recvfrom。但代价是不保证送达、不保证顺序、不保证不重复。要可靠又要有边界，就得自己在应用层实现——QUIC 就是这么干的。"
      },
      {
        type: "quote",
        data: "TCP 给你可靠的有序字节流，但消息边界这件事，永远是你自己的责任。",
        author: "协议笔记"
      }
    ],
    views: 16,
    tags: ["Socket", "TCP", "网络协议"],
    likes: 3,
    dislikes: 0
  }
];

export default extraPosts;
