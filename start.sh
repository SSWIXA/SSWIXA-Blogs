#!/bin/bash

# 启动 MongoDB 数据库
echo "Starting MongoDB..."
mongod --dbpath="D:\Software\mongodb\data\db" &
MONGO_PID=$!

# 等待 MongoDB 启动完成
sleep 5

# 启动后端服务
echo "Starting backend service..."
cd "d:/Software/phpEnv/www/192.168.21.115/sswixa-blogs/MyBolgsBackEnd" || { echo "Failed to enter MyBolgsBackEnd directory"; exit 1; }
npm start &
BACKEND_PID=$!

# 等待后端服务启动完成
sleep 5

# 启动前端网页
echo "Starting frontend application..."
cd "d:/Software/phpEnv/www/192.168.21.115/sswixa-blogs/MyBolgs" || { echo "Failed to enter MyBolgs directory"; exit 1; }
npm run dev &
FRONTEND_PID=$!

echo "All services started successfully!"
echo "MongoDB PID: $MONGO_PID"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"