# 时间戳微服务 - 部署指南

## 本地开发

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 访问应用
打开浏览器访问 `http://localhost:3000`

## 生产环境部署

### 方法 1: 传统服务器部署

#### 1. 准备服务器
- 确保服务器已安装 Node.js (版本 14 或更高)
- 配置防火墙开放相应端口

#### 2. 上传代码
```bash
# 使用 git 克隆
git clone <your-repository-url>
cd timestamp-microservice

# 或直接上传文件
```

#### 3. 安装依赖并启动
```bash
npm install --production
npm start
```

#### 4. 使用 PM2 管理进程（推荐）
```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start server.js --name "timestamp-microservice"

# 设置开机自启
pm2 startup
pm2 save
```

### 方法 2: Heroku 部署

#### 1. 创建 Heroku 应用
```bash
# 安装 Heroku CLI
# 登录
heroku login

# 创建应用
heroku create your-app-name

# 添加环境变量（如果需要）
heroku config:set NODE_ENV=production
```

#### 2. 部署代码
```bash
# 推送到 Heroku
git push heroku main

# 或使用 Heroku 部署按钮
```

### 方法 3: Vercel 部署

#### 1. 创建 vercel.json 配置文件
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

#### 2. 部署到 Vercel
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方法 4: Railway 部署

#### 1. 连接 GitHub 仓库
- 访问 [Railway](https://railway.app/)
- 连接你的 GitHub 账户
- 选择时间戳微服务仓库

#### 2. 自动部署
- Railway 会自动检测 Node.js 项目
- 自动安装依赖并启动服务

### 方法 5: Render 部署

#### 1. 创建 Render 服务
- 访问 [Render](https://render.com/)
- 创建新的 Web Service
- 连接 GitHub 仓库

#### 2. 配置环境
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node

## 环境变量配置

### 生产环境变量
```bash
# 端口配置
PORT=3000

# 环境
NODE_ENV=production

# CORS 配置（如果需要）
CORS_ORIGIN=https://yourdomain.com
```

### 创建 .env 文件
```bash
# 复制示例文件
cp .env.example .env

# 编辑环境变量
nano .env
```

## 域名和 SSL 配置

### 1. 域名配置
- 在 DNS 提供商处添加 A 记录指向服务器 IP
- 或配置 CNAME 记录指向部署平台域名

### 2. SSL 证书
- 使用 Let's Encrypt 免费证书
- 或配置部署平台的自动 SSL

## 监控和维护

### 1. 日志管理
```bash
# 查看应用日志
pm2 logs timestamp-microservice

# 查看错误日志
pm2 logs timestamp-microservice --err
```

### 2. 性能监控
```bash
# 查看应用状态
pm2 status

# 监控资源使用
pm2 monit
```

### 3. 自动重启
```bash
# 配置自动重启策略
pm2 start server.js --name "timestamp-microservice" --max-memory-restart 100M
```

## 故障排除

### 常见问题

#### 1. 端口被占用
```bash
# 查看端口使用情况
netstat -tulpn | grep :3000

# 杀死占用端口的进程
kill -9 <PID>
```

#### 2. 权限问题
```bash
# 确保有足够权限
sudo chown -R $USER:$USER /path/to/app
chmod +x start-server.sh
```

#### 3. 依赖安装失败
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

## 安全建议

### 1. 生产环境安全
- 使用环境变量存储敏感信息
- 配置防火墙规则
- 定期更新依赖包
- 启用 HTTPS

### 2. 访问控制
- 限制 API 访问频率
- 配置 CORS 策略
- 添加请求日志记录

## 备份和恢复

### 1. 代码备份
```bash
# 创建代码备份
tar -czf timestamp-microservice-backup-$(date +%Y%m%d).tar.gz ./
```

### 2. 数据库备份（如果有）
```bash
# 备份配置文件
cp .env .env.backup
```

## 联系支持

如果在部署过程中遇到问题，请：
1. 检查日志文件
2. 查看部署平台的状态页面
3. 参考官方文档
4. 在项目 Issues 中提问
