# 多功能计算器 - Multi-Function Calculator

这是FreeCodeCamp数学基础项目的多功能计算器，使用Python编写。

## 功能特性

### 1. 比例计算器
- 解决比例问题 a/b = c/d
- 自动计算未知变量
- 支持小数和整数输入

### 2. 方程求解器
- 解一元方程求x
- 支持各种数学表达式
- 使用SymPy库进行符号计算

### 3. 平方根分解器
- 分解平方根为最简形式
- 例如：√12 = 2√3
- 自动找到最大平方因子

### 4. 小数转换器
- 小数转分数
- 小数转百分比
- 自动简化分数

### 5. 分数转换器
- 分数转小数
- 分数转百分比
- 支持任意分数

### 6. 百分比转换器
- 百分比转小数
- 百分比转分数
- 自动约分

### 7. 几何面积计算器
- 矩形面积计算
- 圆形面积计算
- 三角形面积计算

## 安装要求

```bash
pip install -r requirements.txt
```

## 使用方法

1. 运行程序：
```bash
python multi_function_calculator.py
```

2. 从菜单中选择所需功能（1-7）

3. 按照提示输入数据

4. 查看计算结果

## 示例

### 比例计算
```
输入 a: 2
输入 b: 3
输入 c: 4
比例 2.0/3.0 = 4.0/6.0
d = 6.0
```

### 方程求解
```
输入方程: x + 5 = 10
方程的解: x = 5
```

### 平方根分解
```
输入要分解的数字: 12
√12 = 2√3
```

### 小数转换
```
输入小数: 0.25
小数: 0.25
分数: 1/4
百分比: 25.0%
```

## 技术特点

- 使用Python标准库和SymPy
- 完整的错误处理
- 用户友好的界面
- 支持中文显示
- 模块化设计

## 项目结构

```
Build a Graphing Calculator/
├── multi_function_calculator.py  # 主程序
├── requirements.txt              # 依赖包
├── README.md                     # 说明文档
├── Foundational_Math_1_(Learn).ipynb  # 原始学习文件
└── foundational_math_1_(learn).py     # 转换后的Python文件
```

## 开发者

这个项目是FreeCodeCamp数学基础认证项目的一部分，展示了Python在数学计算中的应用。

## 许可证

遵循FreeCodeCamp的开源许可证。
