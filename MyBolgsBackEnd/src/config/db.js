import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // 添加选项以消除弃用警告
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/blog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;