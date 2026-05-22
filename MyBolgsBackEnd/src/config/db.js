import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // 添加选项以消除弃用警告
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog';
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;