import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
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
  }
}, {
  timestamps: true // 自动添加 createdAt 和 updatedAt 字段
});

const Post = mongoose.model('Post', postSchema);

export default Post;