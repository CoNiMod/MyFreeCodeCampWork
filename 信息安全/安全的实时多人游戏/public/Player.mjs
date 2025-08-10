export class Player {
  constructor(id, score, x, y) {
    this.id = id;
    this.score = score;
    this.x = x;
    this.y = y;
  }

  /**
   * 移动玩家
   * @param {string} direction - 移动方向 ("up", "down", "left", "right")
   * @param {number} amount - 移动像素数
   */
  movePlayer(direction, amount) {
    switch (direction) {
      case 'up':
        this.y = Math.max(0, this.y - amount);
        break;
      case 'down':
        this.y = Math.min(600, this.y + amount);
        break;
      case 'left':
        this.x = Math.max(0, this.x - amount);
        break;
      case 'right':
        this.x = Math.min(800, this.x + amount);
        break;
      default:
        console.warn('无效的移动方向:', direction);
    }
  }

  /**
   * 检查与收集物品的碰撞
   * @param {Object} collectible - 收集物品对象
   * @returns {boolean} - 是否发生碰撞
   */
  collision(collectible) {
    if (!collectible || typeof collectible.x !== 'number' || typeof collectible.y !== 'number') {
      return false;
    }
    
    const distance = Math.sqrt(
      Math.pow(this.x - collectible.x, 2) + 
      Math.pow(this.y - collectible.y, 2)
    );
    
    // 碰撞半径设为30像素
    return distance < 30;
  }

  /**
   * 计算玩家排名
   * @param {Array} allPlayers - 所有玩家数组
   * @returns {string} - 排名字符串，格式: "Rank: currentRank/totalPlayers"
   */
  calculateRank(allPlayers) {
    if (!Array.isArray(allPlayers) || allPlayers.length === 0) {
      return 'Rank: 1/1';
    }
    
    // 按分数降序排序
    const sortedPlayers = allPlayers.sort((a, b) => b.score - a.score);
    
    // 找到当前玩家的排名
    const rank = sortedPlayers.findIndex(player => player.id === this.id) + 1;
    
    return `Rank: ${rank}/${allPlayers.length}`;
  }
}
