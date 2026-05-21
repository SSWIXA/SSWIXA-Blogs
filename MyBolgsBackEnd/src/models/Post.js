import mongoose from 'mongoose';

// 定义内容块的子模式
const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['paragraph', 'heading', 'code', 'image', 'quote', 'list', 'divider']
  },
  data: {
    type: String,
    default: ''
  },
  // 针对不同类型内容块的额外属性
  level: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6]
  },
  language: String,
  url: String,
  alt: String,
  title: String,
  caption: String,
  author: String,
  style: {
    type: String,
    enum: ['ordered', 'unordered']
  },
  items: [{
    type: String
  }]
}, { _id: false });

const postSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    default: ''
  },
  contentBlocks: {
    type: [contentBlockSchema],
    default: []
  },
  views: {
    type: Number,
    default: 0
  },
  tags: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  category: {
    type: String,
    default: 'Uncategorized'
  }
}, {
  timestamps: true // 自动添加 createdAt 和 updatedAt 字段
});

const Post = mongoose.model('Post', postSchema);

export default Post;