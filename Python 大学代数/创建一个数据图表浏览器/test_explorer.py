#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""测试数据图表浏览器功能"""

from data_chart_explorer import DataChartExplorer
import pandas as pd
import numpy as np

def test_basic_functionality():
    """测试基本功能"""
    print(" 测试数据图表浏览器基本功能...")
    
    # 创建测试数据
    test_data = {
        "x": [1, 2, 3, 4, 5],
        "y": [2, 4, 6, 8, 10]
    }
    df = pd.DataFrame(test_data)
    
    # 保存测试CSV文件
    df.to_csv("test_data.csv", index=False)
    print("✅ 测试数据创建成功")
    
    # 测试数据图表浏览器
    explorer = DataChartExplorer()
    explorer.df = df
    explorer.process_dataframe()
    
    # 清理测试文件
    import os
    if os.path.exists("test_data.csv"):
        os.remove("test_data.csv")
        print("✅ 测试文件清理完成")

if __name__ == "__main__":
    test_basic_functionality()
