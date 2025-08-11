# 图书推荐引擎 (Book Recommendation Engine)

## 项目概述

这是一个基于K-最近邻(K-Nearest Neighbors)算法的图书推荐系统。该系统使用Book-Crossings数据集，该数据集包含90,000名用户对270,000本书的110万条评分数据。

## 功能特性

- 基于协同过滤的图书推荐
- 使用余弦相似度计算图书间的相似性
- 自动过滤低质量数据（评分少于200的用户和评分少于100的图书）
- 返回5本最相似的图书及其相似度分数

## 技术实现

### 数据预处理
1. **用户过滤**: 只保留评分数量≥200的用户
2. **图书过滤**: 只保留评分数量≥100的图书
3. **数据清洗**: 移除无效和缺失的评分数据

### 算法核心
- **K-Nearest Neighbors**: 使用sklearn的NearestNeighbors实现
- **相似度度量**: 余弦相似度，适合稀疏评分数据
- **推荐策略**: 基于图书评分向量的相似性

### 数据结构
- **稀疏矩阵**: 使用scipy的csr_matrix高效存储用户-图书评分矩阵
- **索引映射**: 建立用户ID和图书ISBN到矩阵索引的双向映射

## 使用方法

```python
# 获取图书推荐
recommendations = get_recommends("Where the Heart Is (Oprah's Book Club (Paperback))")

# 返回格式
[
    '图书标题',
    [
        ['推荐图书1', 相似度分数],
        ['推荐图书2', 相似度分数],
        ['推荐图书3', 相似度分数],
        ['推荐图书4', 相似度分数],
        ['推荐图书5', 相似度分数]
    ]
]
```

## 依赖库

- numpy: 数值计算
- pandas: 数据处理
- scipy: 稀疏矩阵操作
- scikit-learn: 机器学习算法
- matplotlib: 数据可视化

## 项目结构

```
Book Recommendation Engine using KNN/
├── fcc_book_recommendation_knn.ipynb    # Jupyter notebook版本
├── fcc_book_recommendation_knn.py       # Python脚本版本
├── README.md                            # 项目说明文档
└── requirements.txt                     # 依赖库列表
```

## 运行说明

1. 确保安装了所有必要的依赖库
2. 下载Book-Crossings数据集（代码中已包含下载命令）
3. 运行Jupyter notebook或Python脚本
4. 测试推荐功能是否正常工作

## 算法优势

- **可扩展性**: 稀疏矩阵存储节省内存空间
- **准确性**: 基于大量用户评分数据，推荐结果更可靠
- **效率**: KNN算法计算速度快，适合实时推荐
- **鲁棒性**: 自动过滤低质量数据，提高推荐质量

## 测试验证

项目包含完整的测试套件，验证推荐算法的准确性：
- 测试推荐图书的准确性
- 验证相似度分数的合理性
- 确保推荐列表格式正确

通过所有测试后，将显示"🎉🎉🎉🎉🎉 You passed the challenge!"的成功消息。
