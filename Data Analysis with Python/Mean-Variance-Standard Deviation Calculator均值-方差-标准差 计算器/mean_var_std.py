import numpy as np

def calculate(list):
    # 验证输入列表必须包含9个数字
    if len(list) != 9:
        raise ValueError("List must contain nine numbers.")
    
    # 将列表转换为3x3的numpy数组
    matrix = np.array(list).reshape(3, 3)
    
    # 计算各种统计量
    calculations = {
        'mean': [
            matrix.mean(axis=0).tolist(),  # 按列计算均值 (axis=0)
            matrix.mean(axis=1).tolist(),  # 按行计算均值 (axis=1)
            matrix.mean()                  # 展平后的均值
        ],
        'variance': [
            matrix.var(axis=0).tolist(),   # 按列计算方差
            matrix.var(axis=1).tolist(),   # 按行计算方差
            matrix.var()                   # 展平后的方差
        ],
        'standard deviation': [
            matrix.std(axis=0).tolist(),   # 按列计算标准差
            matrix.std(axis=1).tolist(),   # 按行计算标准差
            matrix.std()                   # 展平后的标准差
        ],
        'max': [
            matrix.max(axis=0).tolist(),   # 按列计算最大值
            matrix.max(axis=1).tolist(),   # 按行计算最大值
            matrix.max()                   # 展平后的最大值
        ],
        'min': [
            matrix.min(axis=0).tolist(),   # 按列计算最小值
            matrix.min(axis=1).tolist(),   # 按行计算最小值
            matrix.min()                   # 展平后的最小值
        ],
        'sum': [
            matrix.sum(axis=0).tolist(),   # 按列计算总和
            matrix.sum(axis=1).tolist(),   # 按行计算总和
            matrix.sum()                   # 展平后的总和
        ]
    }

    return calculations