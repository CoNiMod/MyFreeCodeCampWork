#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
财务计算器启动脚本
"""

import sys
import subprocess
import os

def check_dependencies():
    """检查依赖包是否已安装"""
    required_packages = ['matplotlib', 'numpy']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            missing_packages.append(package)
    
    return missing_packages

def install_dependencies(packages):
    """安装缺失的依赖包"""
    print(f"正在安装缺失的依赖包: {', '.join(packages)}")
    try:
        for package in packages:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install', package])
        print("✅ 依赖包安装完成！")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 安装依赖包失败: {e}")
        return False

def show_welcome():
    """显示欢迎信息"""
    print("="*60)
    print("           欢迎使用财务计算器！")
    print("="*60)
    print("本计算器提供以下功能：")
    print("• 养老金计算（每月复利和连续复利）")
    print("• 抵押付款计算")
    print("• 退休投资结余估计")
    print("• 资金翻倍时间计算")
    print("• 对数方程求解")
    print("• 科学计数法转换")
    print("• 投资增长图表绘制")
    print("="*60)

def main():
    """主函数"""
    show_welcome()
    
    # 检查依赖
    missing_packages = check_dependencies()
    
    if missing_packages:
        print(f"\n⚠️  检测到缺失的依赖包: {', '.join(missing_packages)}")
        choice = input("是否自动安装？(y/n): ").strip().lower()
        
        if choice == 'y':
            if not install_dependencies(missing_packages):
                print("❌ 无法启动计算器，请手动安装依赖包后重试")
                return
        else:
            print("❌ 无法启动计算器，缺少必要的依赖包")
            return
    
    # 启动计算器
    try:
        from financial_calculator import FinancialCalculator
        calculator = FinancialCalculator()
        calculator.run()
    except ImportError as e:
        print(f"❌ 导入错误: {e}")
    except Exception as e:
        print(f"❌ 启动错误: {e}")

if __name__ == "__main__":
    main()
