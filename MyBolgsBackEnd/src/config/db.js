import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // 简化连接字符串，移除已弃用的选项
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/blog');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;