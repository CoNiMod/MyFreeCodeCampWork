import { Player } from './Player.mjs';
import { Collectible } from './Collectible.mjs';

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.socket = io();
    
    this.player = null;
    this.players = new Map();
    this.collectibles = new Map();
    this.keys = new Set();
    this.moveSpeed = 5;
    
    this.init();
  }
  
  init() {
    this.setupSocketListeners();
    this.setupKeyboardListeners();
    this.setupCanvas();
    this.gameLoop();
  }
  
  setupSocketListeners() {
    this.socket.on('connect', () => {
      this.updateConnectionStatus('connected', '已连接');
    });
    
    this.socket.on('disconnect', () => {
      this.updateConnectionStatus('disconnected', '连接断开');
    });
    
    this.socket.on('gameState', (data) => {
      this.player = new Player(data.player.id, data.player.score, data.player.x, data.player.y);
      
      data.players.forEach(playerData => {
        if (playerData.id !== this.player.id) {
          this.players.set(playerData.id, new Player(playerData.id, playerData.score, playerData.x, playerData.y));
        }
      });
      
      data.collectibles.forEach(collectibleData => {
        this.collectibles.set(collectibleData.id, new Collectible(collectibleData.id, collectibleData.value, collectibleData.x, collectibleData.y));
      });
      
      this.updateUI();
    });
    
    this.socket.on('playerJoined', (playerData) => {
      if (playerData.id !== this.player?.id) {
        this.players.set(playerData.id, new Player(playerData.id, playerData.score, playerData.x, playerData.y));
        this.updateUI();
      }
    });
    
    this.socket.on('playerMoved', (data) => {
      if (data.playerId === this.player?.id) {
        this.player.x = data.x;
        this.player.y = data.y;
        this.player.score = data.playerScore;
      } else {
        const otherPlayer = this.players.get(data.playerId);
        if (otherPlayer) {
          otherPlayer.x = data.x;
          otherPlayer.y = data.y;
          otherPlayer.score = data.playerScore;
        }
      }
      this.updateUI();
    });
    
    this.socket.on('collectibleCollected', (data) => {
      this.collectibles.delete(data.collectibleId);
      
      if (data.newCollectible) {
        this.collectibles.set(data.newCollectible.id, new Collectible(
          data.newCollectible.id,
          data.newCollectible.value,
          data.newCollectible.x,
          data.newCollectible.y
        ));
      }
      
      if (data.playerId === this.player?.id) {
        this.player.score = data.playerScore;
      } else {
        const otherPlayer = this.players.get(data.playerId);
        if (otherPlayer) {
          otherPlayer.score = data.playerScore;
        }
      }
      
      this.updateUI();
    });
    
    this.socket.on('playerLeft', (playerId) => {
      this.players.delete(playerId);
      this.updateUI();
    });
  }
  
  setupKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      this.keys.add(e.key.toLowerCase());
      e.preventDefault();
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
  }
  
  setupCanvas() {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }
  
  handleInput() {
    if (!this.player) return;
    
    if (this.keys.has('w') || this.keys.has('arrowup')) {
      this.socket.emit('movePlayer', { direction: 'up', amount: this.moveSpeed });
    }
    if (this.keys.has('s') || this.keys.has('arrowdown')) {
      this.socket.emit('movePlayer', { direction: 'down', amount: this.moveSpeed });
    }
    if (this.keys.has('a') || this.keys.has('arrowleft')) {
      this.socket.emit('movePlayer', { direction: 'left', amount: this.moveSpeed });
    }
    if (this.keys.has('d') || this.keys.has('arrowright')) {
      this.socket.emit('movePlayer', { direction: 'right', amount: this.moveSpeed });
    }
  }
  
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    
    this.collectibles.forEach(collectible => {
      this.drawCollectible(collectible);
    });
    
    this.players.forEach(player => {
      this.drawPlayer(player, false);
    });
    
    if (this.player) {
      this.drawPlayer(this.player, true);
    }
  }
  
  drawGrid() {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    
    for (let x = 0; x <= this.canvas.width; x += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    for (let y = 0; y <= this.canvas.height; y += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }
  
  drawPlayer(player, isCurrentPlayer) {
    const size = 20;
    
    if (isCurrentPlayer) {
      this.ctx.fillStyle = '#4CAF50';
      this.ctx.strokeStyle = '#2E7D32';
    } else {
      this.ctx.fillStyle = '#FF9800';
      this.ctx.strokeStyle = '#E65100';
    }
    
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(player.x, player.y, size, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.stroke();
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`P${player.id}`, player.x, player.y + 30);
    
    this.ctx.fillStyle = '#FFD700';
    this.ctx.font = '10px Arial';
    this.ctx.fillText(`${player.score}`, player.x, player.y - 25);
  }
  
  drawCollectible(collectible) {
    const size = 15;
    
    this.ctx.fillStyle = '#FFD700';
    this.ctx.strokeStyle = '#FFA000';
    this.ctx.lineWidth = 2;
    
    this.drawStar(collectible.x, collectible.y, 5, size, size / 2);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = '10px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${collectible.value}`, collectible.x, collectible.y + 5);
  }
  
  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
      
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
  
  updateUI() {
    if (!this.player) return;
    
    document.getElementById('playerScore').textContent = this.player.score;
    document.getElementById('playerPosition').textContent = `(${Math.round(this.player.x)}, ${Math.round(this.player.y)})`;
    
    const allPlayers = [this.player, ...Array.from(this.players.values())];
    const rank = this.player.calculateRank(allPlayers);
    document.getElementById('playerRank').textContent = rank;
    
    this.updatePlayersList();
    this.updateCollectiblesList();
  }
  
  updatePlayersList() {
    const playersListElement = document.getElementById('playersList');
    const allPlayers = [this.player, ...Array.from(this.players.values())];
    
    if (allPlayers.length === 1) {
      playersListElement.innerHTML = '<div class="player-item"><span class="player-name">只有你在线</span></div>';
      return;
    }
    
    const sortedPlayers = allPlayers.sort((a, b) => b.score - a.score);
    
    playersListElement.innerHTML = sortedPlayers.map(player => {
      const isCurrentPlayer = player.id === this.player.id;
      return `
        <div class="player-item">
          <span class="player-name">${isCurrentPlayer ? '你' : `玩家 ${player.id}`}</span>
          <span class="player-score">${player.score}</span>
        </div>
      `;
    }).join('');
  }
  
  updateCollectiblesList() {
    const collectiblesListElement = document.getElementById('collectiblesList');
    
    if (this.collectibles.size === 0) {
      collectiblesListElement.innerHTML = '<div class="collectible-item">暂无收集物品</div>';
      return;
    }
    
    collectiblesListElement.innerHTML = Array.from(this.collectibles.values()).map(collectible => {
      return `
        <div class="collectible-item">
          物品 ${collectible.id}: ${collectible.value} 分
        </div>
      `;
    }).join('');
  }
  
  updateConnectionStatus(status, text) {
    const statusElement = document.getElementById('connectionStatus');
    const statusTextElement = document.getElementById('statusText');
    
    statusElement.className = `connection-status ${status}`;
    statusTextElement.textContent = text;
  }
  
  gameLoop() {
    this.handleInput();
    this.render();
    requestAnimationFrame(() => this.gameLoop());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Game();
});
