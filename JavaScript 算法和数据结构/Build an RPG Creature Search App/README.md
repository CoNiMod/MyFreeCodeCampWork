# RPG Creature Search App

一个基于JavaScript的RPG生物搜索应用，可以通过名称或ID搜索生物信息。

## 📁 项目结构

```
Build an RPG Creature Search App/
├── index.html      # 主HTML文件
├── styles.css      # CSS样式文件
├── script.js       # JavaScript功能文件
└── README.md       # 项目说明文件
```

## 🎯 功能特性

### 搜索功能
- 支持通过生物名称搜索（如："Pyrolynx"）
- 支持通过生物ID搜索（如："2"）
- 实时清除之前的搜索结果
- 支持回车键快速搜索

### 数据显示
- 生物名称（大写显示）
- 生物ID
- 重量和高度
- 战斗属性：HP、攻击、防御、特殊攻击、特殊防御、速度
- 生物类型标签（动态生成）

### 错误处理
- 无效搜索时显示"Creature not found"提示
- 网络错误处理
- 空输入验证

## 🧪 测试用例

### 测试用例 15: Pyrolynx 搜索
- 输入："Pyrolynx"
- 预期结果：
  - 名称：PYROLYNX
  - ID：#1
  - 重量：42
  - 高度：32
  - HP：65
  - 攻击：80
  - 防御：50
  - 特殊攻击：90
  - 特殊防御：55
  - 速度：100
  - 类型：FIRE

### 测试用例 17-18: ID 2 搜索
- 输入："2"
- 预期结果：
  - 名称：AQUOROC
  - ID：#2
  - 重量：220
  - 高度：53
  - HP：85
  - 攻击：90
  - 防御：120
  - 特殊攻击：60
  - 特殊防御：70
  - 速度：40
  - 类型：WATER, ROCK

## 🚀 使用方法

1. 在浏览器中打开 `index.html` 文件
2. 在搜索框中输入生物名称或ID
3. 点击"Search"按钮或按回车键
4. 查看生物的详细信息和统计数据

## 🔧 技术栈

- **HTML5**: 页面结构
- **CSS3**: 样式和布局
- **JavaScript (ES6+)**: 功能逻辑
- **Fetch API**: 数据获取
- **FreeCodeCamp RPG API**: 数据源

## 📡 API 端点

```
https://rpg-creature-api.freecodecamp.rocks/api/creatures/{searchTerm}
```

## 🎨 设计特点

- 响应式布局
- 现代化UI设计
- 清晰的视觉层次
- 友好的用户交互
- 类型标签使用彩色徽章显示

## ✅ 符合要求

- ✅ 所有必需的HTML元素和ID
- ✅ 正确的API调用
- ✅ 错误处理机制
- ✅ 类型标签动态生成
- ✅ 搜索结果清除功能
- ✅ 支持名称和ID搜索
