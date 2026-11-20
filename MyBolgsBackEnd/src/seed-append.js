// 增量追加文章到现有数据库（安全，不清空任何数据）
// 用法：node src/seed-append.js
// 幂等：按 id 和 title 双重去重，重复运行不会产生重复文章。
import 'dotenv/config';
import mongoose from 'mongoose';
import Post from './models/Post.js';
import extraPosts from './seed-extra.js';
import extraPosts2 from './seed-extra-2.js';

// 两批增量文章合并，统一按 id / title 去重
const allExtraPosts = [...extraPosts, ...extraPosts2];

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('缺少 MONGODB_URI 环境变量，已中止');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
    console.log(`已连接数据库: ${mongoose.connection.name}`);

    // 只读查询现有文章，用于去重
    const existing = await Post.find({}, { id: 1, title: 1 }).lean();
    const existingIds = new Set(existing.map((p) => p.id));
    const existingTitles = new Set(existing.map((p) => p.title));

    const toInsert = allExtraPosts.filter(
      (p) => !existingIds.has(p.id) && !existingTitles.has(p.title)
    );

    if (toInsert.length === 0) {
      console.log('没有需要追加的文章，数据库已是最新');
      return;
    }

    const result = await Post.insertMany(toInsert);
    console.log(`成功追加 ${result.length} 篇文章：`);
    result.forEach((p) => console.log(`  #${p.id} ${p.title}`));

    const total = await Post.countDocuments({});
    console.log(`当前文章总数: ${total}`);
  } catch (error) {
    console.error('追加失败:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
