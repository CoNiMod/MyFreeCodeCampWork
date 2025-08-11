# 猫狗图像分类器

这是一个使用TensorFlow 2.0和Keras构建的卷积神经网络项目，用于对猫和狗的图像进行分类。

## 项目要求

- 达到至少63%的准确率（70%以上可获得加分）
- 使用TensorFlow 2.0和Keras
- 创建卷积神经网络模型

## 数据集结构

```
cats_and_dogs/
├── train/
│   ├── cats/ [cat.0.jpg, cat.1.jpg, ...]
│   └── dogs/ [dog.0.jpg, dog.1.jpg, ...]
├── validation/
│   ├── cats/ [cat.2000.jpg, cat.2001.jpg, ...]
│   └── dogs/ [dog.2000.jpg, dog.2001.jpg, ...]
└── test/ [1.jpg, 2.jpg, ...]
```

## 模型架构

- 3个卷积层（16, 32, 64个过滤器）
- 最大池化层
- Dropout层（防止过拟合）
- 全连接层（512个神经元）
- 输出层（sigmoid激活函数）

## 数据增强

训练数据使用以下增强技术：
- 随机旋转（±40度）
- 宽度和高度偏移（±20%）
- 剪切变换（±20%）
- 缩放变换（±20%）
- 水平翻转
- 最近邻填充

## 使用方法

1. 确保安装了所有依赖：
   ```bash
   pip install -r requirements.txt
   ```

2. 下载数据集（在Google Colab中会自动下载）

3. 运行完整的训练和测试流程：
   ```python
   python fcc_cat_dog.py
   ```

## 预期输出

- 训练和验证准确率/损失图表
- 50张测试图像的预测结果
- 最终准确率评估

## 注意事项

- 测试数据生成器设置了`shuffle=False`以确保预测顺序一致
- 模型使用Adam优化器和二元交叉熵损失函数
- 训练15个epoch，批次大小为128
