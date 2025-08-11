#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
多功能计算器启动脚本
快速启动计算器并显示使用说明
"""

import os
import sys

def show_welcome():
    """显示欢迎信息"""
    print("=" * 60)
    print("          欢迎使用多功能计算器！")
    print("=" * 60)
    print("这是FreeCodeCamp数学基础项目的多功能计算器")
    print("包含以下功能：")
    print("1. 比例计算器")
    print("2. 方程求解器") 
    print("3. 平方根分解器")
    print("4. 小数转换器")
    print("5. 分数转换器")
    print("6. 百分比转换器")
    print("7. 几何面积计算器")
    print("=" * 60)

def show_usage():
    """显示使用说明"""
    print("\n使用方法：")
    print("1. 运行主程序：python multi_function_calculator.py")
    print("2. 运行演示：python demo.py")
    print("3. 运行测试：python test_calculator.py")
    print("4. 查看帮助：python start_calculator.py --help")
    print("\n快速开始：")
    print("python multi_function_calculator.py")

def check_dependencies():
    """检查依赖包"""
    print("\n检查依赖包...")
    
    try:
        import sympy
        print("✓ SymPy 已安装")
    except ImportError:
        print("✗ SymPy 未安装，请运行: pip install sympy")
        return False
    
    try:
        import numpy
        print("✓ NumPy 已安装")
    except ImportError:
        print("✗ NumPy 未安装，请运行: pip install numpy")
        return False
    
    try:
        import matplotlib
        print("✓ Matplotlib 已安装")
    except ImportError:
        print("✗ Matplotlib 未安装，请运行: pip install matplotlib")
        return False
    
    return True

def main():
    """主函数"""
    if len(sys.argv) > 1 and sys.argv[1] == "--help":
        show_welcome()
        show_usage()
        return
    
    show_welcome()
    
    if check_dependencies():
        print("\n✓ 所有依赖包已安装，可以正常使用计算器！")
        show_usage()
        
        # 询问是否直接启动计算器
        try:
            choice = input("\n是否现在启动计算器？(y/n): ").lower().strip()
            if choice in ['y', 'yes', '是']:
                print("\n启动多功能计算器...")
                os.system("python multi_function_calculator.py")
        except KeyboardInterrupt:
            print("\n\n程序被中断")
    else:
        print("\n请先安装缺失的依赖包，然后重新运行此脚本")
        print("安装命令：pip install -r requirements.txt")

if __name__ == "__main__":
    main()
