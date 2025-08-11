#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
启动数据图表浏览器
"""

import sys
import os

def check_dependencies():
    """检查依赖包是否安装"""
    required_packages = ["pandas", "numpy", "matplotlib", "requests"]
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print(f"❌ 缺少依赖包: {", ".join(missing_packages)}")
        print("请运行: pip install -r requirements.txt")
        return False
    
    print("✅ 所有依赖包已安装")
    return True

def main():
    """主函数"""
    print("��� 启动数据图表浏览器...")
    
    if check_dependencies():
        try:
            from data_chart_explorer import DataChartExplorer
            explorer = DataChartExplorer()
            explorer.run()
        except Exception as e:
            print(f"❌ 启动失败: {e}")
    else:
        print("请先安装依赖包")

if __name__ == "__main__":
    main()
