# 财务计算器 - Financial Calculator

一个功能完整的Python财务计算器，实现了多种财务计算功能。

## 🚀 功能特性

### 1. 养老金计算
- **每月复利计算**: 支持初始本金和每月额外贡献
- **连续复利计算**: 使用自然对数e进行精确计算
- 公式: A = P(1 + r)^n + PMT × ((1 + r)^n - 1) / r

### 2. 抵押付款计算
- 计算固定利率抵押贷款的每月付款
- 显示总付款和总利息
- 支持不同贷款期限和利率

### 3. 退休投资规划
- 估计退休时的投资结余
- 考虑初始投资和每月贡献
- 计算投资增长部分

### 4. 资金翻倍时间
- 使用精确的对数公式计算
- 公式: t = ln(2) / r
- 显示年数和月数

### 5. 对数方程求解
- 求解 log_b(x) = y 形式的方程
- 支持任意正数底数
- 提供验证结果

### 6. 科学计数法转换
- 自动转换为科学计数法格式
- 支持双向转换
- 智能格式化显示

### 7. 投资增长图表
- 可视化投资增长过程
- 支持matplotlib图表显示
- 显示初始本金参考线

## 📦 安装要求

### 系统要求
- Python 3.7+
- 支持matplotlib的图形界面环境

### 依赖包
```bash
pip install matplotlib numpy
```

或者使用requirements.txt:
```bash
pip install -r requirements.txt
```

## 🎯 使用方法

### 方法1: 直接运行主程序
```bash
python financial_calculator.py
```

### 方法2: 使用启动脚本（推荐）
```bash
python start_calculator.py
```

### 方法3: 运行演示程序
```bash
python demo.py
```

## 📱 界面说明

程序提供友好的命令行界面，包含以下菜单选项：

1. **计算养老金 (每月复利)** - 计算定期复利的投资增长
2. **计算养老金 (连续复利)** - 计算连续复利的投资增长
3. **计算每月抵押付款** - 计算房贷月供
4. **估计退休投资结余** - 退休规划计算
5. **计算资金翻倍时间** - 72法则的精确版本
6. **求解对数方程** - 数学计算工具
7. **科学计数法转换** - 数字格式转换
8. **绘制投资增长图表** - 可视化分析
9. **退出** - 结束程序

## 🔧 技术实现

### 核心类
- `FinancialCalculator`: 主计算器类，包含所有计算方法

### 主要方法
- `calculate_annuity_monthly()`: 每月复利计算
- `calculate_annuity_continuous()`: 连续复利计算
- `calculate_mortgage_payment()`: 抵押付款计算
- `estimate_retirement_balance()`: 退休结余估计
- `calculate_doubling_time()`: 翻倍时间计算
- `solve_logarithmic_equation()`: 对数方程求解
- `convert_to_scientific_notation()`: 科学计数法转换
- `plot_investment_growth()`: 投资增长图表

### 数学公式
- **复利公式**: A = P(1 + r)^n
- **连续复利**: A = Pe^(rt)
- **抵押付款**: PMT = P × (r(1+r)^n) / ((1+r)^n - 1)
- **翻倍时间**: t = ln(2) / r
- **对数方程**: x = b^y

## 📊 使用示例

### 养老金计算示例
```python
calc = FinancialCalculator()
result = calc.calculate_annuity_monthly(
    principal=10000,      # 初始本金 $10,000
    monthly_rate=0.0067,  # 月利率 0.67% (年利率 8%)
    months=120,           # 10年 = 120个月
    monthly_contribution=500  # 每月贡献 $500
)
print(f"最终金额: ${result:,.2f}")
```

### 抵押付款计算示例
```python
monthly_payment = calc.calculate_mortgage_payment(
    principal=300000,     # 贷款金额 $300,000
    annual_rate=0.045,    # 年利率 4.5%
    years=30              # 贷款期限 30年
)
print(f"每月付款: ${monthly_payment:,.2f}")
```

## 🎨 图表功能

程序支持生成投资增长图表，显示：
- 投资余额随时间的变化
- 初始本金参考线
- 网格线和图例
- 自动调整坐标轴范围

## ⚠️ 注意事项

1. **利率输入**: 输入百分比数字，程序会自动转换为小数
2. **图表显示**: 需要支持matplotlib的图形界面环境
3. **数值精度**: 使用Python的float类型，注意浮点数精度
4. **输入验证**: 程序包含基本的输入验证和错误处理

## 🔍 故障排除

### 常见问题
1. **ImportError**: 确保已安装matplotlib和numpy
2. **图表不显示**: 检查图形界面环境支持
3. **计算错误**: 验证输入数据的合理性

### 解决方案
1. 运行 `pip install matplotlib numpy` 安装依赖
2. 使用 `python start_calculator.py` 自动检查依赖
3. 检查输入数据的范围和格式

## 📝 开发说明

### 代码结构
```
financial_calculator.py    # 主程序文件
start_calculator.py       # 启动脚本
demo.py                   # 演示程序
requirements.txt          # 依赖包列表
README.md                # 项目说明文档
```

### 扩展功能
可以轻松添加新的财务计算功能：
1. 在`FinancialCalculator`类中添加新方法
2. 在菜单中添加对应选项
3. 实现相应的用户界面方法

## 📄 许可证

本项目基于MIT许可证开源。

## 🤝 贡献

欢迎提交问题报告和功能建议！

---

**享受使用财务计算器！** 🎉
