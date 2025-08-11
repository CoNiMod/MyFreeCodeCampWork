#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
数据图表浏览器演示脚本
"""

from data_chart_explorer import DataChartExplorer

def demo_preset_data():
    """演示使用预设数据源"""
    print("��� 演示：使用预设数据源")
    explorer = DataChartExplorer()
    
    # 加载预设数据
    if explorer.load_csv_from_code_url():
        explorer.process_dataframe()
        print("✅ 数据加载成功！")
    else:
        print("❌ 数据加载失败")
