const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 安全中间件配置
app.use(helmet({
  noSniff: true, // 防止MIME类型嗅探
  xssFilter: true, // 防止XSS攻击
  noCache: true, // 不缓存网站信息
  hidePoweredBy: false // 允许自定义Powered-By头
}));

// 自定义Powered-By头（安全措施）
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'PHP 7.4.3');
  next();
});

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 游戏状态
const gameState = {
  players: new Map(),
  collectibles: new Map(),
  nextPlayerId: 1,
  nextCollectibleId: 1
};

// 生成随机位置
function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * 800),
    y: Math.floor(Math.random() * 600)
  };
}

// 生成新的收集物品
function generateCollectible() {
  const id = gameState.nextCollectibleId++;
  const position = getRandomPosition();
  const value = Math.floor(Math.random() * 10) + 1;
  
  gameState.collectibles.set(id, {
    id,
    value,
    x: position.x,
    y: position.y
  });
  
  return gameState.collectibles.get(id);
}

// 初始化收集物品
for (let i = 0; i < 5; i++) {
  generateCollectible();
}

// 碰撞检测
function checkCollision(player, collectible) {
  const distance = Math.sqrt(
    Math.pow(player.x - collectible.x, 2) + 
    Math.pow(player.y - collectible.y, 2)
  );
  return distance < 30; // 碰撞半径
}

// 计算玩家排名
function calculatePlayerRank(player, allPlayers) {
  const sortedPlayers = allPlayers.sort((a, b) => b.score - a.score);
  const rank = sortedPlayers.findIndex(p => p.id === player.id) + 1;
  return `Rank: ${rank}/${allPlayers.length}`;
}

// Socket.io连接处理
io.on('connection', (socket) => {
  console.log('玩家连接:', socket.id);
  
  // 创建新玩家
  const playerId = gameState.nextPlayerId++;
  const position = getRandomPosition();
  
  const player = {
    id: playerId,
    score: 0,
    x: position.x,
    y: position.y,
    socketId: socket.id
  };
  
  gameState.players.set(playerId, player);
  
  // 发送当前游戏状态给新玩家
  socket.emit('gameState', {
    player: player,
    players: Array.from(gameState.players.values()),
    collectibles: Array.from(gameState.collectibles.values())
  });
  
  // 通知其他玩家有新玩家加入
  socket.broadcast.emit('playerJoined', player);
  
  // 玩家移动
  socket.on('movePlayer', (data) => {
    const { direction, amount } = data;
    const player = gameState.players.get(playerId);
    
    if (player) {
      // 根据方向移动玩家
      switch (direction) {
        case 'up':
          player.y = Math.max(0, player.y - amount);
          break;
        case 'down':
          player.y = Math.min(600, player.y + amount);
          break;
        case 'left':
          player.x = Math.max(0, player.x - amount);
          break;
        case 'right':
          player.x = Math.min(800, player.x + amount);
          break;
      }
      
      // 检查碰撞
      for (const [collectibleId, collectible] of gameState.collectibles) {
        if (checkCollision(player, collectible)) {
          // 收集物品
          player.score += collectible.value;
          gameState.collectibles.delete(collectibleId);
          
          // 生成新的收集物品
          const newCollectible = generateCollectible();
          
          // 通知所有玩家
          io.emit('collectibleCollected', {
            playerId: player.id,
            collectibleId,
            newCollectible,
            playerScore: player.score
          });
          
          break;
        }
      }
      
      // 更新玩家排名
      const allPlayers = Array.from(gameState.players.values());
      const playerRank = calculatePlayerRank(player, allPlayers);
      
      // 通知所有玩家移动
      io.emit('playerMoved', {
        playerId: player.id,
        x: player.x,
        y: player.y,
        score: player.score,
        rank: playerRank
      });
    }
  });
  
  // 玩家断开连接
  socket.on('disconnect', () => {
    console.log('玩家断开连接:', socket.id);
    
    const player = gameState.players.get(playerId);
    if (player) {
      gameState.players.delete(playerId);
      
      // 通知其他玩家
      socket.broadcast.emit('playerLeft', playerId);
    }
  });
});

// 路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`游戏服务器运行在端口 ${PORT}`);
});

module.exports = app;
