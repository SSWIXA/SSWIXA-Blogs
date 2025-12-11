@echo off
REM 启动 MongoDB 数据库
echo Starting MongoDB...
start "" "mongod" --dbpath="D:\Software\mongodb\data\db"

REM 等待 MongoDB 启动完成
timeout /t 5 >nul

REM 启动后端服务
echo Starting backend service...
cd /d "d:\Software\phpEnv\www\192.168.21.115\sswixa-blogs\MyBolgsBackEnd"
start "" "npm" start

REM 等待后端服务启动完成
timeout /t 5 >nul

REM 启动前端网页
echo Starting frontend application...
cd /d "d:\Software\phpEnv\www\192.168.21.115\sswixa-blogs\MyBolgs"
start "" "npm" run dev

echo All services started successfully!