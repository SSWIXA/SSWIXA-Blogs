#!/bin/bash
set -e

cd "$(dirname "$0")"

echo "=================================="
echo "   SSWIXA Blog - 一键启动"
echo "=================================="

# 1) 后端
echo "[1/2] 启动后端..."
cd MyBolgsBackEnd
if [ ! -d "node_modules" ]; then
    echo "正在安装后端依赖..."
    npm install
fi
node src/server.js &
BACKEND_PID=$!
cd ..

# 2) 前端
echo "[2/2] 启动前端..."
cd MyBolgs
if [ ! -d "node_modules" ]; then
    echo "正在安装前端依赖..."
    npm install
fi
npm run dev &
FRONTEND_PID=$!
cd ..

echo "=================================="
echo "  ✅ 服务已启动"
echo "  前端: http://localhost:5173"
echo "  后端: http://localhost:5000"
echo "  MongoDB: 请确认已运行"
echo "=================================="
echo "按 Ctrl+C 停止所有服务"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait
