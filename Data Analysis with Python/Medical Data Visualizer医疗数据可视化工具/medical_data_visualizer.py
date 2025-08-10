import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1. 导入数据
df = pd.read_csv('medical_examination.csv')

# 2. 添加overweight列
df['overweight'] = (df['weight'] / ((df['height'] / 100) ** 2) > 25).astype(int)

# 3. 标准化数据 - 使0总是好的，1总是坏的
df['cholesterol'] = (df['cholesterol'] > 1).astype(int)
df['gluc'] = (df['gluc'] > 1).astype(int)

# 4. 绘制分类图
def draw_cat_plot():
    # 5. 为cat plot创建DataFrame，使用pd.melt
    df_cat = pd.melt(df, value_vars=['cholesterol', 'gluc', 'smoke', 'alco', 'active', 'overweight'], 
                     id_vars=['cardio'], var_name='variable', value_name='value')

    # 6. 按cardio分组并重新格式化数据
    df_cat = df_cat.groupby(['cardio', 'variable', 'value']).size().reset_index(name='total')

    # 7. 使用seaborn的catplot创建图表
    catplot = sns.catplot(data=df_cat, x='variable', y='total', hue='value', col='cardio', kind='bar')

    # 8. 获取图形输出并存储在fig变量中
    fig = catplot.fig

    # 9. 不要修改接下来的两行
    fig.savefig('catplot.png')
    return fig


# 10. 绘制热力图
def draw_heat_map():
    # 11. 清理数据，过滤掉不正确的患者数据段
    df_heat = df[
        (df['ap_lo'] <= df['ap_hi']) &
        (df['height'] >= df['height'].quantile(0.025)) &
        (df['height'] <= df['height'].quantile(0.975)) &
        (df['weight'] >= df['weight'].quantile(0.025)) &
        (df['weight'] <= df['weight'].quantile(0.975))
    ]

    # 12. 计算相关性矩阵
    corr = df_heat.corr()

    # 13. 为上三角生成掩码
    mask = np.triu(np.ones_like(corr, dtype=bool))

    # 14. 设置matplotlib图形
    fig, ax = plt.subplots(figsize=(12, 10))

    # 15. 使用seaborn的heatmap绘制相关性矩阵
    sns.heatmap(corr, mask=mask, annot=True, fmt='.1f', square=True, ax=ax)

    # 16. 不要修改接下来的两行
    fig.savefig('heatmap.png')
    return fig
