#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
散点图游戏
随机生成图像上的点数，玩家必须输入 (x,y) 坐标
"""

import random
import matplotlib.pyplot as plt
import numpy as np

class ScatterPlotGame:
    """散点图游戏"""
    
    def __init__(self):
        self.score = 0
        self.level = 1
        self.max_level = 5
        
    def get_level_settings(self):
        """根据等级获取游戏设置"""
        if self.level == 1:
            return -5, 5, -5, 5, 3
        elif self.level == 2:
            return -8, 8, -8, 8, 4
        elif self.level == 3:
            return -12, 12, -12, 12, 5
        elif self.level == 4:
            return -15, 15, -15, 15, 6
        else:
            return -20, 20, -20, 20, 7
    
    def play_round(self):
        """玩一轮游戏"""
        xmin, xmax, ymin, ymax, points_count = self.get_level_settings()
        
        # 生成随机点
        x_points = [random.randint(xmin, xmax) for _ in range(points_count)]
        y_points = [random.randint(ymin, ymax) for _ in range(points_count)]
        
        # 创建图形
        fig, ax = plt.subplots(figsize=(10, 8))
        plt.axis([xmin, xmax, ymin, ymax])
        
        # 绘制坐标轴
        plt.plot([xmin, xmax], [0, 0], 'b-', linewidth=2)
        plt.plot([0, 0], [ymin, ymax], 'b-', linewidth=2)
        
        # 绘制网格
        plt.grid(True, alpha=0.3)
        
        # 绘制点
        plt.plot(x_points, y_points, 'ro', markersize=8)
        
        # 添加标签
        plt.title(f'散点图游戏 - 等级 {self.level}\n输入所有点的坐标 (x,y)，用逗号分隔')
        plt.xlabel('X 坐标')
        plt.ylabel('Y 坐标')
        
        # 显示图形
        plt.show()
        
        # 获取玩家输入
        print(f"\n等级 {self.level} - 找到 {points_count} 个点")
        print(f"坐标范围: X({xmin} 到 {xmax}), Y({ymin} 到 {ymax})")
        
        correct_guesses = 0
        for i in range(points_count):
            while True:
                try:
                    guess = input(f"输入第 {i+1} 个点的坐标 (x,y): ")
                    x_guess, y_guess = map(int, guess.split(','))
                    
                    if x_guess == x_points[i] and y_guess == y_points[i]:
                        print("✓ 正确!")
                        correct_guesses += 1
                        break
                    else:
                        print(f"✗ 错误! 正确答案是 ({x_points[i]}, {y_points[i]})")
                        break
                except ValueError:
                    print("格式错误! 请使用 x,y 格式 (例如: 3,4)")
                except:
                    print("输入错误! 请重试")
        
        # 计算得分
        round_score = correct_guesses / points_count
        self.score += round_score
        
        print(f"\n本轮得分: {round_score:.1%}")
        print(f"总分: {self.score:.1f}")
        
        return round_score
    
    def play(self):
        """开始游戏"""
        print("=== 散点图游戏 ===")
        print("规则: 观察图形中的红点，输入每个点的坐标")
        
        for level in range(1, self.max_level + 1):
            self.level = level
            print(f"\n--- 等级 {level} ---")
            
            round_score = self.play_round()
            
            if round_score < 0.6:  # 如果得分低于60%，重新开始当前等级
                print("得分太低，重新开始当前等级")
                level -= 1
                continue
            
            if level < self.max_level:
                continue_game = input("\n继续下一等级? (y/n): ").lower()
                if continue_game != 'y':
                    break
        
        print(f"\n游戏结束! 最终得分: {self.score:.1f}")


if __name__ == "__main__":
    game = ScatterPlotGame()
    game.play()
