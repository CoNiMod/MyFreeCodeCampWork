# 匿名留言板

这是一个全栈JavaScript应用程序，功能类似于FreeCodeCamp的匿名留言板项目。

## 功能特性

- 创建和管理匿名主题
- 回复主题
- 删除主题和回复（需要密码验证）
- 报告不当内容
- 支持多个板块
- 安全的密码验证系统

## 技术栈

- **后端**: Node.js, Express.js
- **数据库**: MongoDB with Mongoose
- **前端**: HTML, CSS, JavaScript
- **测试**: Mocha, Chai
- **安全**: Helmet.js

## 安装和运行

### 前提条件

- Node.js (版本 14 或更高)
- MongoDB (本地或远程)

### 安装依赖

```bash
npm install
```

### 环境配置

1. 复制 `sample.env` 到 `.env`
2. 修改数据库连接字符串：

```env
NODE_ENV=development
DB=mongodb://localhost:27017/anonymous-message-board
PORT=3000
```

### 启动服务器

**Windows:**
```bash
start-server.bat
```

**Linux/Mac:**
```bash
chmod +x start-server.sh
./start-server.sh
```

**手动启动:**
```bash
npm start
```

### 开发模式

```bash
npm run dev
```

## API 端点

### 主题操作

- `POST /api/threads/{board}` - 创建新主题
- `GET /api/threads/{board}` - 获取主题列表（最近10个，每个最多3个回复）
- `DELETE /api/threads/{board}` - 删除主题
- `PUT /api/threads/{board}` - 报告主题

### 回复操作

- `POST /api/replies/{board}` - 创建新回复
- `GET /api/replies/{board}?thread_id={id}` - 获取完整主题及其回复
- `DELETE /api/replies/{board}` - 删除回复
- `PUT /api/replies/{board}` - 报告回复

## 测试

### 运行功能测试

```bash
npm test
```

### 浏览器测试

访问 `http://localhost:3000/test.html` 进行交互式测试。

## 安全特性

- 内容安全策略 (CSP)
- 防止DNS预取
- 引用者策略控制
- 仅允许同源iframe嵌入
- 密码验证系统

## 数据库模型

### Thread (主题)
- `_id`: 唯一标识符
- `board`: 板块名称
- `text`: 主题内容
- `delete_password`: 删除密码
- `created_on`: 创建时间
- `bumped_on`: 最后回复时间
- `reported`: 是否被报告
- `replies`: 回复数组

### Reply (回复)
- `_id`: 唯一标识符
- `text`: 回复内容
- `delete_password`: 删除密码
- `created_on`: 创建时间
- `reported`: 是否被报告

## 项目结构

```
匿名留言板/
├── models/
│   └── thread.js          # 数据模型
├── routes/
│   └── api.js             # API路由
├── tests/
│   └── 2_functional-tests.js  # 功能测试
├── views/
│   └── index.html         # 前端页面
├── server.js              # 主服务器文件
├── package.json           # 项目配置
├── sample.env             # 环境变量示例
├── test.html              # 测试页面
├── test-runner.js         # 测试运行器
├── start-server.bat       # Windows启动脚本
├── start-server.sh        # Linux/Mac启动脚本
└── README.md              # 项目说明
```

## 使用说明

1. 启动MongoDB服务
2. 配置环境变量
3. 安装依赖：`npm install`
4. 启动服务器：`npm start`
5. 访问 `http://localhost:3000` 使用应用
6. 访问 `http://localhost:3000/test.html` 进行测试

## 测试要求

该项目包含以下功能测试：

1. ✅ 创建新主题
2. ✅ 查看最近的10个主题（每个最多3个回复）
3. ✅ 使用错误密码删除主题
4. ✅ 使用正确密码删除主题
5. ✅ 报告主题
6. ✅ 创建新回复
7. ✅ 查看完整主题及其回复
8. ✅ 使用错误密码删除回复
9. ✅ 使用正确密码删除回复
10. ✅ 报告回复

## 许可证

MIT License
