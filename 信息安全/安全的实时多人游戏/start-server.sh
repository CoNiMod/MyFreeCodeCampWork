#!/bin/bash

echo "启动安全的实时多人游戏服务器..."
echo

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "错误: 未找到Node.js，请先安装Node.js"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "错误: 依赖安装失败"
        exit 1
    fi
fi

echo "启动服务器..."
echo "游戏将在 http://localhost:3000 运行"
echo "测试页面: http://localhost:3000/test"
echo
echo "按 Ctrl+C 停止服务器"
echo

npm start
