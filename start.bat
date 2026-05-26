@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ==================================
echo    SSWIXA Blog - 一键启动
echo ==================================

REM 1) 启动 MongoDB
echo [1/3] 启动 MongoDB...
set MONGO_PATH=D:\Software\mongodb\data\db
if not exist "%MONGO_PATH%" (
    echo [警告] MongoDB 数据目录不存在: %MONGO_PATH%
    echo 请修改 start.bat 中的 MONGO_PATH 为你真实的 db 路径
    pause
    exit /b 1
)
start "" mongod --dbpath="%MONGO_PATH%"
timeout /t 4 >nul

REM 2) 后端
echo [2/3] 启动后端...
cd /d "%~dp0MyBolgsBackEnd"
if not exist "node_modules" (
    echo 正在安装后端依赖...
    call npm install
)
start "" node src/server.js
timeout /t 4 >nul

REM 3) 前端
echo [3/3] 启动前端...
cd /d "%~dp0MyBolgs"
if not exist "node_modules" (
    echo 正在安装前端依赖...
    call npm install
)
start "" npm run dev

echo ==================================
echo   ✅ 服务已启动
echo   前端: http://localhost:5173
echo   后端: http://localhost:5000
echo ==================================
pause
