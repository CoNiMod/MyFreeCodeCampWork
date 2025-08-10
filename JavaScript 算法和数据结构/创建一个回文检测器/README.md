# 回文检测器 (Palindrome Checker)

一个功能完整的回文检测器应用，可以检测各种文本是否为回文。

## 功能特性

- 🔍 **智能检测**：自动忽略标点符号、空格和大小写
- 🎨 **美观界面**：现代化的渐变设计和响应式布局
- ⚡ **快速响应**：实时检测和结果展示
- 📱 **移动友好**：完全响应式设计，支持各种设备
- 🎯 **测试示例**：内置多个测试用例，方便验证功能

## 技术实现

### 核心算法
```javascript
function isPalindrome(str) {
    // 去除所有非字母数字字符，并转换为小写
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // 检查是否为回文
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}
```

### 支持的测试用例
- ✅ `eye` → is a palindrome
- ✅ `race car` → is a palindrome  
- ✅ `A man, a plan, a canal. Panama` → is a palindrome
- ✅ `never odd or even` → is a palindrome
- ✅ `0_0 (: /-\ :) 0-0` → is a palindrome
- ❌ `nope` → is not a palindrome
- ❌ `almostomla` → is not a palindrome

## 使用方法

1. 在输入框中输入要检测的文本
2. 点击"检测回文"按钮或按回车键
3. 查看结果区域显示检测结果
4. 使用示例按钮快速测试各种情况

## 项目结构

```
创建一个回文检测器/
├── index.html          # 主页面结构
├── styles.css          # 样式文件
├── script.js           # JavaScript逻辑
└── README.md           # 项目说明
```

## 测试要求

本项目完全满足FreeCodeCamp的所有测试要求：

- ✅ 包含id为"text-input"的input元素
- ✅ 包含id为"check-btn"的button元素  
- ✅ 包含id为"result"的结果显示元素
- ✅ 空输入时显示"Please input a value"
- ✅ 正确识别各种回文和非回文文本
- ✅ 支持包含标点符号和空格的复杂文本

## 特色功能

- **视觉反馈**：不同结果状态有不同的颜色和样式
- **动画效果**：平滑的过渡动画和交互反馈
- **键盘支持**：支持回车键快速检测
- **示例测试**：内置多个经典测试用例
- **响应式设计**：完美适配各种屏幕尺寸

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

本项目遵循FreeCodeCamp的学习项目规范，仅供学习和参考使用。
