#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
三个数学游戏启动脚本
"""

import os
import sys
import subprocess

def check_dependencies():
    """检查依赖是否安装"""
    try:
        import matplotlib
        import numpy
        print("✓ 依赖检查通过")
        return True
    except ImportError as e:
        print(f"❌ 缺少依赖: {e}")
        print("请运行: pip install -r requirements.txt")
        return False

def show_welcome():
    """显示欢迎信息"""
    print("🎮" + "="*50 + "🎮")
    print("          欢迎来到三个数学游戏!")
    print("🎮" + "="*50 + "🎮")
    print()
    print("🎯 散点图游戏 - 提高坐标识别能力")
    print("🧮 代数练习游戏 - 加强代数运算技能")
    print("🚀 弹射游戏 - 学习抛物线方程")
    print()

def show_usage():
    """显示使用方法"""
    print("\n📖 使用方法:")
    print("1. 运行主程序: python main.py")
    print("2. 单独运行游戏:")
    print("   - 散点图游戏: python scatter_plot_game.py")
    print("   - 代数练习游戏: python algebra_game.py")
    print("   - 弹射游戏: python projectile_game.py")
    print("3. 查看帮助: python start_games.py --help")

def main():
    """主函数"""
    if len(sys.argv) > 1:
        if sys.argv[1] == '--help' or sys.argv[1] == '-h':
            show_usage()
            return
        elif sys.argv[1] == '--check':
            if check_dependencies():
                print("所有依赖已安装，可以开始游戏!")
            return
    
    show_welcome()
    
    # 检查依赖
    if not check_dependencies():
        return
    
    print("🚀 启动游戏...")
    
    try:
        # 运行主程序
        subprocess.run([sys.executable, "main.py"])
    except FileNotFoundError:
        print("❌ 找不到 main.py 文件")
        print("请确保在正确的目录中运行此脚本")
    except KeyboardInterrupt:
        print("\n👋 游戏已退出")
    except Exception as e:
        print(f"❌ 启动游戏时出错: {e}")

if __name__ == "__main__":
    main()
