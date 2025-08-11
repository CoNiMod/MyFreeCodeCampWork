#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
弹射游戏
显示具有随机高度和位置的"墙"，玩家必须调整抛物线路径以清除墙
"""

import random
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.widgets import Slider, Button
import matplotlib.patches as patches

class ProjectileGame:
    """弹射游戏"""
    
    def __init__(self):
        self.score = 0
        self.level = 1
        self.max_level = 3
        
    def get_level_settings(self):
        """根据等级获取游戏设置"""
        if self.level == 1:
            return 15, 25, 8, 12, True  # 墙高, 墙距, 初始高度, 最大速度, 使用滑块
        elif self.level == 2:
            return 20, 30, 10, 15, True
        else:
            return 25, 35, 12, 18, False  # 第三关不使用滑块
    
    def calculate_trajectory(self, a, b, c, x_values):
        """计算抛物线轨迹"""
        # 确保 x_values 是 numpy 数组
        if not hasattr(x_values, '__array__'):
            x_values = np.array(x_values)
        return a * x_values**2 + b * x_values + c
    
    def check_collision(self, a, b, c, wall_x, wall_height):
        """检查是否撞墙"""
        # 计算在墙位置的y值
        y_at_wall = a * wall_x**2 + b * wall_x + c
        
        # 如果y值小于墙高，则撞墙
        return y_at_wall <= wall_height
    
    def play_level_1_2(self, wall_height, wall_distance, initial_height, max_velocity):
        """玩第1、2关（使用滑块）"""
        print(f"\n=== 等级 {self.level} ===")
        print(f"墙高: {wall_height}m, 墙距: {wall_distance}m")
        print(f"初始高度: {initial_height}m")
        print("使用滑块调整抛物线参数")
        
        # 创建图形
        fig, ax = plt.subplots(figsize=(12, 8))
        plt.subplots_adjust(bottom=0.3)
        
        # 设置坐标轴
        xmin, xmax = 0, wall_distance + 10
        ymin, ymax = 0, max(wall_height + 10, initial_height + 10)
        plt.axis([xmin, xmax, ymin, ymax])
        
        # 绘制坐标轴
        plt.plot([xmin, xmax], [0, 0], 'b-', linewidth=2)
        plt.plot([0, 0], [ymin, ymax], 'b-', linewidth=2)
        
        # 绘制墙
        wall = patches.Rectangle((wall_distance, 0), 1, wall_height, 
                                facecolor='red', alpha=0.7)
        ax.add_patch(wall)
        plt.text(wall_distance + 0.5, wall_height/2, f'墙\n{wall_height}m', 
                ha='center', va='center', fontsize=12, weight='bold')
        
        # 绘制起点
        plt.plot([0], [initial_height], 'go', markersize=10, label='起点')
        
        # 创建滑块
        ax_a = plt.axes([0.2, 0.15, 0.6, 0.03])
        ax_b = plt.axes([0.2, 0.1, 0.6, 0.03])
        ax_c = plt.axes([0.2, 0.05, 0.6, 0.03])
        
        slider_a = Slider(ax_a, 'a', -2.0, 0.0, valinit=-0.5)
        slider_b = Slider(ax_b, 'b', 0.0, max_velocity, valinit=max_velocity/2)
        slider_c = Slider(ax_c, 'c', 0.0, initial_height, valinit=initial_height)
        
        # 初始轨迹
        x_values = np.linspace(0, xmax, 100)
        line, = plt.plot(x_values, self.calculate_trajectory(slider_a.val, slider_b.val, slider_c.val, x_values), 'g-', linewidth=2)
        
        # 更新函数
        def update(val):
            a = slider_a.val
            b = slider_b.val
            c = slider_c.val
            
            y_values = self.calculate_trajectory(a, b, c, x_values)
            line.set_ydata(y_values)
            
            # 检查是否撞墙
            if self.check_collision(a, b, c, wall_distance, wall_height):
                ax.set_title(f'等级 {self.level} - 撞墙了! 调整参数重试', color='red')
            else:
                ax.set_title(f'等级 {self.level} - 成功! 抛物线: y = {a:.2f}x² + {b:.2f}x + {c:.2f}', color='green')
            
            fig.canvas.draw_idle()
        
        slider_a.on_changed(update)
        slider_b.on_changed(update)
        slider_c.on_changed(update)
        
        # 添加说明
        plt.text(xmax/2, ymax*0.9, '调整滑块使抛物线越过墙', 
                ha='center', va='center', fontsize=12, bbox=dict(boxstyle="round,pad=0.3", facecolor="lightblue"))
        
        plt.xlabel('距离 (m)')
        plt.ylabel('高度 (m)')
        plt.grid(True, alpha=0.3)
        plt.legend()
        
        plt.show()
        
        # 检查最终结果
        final_a = slider_a.val
        final_b = slider_b.val
        final_c = slider_c.val
        
        if not self.check_collision(final_a, final_b, final_c, wall_distance, wall_height):
            print("🎉 恭喜! 成功越过墙!")
            self.score += 1
            return True
        else:
            print("💥 撞墙了! 游戏失败")
            return False
    
    def play_level_3(self, wall_height, wall_distance, initial_height, max_velocity):
        """玩第3关（手动输入参数）"""
        print(f"\n=== 等级 {self.level} ===")
        print(f"墙高: {wall_height}m, 墙距: {wall_distance}m")
        print(f"初始高度: {initial_height}m")
        print("手动输入抛物线参数 y = ax² + bx + c")
        print("提示: a 应该是负数（重力加速度）")
        
        # 获取玩家输入
        while True:
            try:
                a = float(input("输入 a 值 (建议 -0.5 到 -0.1): "))
                b = float(input("输入 b 值 (初始速度，建议 5 到 15): "))
                c = float(input("输入 c 值 (初始高度，建议 8 到 15): "))
                break
            except ValueError:
                print("请输入有效的数字")
        
        # 创建图形
        fig, ax = plt.subplots(figsize=(12, 8))
        
        # 设置坐标轴
        xmin, xmax = 0, wall_distance + 10
        ymin, ymax = 0, max(wall_height + 10, initial_height + 10)
        plt.axis([xmin, xmax, ymin, ymax])
        
        # 绘制坐标轴
        plt.plot([xmin, xmax], [0, 0], 'b-', linewidth=2)
        plt.plot([0, 0], [ymin, ymax], 'b-', linewidth=2)
        
        # 绘制墙
        wall = patches.Rectangle((wall_distance, 0), 1, wall_height, 
                                facecolor='red', alpha=0.7)
        ax.add_patch(wall)
        plt.text(wall_distance + 0.5, wall_height/2, f'墙\n{wall_height}m', 
                ha='center', va='center', fontsize=12, weight='bold')
        
        # 绘制起点
        plt.plot([0], [initial_height], 'go', markersize=10, label='起点')
        
        # 绘制轨迹
        x_values = np.linspace(0, xmax, 100)
        y_values = self.calculate_trajectory(a, b, c, x_values)
        plt.plot(x_values, y_values, 'g-', linewidth=2, label=f'y = {a:.2f}x² + {b:.2f}x + {c:.2f}')
        
        # 检查是否撞墙
        if self.check_collision(a, b, c, wall_distance, wall_height):
            plt.title(f'等级 {self.level} - 撞墙了! 参数: a={a:.2f}, b={b:.2f}, c={c:.2f}', color='red')
            success = False
        else:
            plt.title(f'等级 {self.level} - 成功! 参数: a={a:.2f}, b={b:.2f}, c={c:.2f}', color='green')
            success = True
        
        plt.xlabel('距离 (m)')
        plt.ylabel('高度 (m)')
        plt.grid(True, alpha=0.3)
        plt.legend()
        
        plt.show()
        
        if success:
            print("🎉 恭喜! 成功越过墙!")
            self.score += 1
            return True
        else:
            print("💥 撞墙了! 游戏失败")
            return False
    
    def play(self):
        """开始游戏"""
        print("=== 弹射游戏 ===")
        print("规则: 调整抛物线参数，使物体越过墙")
        print("第1、2关使用滑块，第3关手动输入参数")
        
        for level in range(1, self.max_level + 1):
            self.level = level
            wall_height, wall_distance, initial_height, max_velocity, use_sliders = self.get_level_settings()
            
            if use_sliders:
                success = self.play_level_1_2(wall_height, wall_distance, initial_height, max_velocity)
            else:
                success = self.play_level_3(wall_height, wall_distance, initial_height, max_velocity)
            
            if not success:
                retry = input("重试当前等级? (y/n): ").lower()
                if retry == 'y':
                    level -= 1
                    continue
            
            if level < self.max_level:
                continue_game = input("\n继续下一等级? (y/n): ").lower()
                if continue_game != 'y':
                    break
        
        print(f"\n游戏结束! 最终得分: {self.score}/{self.max_level}")


if __name__ == "__main__":
    game = ProjectileGame()
    game.play()
