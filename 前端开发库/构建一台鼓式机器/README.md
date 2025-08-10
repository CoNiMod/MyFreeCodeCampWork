# 鼓式机器 (Drum Machine)

这是一个使用React构建的鼓式机器应用程序，是FreeCodeCamp前端开发库课程的项目之一。

## 功能特性

- 🎵 9个可点击的鼓垫，对应键盘按键：Q、W、E、A、S、D、Z、X、C
- 🎹 支持键盘和鼠标点击触发音频
- 📺 实时显示当前播放的音频名称
- 🎨 现代化的UI设计，包含渐变背景和动画效果
- 📱 响应式设计，支持移动设备

## 用户需求实现

✅ **用户需求 #1**: 创建包含所有元素的外部容器，id="drum-machine"
✅ **用户需求 #2**: 在#drum-machine内显示id="display"的元素
✅ **用户故事 #3**: 9个可点击的鼓垫元素，按Q、W、E、A、S、D、Z、X、C顺序排列
✅ **需求 #4**: 每个鼓垫包含HTML5 audio元素，具有正确的src、class和id属性
✅ **用户故事 #5**: 点击鼓垫触发音频播放
✅ **用户故事 #6**: 键盘按键触发对应鼓垫音频
✅ **用户故事 #7**: 触发鼓垫时在#display显示音频描述

## 音频样本

- Heater-1 (Q键)
- Heater-2 (W键)
- Heater-3 (E键)
- Heater-4 (A键)
- Clap (S键)
- Open-HH (D键)
- Kick-n'-Hat (Z键)
- Kick (X键)
- Closed-HH (C键)

## 技术栈

- React 17
- CSS3 (Grid布局、Flexbox、动画)
- HTML5 Audio API

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm start
```

3. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 使用方法

- 点击鼓垫按钮播放音频
- 使用键盘按键Q、W、E、A、S、D、Z、X、C触发对应鼓垫
- 当前播放的音频名称会显示在顶部的display区域

## 项目结构

```
src/
├── App.js          # 主要组件
├── App.css         # 组件样式
├── index.js        # 应用入口
└── index.css       # 全局样式
```

## 测试

项目包含FreeCodeCamp的测试套件，确保所有用户需求都得到满足。
