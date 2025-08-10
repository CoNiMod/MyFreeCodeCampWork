export class Collectible {
  constructor(id, value, x, y) {
    this.id = id;
    this.value = value;
    this.x = x;
    this.y = y;
  }

  /**
   * 获取收集物品的位置
   * @returns {Object} - 包含x和y坐标的对象
   */
  getPosition() {
    return {
      x: this.x,
      y: this.y
    };
  }

  /**
   * 设置收集物品的位置
   * @param {number} x - X坐标
   * @param {number} y - Y坐标
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * 获取收集物品的价值
   * @returns {number} - 收集物品的价值
   */
  getValue() {
    return this.value;
  }

  /**
   * 设置收集物品的价值
   * @param {number} value - 新的价值
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * 检查是否在指定位置
   * @param {number} x - X坐标
   * @param {number} y - Y坐标
   * @returns {boolean} - 是否在指定位置
   */
  isAtPosition(x, y) {
    return this.x === x && this.y === y;
  }
}
