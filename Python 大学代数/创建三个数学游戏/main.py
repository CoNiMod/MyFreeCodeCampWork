#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
三个数学游戏 - 主程序
整合散点图游戏、代数练习游戏和弹射游戏
"""

from scatter_plot_game import ScatterPlotGame
from algebra_game import AlgebraGame
from projectile_game import ProjectileGame

def show_menu():
    """显示主菜单"""
    print("\n" + "="*50)
    print("          三个数学游戏")
    print("="*50)
    print("1. 散点图游戏")
    print("2. 代数练习游戏")
    print("3. 弹射游戏")
    print("4. 退出")
    print("="*50)


def show_game_info():
    """显示游戏信息"""
    print("\n" + "="*60)
    print("                    游戏说明")
    print("="*60)
    print("🎯 散点图游戏:")
    print("   - 观察图形中的红点，输入每个点的坐标 (x,y)")
    print("   - 随着等级提升，图像变得更大，点数更多")
    print("   - 提高坐标识别能力")
    print()
    print("🧮 代数练习游戏:")
    print("   - 解决一步和两步代数问题")
    print("   - 使用正值和负值，随着等级提升数字更大")
    print("   - 提高代数运算能力")
    print()
    print("🚀 弹射游戏:")
    print("   - 调整抛物线参数，使物体越过墙")
    print("   - 第1、2关使用滑块调整参数")
    print("   - 第3关手动输入 a、b、c 值")
    print("   - 学习抛物线方程 y = ax² + bx + c")
    print("="*60)


def main():
    """主函数"""
    print("🎮 欢迎来到三个数学游戏!")
    print("通过游戏学习数学，提高数学技能")
    
    while True:
        show_menu()
        choice = input("请选择游戏 (1-4): ").strip()
        
        if choice == '1':
            print("\n🎯 启动散点图游戏...")
            game = ScatterPlotGame()
            game.play()
        elif choice == '2':
            print("\n🧮 启动代数练习游戏...")
            game = AlgebraGame()
            game.play()
        elif choice == '3':
            print("\n🚀 启动弹射游戏...")
            game = ProjectileGame()
            game.play()
        elif choice == '4':
            print("\n👋 感谢游玩! 再见!")
            break
        elif choice.lower() == 'info':
            show_game_info()
        else:
            print("❌ 无效选择，请重试")
            print("💡 输入 'info' 查看游戏说明")
        
        if choice in ['1', '2', '3']:
            input("\n按回车键返回主菜单...")


if __name__ == "__main__":
    main()
