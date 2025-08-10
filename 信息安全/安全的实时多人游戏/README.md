# 安全的实时多人游戏

这是一个使用HTML Canvas API和Socket.io开发的2D实时多人游戏，具有完整的安全特性。

## 功能特性

- 🎮 实时多人游戏体验
- 🚀 流畅的玩家移动控制
- ⭐ 可收集的物品系统
- 🏆 实时排名计算
- 🔒 完整的安全防护
- 📱 响应式用户界面

## 技术栈

- **前端**: HTML5 Canvas, ES6 Modules, Socket.io Client
- **后端**: Node.js, Express.js, Socket.io
- **安全**: Helmet.js (v3.21.3)
- **实时通信**: WebSocket via Socket.io

## 游戏玩法

1. 使用WASD键或方向键控制角色移动
2. 收集金色星星获得分数
3. 实时查看自己的排名和其他玩家状态
4. 与其他玩家竞争最高分

## 安全特性

✅ **防止MIME类型嗅探** - 客户端无法猜测/嗅探MIME类型  
✅ **XSS攻击防护** - 防止跨站脚本攻击  
✅ **无缓存策略** - 不在客户端缓存任何网站信息  
✅ **自定义Powered-By头** - 声明网站由"PHP 7.4.3"提供技术支持  

## 安装和运行

### 前提条件

- Node.js (版本14或更高)
- npm 或 yarn

### 快速开始

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd 安全的实时多人游戏
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动服务器**

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

4. **访问游戏**
   - 游戏页面: http://localhost:3000
   - 测试页面: http://localhost:3000/test

## 项目结构

```
安全的实时多人游戏/
├── public/
│   ├── index.html          # 游戏主页面
│   ├── game.js            # 游戏主逻辑
│   ├── Player.mjs         # 玩家类
│   └── Collectible.mjs    # 收集物品类
├── server.js              # 服务器主文件
├── package.json           # 项目配置
├── start-server.bat       # Windows启动脚本
├── start-server.sh        # Linux/Mac启动脚本
├── test.html              # 测试页面
└── README.md              # 项目说明
```

## 核心类说明

### Player类
- `id`: 唯一标识符
- `score`: 玩家分数
- `x, y`: 玩家位置坐标
- `movePlayer(direction, amount)`: 移动玩家
- `collision(collectible)`: 碰撞检测
- `calculateRank(allPlayers)`: 计算排名

### Collectible类
- `id`: 唯一标识符
- `value`: 物品价值
- `x, y`: 物品位置坐标
- `getPosition()`: 获取位置
- `setPosition(x, y)`: 设置位置
- `getValue()`: 获取价值

## API端点

- `GET /` - 游戏主页面
- `GET /test` - 测试页面
- WebSocket - 实时游戏通信

## 测试

访问 `http://localhost:3000/test` 进行功能测试：

- 连接测试
- 游戏功能测试
- 安全特性测试
- 完整测试套件

## 开发模式

```bash
npm run dev
```

## 部署

1. 设置环境变量 `PORT` (可选，默认3000)
2. 运行 `npm start`
3. 确保防火墙允许指定端口

## 安全配置

游戏使用Helmet.js v3.21.3配置以下安全头：

- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Cache-Control: no-cache, no-store, must-revalidate`
- `X-Powered-By: PHP 7.4.3`

## 故障排除

### 常见问题

1. **端口被占用**
   - 修改 `server.js` 中的端口号
   - 或设置环境变量 `PORT`

2. **依赖安装失败**
   - 确保Node.js版本兼容
   - 清除npm缓存: `npm cache clean --force`

3. **游戏无法连接**
   - 检查防火墙设置
   - 确认服务器正在运行

### 日志

服务器运行时会显示连接日志：
```
游戏服务器运行在端口 3000
玩家连接: [socket-id]
玩家断开连接: [socket-id]
```

## 贡献

欢迎提交Issue和Pull Request来改进游戏！

## 许可证

MIT License

## 致谢

- FreeCodeCamp 项目要求
- Socket.io 团队
- Helmet.js 安全库
