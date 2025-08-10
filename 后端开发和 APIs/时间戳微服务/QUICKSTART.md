# 时间戳微服务 - 快速启动指南

## 🚀 5分钟快速启动

### 1. 安装 Node.js
确保你的系统已安装 Node.js (版本 14 或更高)
```bash
node --version
npm --version
```

如果没有安装，请访问 [Node.js 官网](https://nodejs.org/) 下载安装。

### 2. 下载项目
- 下载或克隆项目文件到本地
- 进入项目目录

### 3. 安装依赖
```bash
npm install
```

### 4. 启动服务器
```bash
npm start
```

### 5. 访问应用
打开浏览器访问：`http://localhost:3000`

## 🧪 测试 API 功能

### 测试页面
访问 `http://localhost:3000/test.html` 查看完整的 API 测试页面

### 手动测试
使用浏览器或 Postman 测试以下端点：

#### 获取当前时间
```
GET http://localhost:3000/api/
```

#### 转换日期
```
GET http://localhost:3000/api/2023-12-25
```

#### 转换时间戳
```
GET http://localhost:3000/api/1451001600000
```

#### 测试无效日期
```
GET http://localhost:3000/api/invalid-date
```

## 📱 使用启动脚本

### Windows 用户
双击运行 `start-server.bat`

### Linux/Mac 用户
```bash
chmod +x start-server.sh
./start-server.sh
```

## 🔧 开发模式

启动开发服务器（自动重启）：
```bash
npm run dev
```

## 📁 项目结构
```
时间戳微服务/
├── server.js              # 主服务器文件
├── package.json           # 项目配置
├── public/                # 前端文件
│   ├── index.html         # 主页面
│   ├── style.css          # 样式
│   └── script.js          # 脚本
├── test.html              # API 测试页面
├── README.md              # 详细说明
├── DEPLOYMENT.md          # 部署指南
└── QUICKSTART.md          # 本文件
```

## ❓ 常见问题

### Q: 端口 3000 被占用怎么办？
A: 修改 `server.js` 中的端口号，或使用以下命令查找并关闭占用进程：
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F

# Linux/Mac
lsof -i :3000
kill -9 <进程ID>
```

### Q: 依赖安装失败怎么办？
A: 尝试以下解决方案：
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

### Q: 如何修改端口号？
A: 编辑 `server.js` 文件，修改第 8 行：
```javascript
const PORT = process.env.PORT || 3000; // 改为你想要的端口
```

### Q: 如何部署到生产环境？
A: 查看 `DEPLOYMENT.md` 文件获取详细部署指南。

## 🎯 下一步

1. **测试所有功能** - 使用测试页面验证 API
2. **自定义样式** - 修改 `public/style.css`
3. **添加新功能** - 扩展 `server.js`
4. **部署上线** - 参考 `DEPLOYMENT.md`

## 📞 获取帮助

- 查看 `README.md` 获取详细说明
- 检查控制台错误信息
- 确保所有依赖已正确安装
- 验证端口未被其他服务占用

---

**祝您使用愉快！** 🎉
