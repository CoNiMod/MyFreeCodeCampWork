#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
三个数学游戏演示脚本
快速展示游戏功能
"""

import time
import sys
import os

# 添加当前目录到路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def demo_scatter_plot_game():
    """演示散点图游戏"""
    print("🎯 散点图游戏演示")
    print("=" * 40)
    
    from scatter_plot_game import ScatterPlotGame
    game = ScatterPlotGame()
    
    print("游戏特点:")
    print("- 随机生成图像上的点数")
    print("- 随着等级提升，图像变得更大")
    print("- 提高坐标识别能力")
    print(f"- 共 {game.max_level} 个等级")
    
    # 显示等级设置示例
    for level in range(1, 4):
        game.level = level
        xmin, xmax, ymin, ymax, points = game.get_level_settings()
        print(f"等级 {level}: 坐标范围 X({xmin}到{xmax}), Y({ymin}到{ymax}), 点数: {points}")
    
    print("\n要开始游戏，运行: python scatter_plot_game.py")


def demo_algebra_game():
    """演示代数练习游戏"""
    print("\n🧮 代数练习游戏演示")
    print("=" * 40)
    
    from algebra_game import AlgebraGame
    game = AlgebraGame()
    
    print("游戏特点:")
    print("- 用随机的整数值生成问题")
    print("- 包含一步和两步问题")
    print("- 使用正值和负值")
    print("- 随着等级提升，数字变得更大")
    print(f"- 共 {game.max_level} 个等级")
    
    # 生成示例问题
    print("\n示例问题:")
    problem1, answer1 = game.generate_one_step_problem()
    problem2, answer2 = game.generate_two_step_problem()
    print(f"一步问题: {problem1}")
    print(f"两步问题: {problem2}")
    
    print("\n要开始游戏，运行: python algebra_game.py")


def demo_projectile_game():
    """演示弹射游戏"""
    print("\n🚀 弹射游戏演示")
    print("=" * 40)
    
    from projectile_game import ProjectileGame
    game = ProjectileGame()
    
    print("游戏特点:")
    print("- 显示具有随机高度和位置的'墙'")
    print("- 玩家必须调整抛物线路径以清除墙")
    print("- 第1、2关使用滑块调整参数")
    print("- 第3关手动输入 a、b、c 值")
    print(f"- 共 {game.max_level} 个等级")
    
    # 显示等级设置示例
    for level in range(1, game.max_level + 1):
        game.level = level
        wall_height, wall_distance, initial_height, max_velocity, use_sliders = game.get_level_settings()
        control_method = "滑块控制" if use_sliders else "手动输入"
        print(f"等级 {level}: 墙高{wall_height}m, 墙距{wall_distance}m, 控制方式: {control_method}")
    
    print("\n抛物线方程: y = ax² + bx + c")
    print("其中: a=重力加速度, b=初始速度, c=初始高度")
    
    print("\n要开始游戏，运行: python projectile_game.py")


def show_installation_guide():
    """显示安装指南"""
    print("\n📦 安装指南")
    print("=" * 40)
    print("1. 安装依赖:")
    print("   pip install -r requirements.txt")
    print()
    print("2. 运行主程序:")
    print("   python main.py")
    print()
    print("3. 或者运行启动脚本:")
    print("   python start_games.py")
    print()
    print("4. 运行测试:")
    print("   python test_games.py")


def main():
    """主函数"""
    print("🎮 三个数学游戏演示")
    print("=" * 50)
    print("这个项目包含三个有趣的数学游戏，旨在通过游戏化的方式提高数学技能。")
    print()
    
    # 演示各个游戏
    demo_scatter_plot_game()
    demo_algebra_game()
    demo_projectile_game()
    
    # 显示安装指南
    show_installation_guide()
    
    print("\n🎉 演示完成!")
    print("准备好开始数学冒险了吗？")


if __name__ == "__main__":
    main()
