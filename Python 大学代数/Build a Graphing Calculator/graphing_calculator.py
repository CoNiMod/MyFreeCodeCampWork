#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
绘图计算器 - 基于Python的数学绘图工具
支持函数绘图、数值表、区域着色、方程组求解、缩放和二次方程求解
"""

import matplotlib.pyplot as plt
import numpy as np
import sympy as sp
from sympy import symbols, solve, linsolve
import math
from matplotlib.patches import Polygon
import warnings
warnings.filterwarnings('ignore')

class GraphingCalculator:
    def __init__(self):
        """初始化绘图计算器"""
        self.x = symbols('x')
        self.y = symbols('y')
        self.fig = None
        self.ax = None
        self.xmin = -10
        self.xmax = 10
        self.ymin = -10
        self.ymax = 10
        
    def setup_graph(self, xmin=None, ymin=None, xmax=None, ymax=None):
        """设置图形窗口"""
        if xmin is not None:
            self.xmin = xmin
        if ymin is not None:
            self.ymin = ymin
        if xmax is not None:
            self.xmax = xmax
        if ymax is not None:
            self.ymax = ymax
            
        self.fig, self.ax = plt.subplots(figsize=(10, 8))
        self.ax.set_xlim(self.xmin, self.xmax)
        self.ax.set_ylim(self.ymin, self.ymax)
        
        # 绘制坐标轴
        self.ax.axhline(y=0, color='k', linestyle='-', alpha=0.3)
        self.ax.axvline(x=0, color='k', linestyle='-', alpha=0.3)
        self.ax.grid(True, alpha=0.3)
        self.ax.set_aspect('equal', adjustable='box')
        
    def plot_function(self, expression, label=None, color='blue', linewidth=2):
        """绘制函数"""
        try:
            # 创建x值数组
            x_vals = np.linspace(self.xmin, self.xmax, 1000)
            
            # 将sympy表达式转换为可计算的函数
            if isinstance(expression, str):
                # 处理常见的数学函数
                expression = expression.replace('^', '**')
                expression = expression.replace('sin', 'np.sin')
                expression = expression.replace('cos', 'np.cos')
                expression = expression.replace('tan', 'np.tan')
                expression = expression.replace('log', 'np.log')
                expression = expression.replace('sqrt', 'np.sqrt')
                expression = expression.replace('exp', 'np.exp')
                
                # 创建函数
                func = lambda x: eval(expression, {"x": x, "np": np, "math": math})
            else:
                # 如果是sympy表达式
                func = lambda x: [float(expression.subs(self.x, val)) for val in x]
            
            # 计算y值
            y_vals = func(x_vals)
            
            # 绘制函数
            if label:
                self.ax.plot(x_vals, y_vals, color=color, linewidth=linewidth, label=label)
                self.ax.legend()
            else:
                self.ax.plot(x_vals, y_vals, color=color, linewidth=linewidth)
                
        except Exception as e:
            print(f"绘制函数时出错: {e}")
            
    def shade_area(self, expression, above=True, color='lightblue', alpha=0.3):
        """着色区域（函数上方或下方）"""
        try:
            x_vals = np.linspace(self.xmin, self.xmax, 1000)
            
            if isinstance(expression, str):
                expression = expression.replace('^', '**')
                expression = expression.replace('sin', 'np.sin')
                expression = expression.replace('cos', 'np.cos')
                expression = expression.replace('tan', 'np.tan')
                expression = expression.replace('log', 'np.log')
                expression = expression.replace('sqrt', 'np.sqrt')
                expression = expression.replace('exp', 'np.exp')
                
                func = lambda x: eval(expression, {"x": x, "np": np, "math": math})
            else:
                func = lambda x: [float(expression.subs(self.x, val)) for val in x]
            
            y_vals = func(x_vals)
            
            if above:
                # 着色函数上方
                self.ax.fill_between(x_vals, y_vals, self.ymax, 
                                   color=color, alpha=alpha)
            else:
                # 着色函数下方
                self.ax.fill_between(x_vals, y_vals, self.ymin, 
                                   color=color, alpha=alpha)
                                   
        except Exception as e:
            print(f"着色区域时出错: {e}")
            
    def create_table(self, expression, x_start=-5, x_end=5, step=1):
        """创建数值表"""
        try:
            if isinstance(expression, str):
                expression = expression.replace('^', '**')
                expression = expression.replace('sin', 'np.sin')
                expression = expression.replace('cos', 'np.cos')
                expression = expression.replace('tan', 'np.tan')
                expression = expression.replace('log', 'np.log')
                expression = expression.replace('sqrt', 'np.sqrt')
                expression = expression.replace('exp', 'np.exp')
                
                func = lambda x: eval(expression, {"x": x, "np": np, "math": math})
            else:
                func = lambda x: float(expression.subs(self.x, x))
            
            print(f"\n函数 y = {expression} 的数值表:")
            print("=" * 30)
            print("x\t\ty")
            print("-" * 30)
            
            x_vals = range(x_start, x_end + 1, step)
            for x_val in x_vals:
                try:
                    y_val = func(x_val)
                    print(f"{x_val}\t\t{y_val:.4f}")
                except:
                    print(f"{x_val}\t\t未定义")
            print("=" * 30)
            
        except Exception as e:
            print(f"创建数值表时出错: {e}")
            
    def solve_system(self, eq1, eq2):
        """求解方程组"""
        try:
            # 将方程转换为标准形式
            if isinstance(eq1, str):
                eq1 = eq1.replace('^', '**')
            if isinstance(eq2, str):
                eq2 = eq2.replace('^', '**')
                
            # 创建sympy表达式
            expr1 = sp.sympify(eq1)
            expr2 = sp.sympify(eq2)
            
            # 求解方程组
            solution = linsolve([expr1, expr2], (self.x, self.y))
            
            if solution:
                x_sol = float(solution.args[0][0])
                y_sol = float(solution.args[0][1])
                return x_sol, y_sol
            else:
                return None
                
        except Exception as e:
            print(f"求解方程组时出错: {e}")
            return None
            
    def plot_system(self, eq1, eq2):
        """绘制方程组并显示交点"""
        try:
            self.setup_graph()
            
            # 绘制两个方程
            self.plot_function(eq1, label=f"方程1: {eq1}", color='blue')
            self.plot_function(eq2, label=f"方程2: {eq2}", color='red')
            
            # 求解交点
            solution = self.solve_system(eq1, eq2)
            if solution:
                x_sol, y_sol = solution
                self.ax.plot(x_sol, y_sol, 'ko', markersize=8, label=f'交点: ({x_sol:.3f}, {y_sol:.3f})')
                self.ax.legend()
                print(f"方程组解: x = {x_sol:.3f}, y = {y_sol:.3f}")
            else:
                print("方程组无解或解不唯一")
                
            plt.title("方程组图形")
            plt.show()
            
        except Exception as e:
            print(f"绘制方程组时出错: {e}")
            
    def solve_quadratic(self, a, b, c):
        """求解二次方程 ax² + bx + c = 0"""
        try:
            discriminant = b**2 - 4*a*c
            
            if discriminant > 0:
                x1 = (-b + math.sqrt(discriminant)) / (2*a)
                x2 = (-b - math.sqrt(discriminant)) / (2*a)
                return x1, x2
            elif discriminant == 0:
                x = -b / (2*a)
                return x, x
            else:
                return None
                
        except Exception as e:
            print(f"求解二次方程时出错: {e}")
            return None
            
    def plot_quadratic(self, a, b, c):
        """绘制二次函数并显示根和顶点"""
        try:
            # 计算顶点
            vertex_x = -b / (2*a)
            vertex_y = a * vertex_x**2 + b * vertex_x + c
            
            # 计算根
            roots = self.solve_quadratic(a, b, c)
            
            # 设置图形范围
            if roots:
                x_min = min(roots[0], roots[1], vertex_x) - 2
                x_max = max(roots[0], roots[1], vertex_x) + 2
            else:
                x_min = vertex_x - 5
                x_max = vertex_x + 5
                
            y_min = min(vertex_y, 0) - 2
            y_max = max(vertex_y, 0) + 2
            
            self.setup_graph(x_min, y_min, x_max, y_max)
            
            # 绘制二次函数
            expression = f"{a}*x**2 + {b}*x + {c}"
            self.plot_function(expression, label=f"y = {a}x² + {b}x + {c}", color='green')
            
            # 标记顶点
            self.ax.plot(vertex_x, vertex_y, 'ro', markersize=8, label=f'顶点: ({vertex_x:.3f}, {vertex_y:.3f})')
            
            # 标记根
            if roots:
                if roots[0] == roots[1]:
                    self.ax.plot(roots[0], 0, 'ko', markersize=8, label=f'重根: x = {roots[0]:.3f}')
                else:
                    self.ax.plot(roots[0], 0, 'ko', markersize=8, label=f'根1: x = {roots[0]:.3f}')
                    self.ax.plot(roots[1], 0, 'ko', markersize=8, label=f'根2: x = {roots[1]:.3f}')
            else:
                self.ax.text(0.5, 0.5, '无实根', transform=self.ax.transAxes, 
                           ha='center', va='center', fontsize=12)
                
            self.ax.legend()
            plt.title("二次函数图形")
            plt.show()
            
            # 输出结果
            print(f"二次函数: y = {a}x² + {b}x + {c}")
            print(f"顶点: ({vertex_x:.3f}, {vertex_y:.3f})")
            if roots:
                if roots[0] == roots[1]:
                    print(f"根: x = {roots[0]:.3f} (重根)")
                else:
                    print(f"根: x₁ = {roots[0]:.3f}, x₂ = {roots[1]:.3f}")
            else:
                print("无实根")
                
        except Exception as e:
            print(f"绘制二次函数时出错: {e}")
            
    def zoom_in(self, factor=2):
        """放大图形"""
        center_x = (self.xmin + self.xmax) / 2
        center_y = (self.ymin + self.ymax) / 2
        
        range_x = (self.xmax - self.xmin) / factor
        range_y = (self.ymax - self.ymin) / factor
        
        self.xmin = center_x - range_x / 2
        self.xmax = center_x + range_x / 2
        self.ymin = center_y - range_y / 2
        self.ymax = center_y + range_y / 2
        
        if self.ax:
            self.ax.set_xlim(self.xmin, self.xmax)
            self.ax.set_ylim(self.ymin, self.ymax)
            
    def zoom_out(self, factor=2):
        """缩小图形"""
        center_x = (self.xmin + self.xmax) / 2
        center_y = (self.ymin + self.ymax) / 2
        
        range_x = (self.xmax - self.xmin) * factor
        range_y = (self.ymax - self.ymin) * factor
        
        self.xmin = center_x - range_x / 2
        self.xmax = center_x + range_x / 2
        self.ymin = center_y - range_y / 2
        self.ymax = center_y + range_y / 2
        
        if self.ax:
            self.ax.set_xlim(self.xmin, self.xmax)
            self.ax.set_ylim(self.ymin, self.ymax)
            
    def show_menu(self):
        """显示主菜单"""
        print("\n" + "="*60)
        print("          绘图计算器 - 主菜单")
        print("="*60)
        print("1. 绘制单个函数")
        print("2. 绘制多个函数")
        print("3. 创建数值表")
        print("4. 区域着色")
        print("5. 求解并绘制方程组")
        print("6. 绘制二次函数")
        print("7. 缩放图形")
        print("8. 显示当前图形")
        print("9. 清除图形")
        print("0. 退出")
        print("="*60)
        
    def run(self):
        """运行绘图计算器"""
        print("欢迎使用绘图计算器！")
        print("支持的功能：函数绘图、数值表、区域着色、方程组求解、缩放等")
        
        while True:
            self.show_menu()
            choice = input("请选择功能 (0-9): ").strip()
            
            if choice == '0':
                print("感谢使用绘图计算器！")
                break
                
            elif choice == '1':
                self.plot_single_function()
                
            elif choice == '2':
                self.plot_multiple_functions()
                
            elif choice == '3':
                self.create_table_menu()
                
            elif choice == '4':
                self.shade_area_menu()
                
            elif choice == '5':
                self.solve_system_menu()
                
            elif choice == '6':
                self.plot_quadratic_menu()
                
            elif choice == '7':
                self.zoom_menu()
                
            elif choice == '8':
                if self.fig:
                    plt.show()
                else:
                    print("当前没有图形显示")
                    
            elif choice == '9':
                if self.fig:
                    plt.close(self.fig)
                    self.fig = None
                    self.ax = None
                    print("图形已清除")
                else:
                    print("当前没有图形需要清除")
                    
            else:
                print("无效选择，请重新输入")
                
    def plot_single_function(self):
        """绘制单个函数"""
        print("\n--- 绘制单个函数 ---")
        expression = input("请输入函数表达式 (例如: x**2 + 2*x + 1): ").strip()
        
        if expression:
            self.setup_graph()
            self.plot_function(expression, label=f"y = {expression}")
            plt.title("函数图形")
            plt.show()
            
    def plot_multiple_functions(self):
        """绘制多个函数"""
        print("\n--- 绘制多个函数 ---")
        functions = []
        
        while True:
            func = input("请输入函数表达式 (输入'完成'结束): ").strip()
            if func.lower() in ['完成', 'done', '']:
                break
            functions.append(func)
            
        if functions:
            self.setup_graph()
            colors = ['blue', 'red', 'green', 'orange', 'purple', 'brown']
            
            for i, func in enumerate(functions):
                color = colors[i % len(colors)]
                self.plot_function(func, label=f"y = {func}", color=color)
                
            plt.title("多个函数图形")
            plt.show()
            
    def create_table_menu(self):
        """创建数值表菜单"""
        print("\n--- 创建数值表 ---")
        expression = input("请输入函数表达式: ").strip()
        
        if expression:
            try:
                x_start = int(input("起始x值 (默认-5): ") or -5)
                x_end = int(input("结束x值 (默认5): ") or 5)
                step = int(input("步长 (默认1): ") or 1)
                
                self.create_table(expression, x_start, x_end, step)
            except ValueError:
                print("输入无效，使用默认值")
                self.create_table(expression)
                
    def shade_area_menu(self):
        """区域着色菜单"""
        print("\n--- 区域着色 ---")
        expression = input("请输入函数表达式: ").strip()
        
        if expression:
            self.setup_graph()
            self.plot_function(expression, label=f"y = {expression}")
            
            choice = input("着色函数上方还是下方？(上/下): ").strip()
            above = choice.lower() in ['上', 'above', 'a']
            
            self.shade_area(expression, above=above)
            plt.title("区域着色图形")
            plt.show()
            
    def solve_system_menu(self):
        """求解方程组菜单"""
        print("\n--- 求解方程组 ---")
        print("请输入两个方程，格式如: x + y - 5")
        
        eq1 = input("方程1: ").strip()
        eq2 = input("方程2: ").strip()
        
        if eq1 and eq2:
            self.plot_system(eq1, eq2)
            
    def plot_quadratic_menu(self):
        """绘制二次函数菜单"""
        print("\n--- 绘制二次函数 ---")
        print("二次函数格式: y = ax² + bx + c")
        
        try:
            a = float(input("请输入 a 值: "))
            b = float(input("请输入 b 值: "))
            c = float(input("请输入 c 值: "))
            
            if a != 0:
                self.plot_quadratic(a, b, c)
            else:
                print("a 不能为 0，这不是二次函数")
        except ValueError:
            print("输入无效，请输入数字")
            
    def zoom_menu(self):
        """缩放菜单"""
        print("\n--- 缩放功能 ---")
        print("1. 放大")
        print("2. 缩小")
        print("3. 重置视图")
        
        choice = input("请选择: ").strip()
        
        if choice == '1':
            factor = float(input("放大倍数 (默认2): ") or 2)
            self.zoom_in(factor)
            print(f"图形已放大 {factor} 倍")
            
        elif choice == '2':
            factor = float(input("缩小倍数 (默认2): ") or 2)
            self.zoom_out(factor)
            print(f"图形已缩小 {factor} 倍")
            
        elif choice == '3':
            self.xmin, self.xmax = -10, 10
            self.ymin, self.ymax = -10, 10
            if self.ax:
                self.ax.set_xlim(self.xmin, self.xmax)
                self.ax.set_ylim(self.ymin, self.ymax)
            print("视图已重置")
            
        if self.fig:
            plt.show()

def main():
    """主函数"""
    try:
        calculator = GraphingCalculator()
        calculator.run()
    except KeyboardInterrupt:
        print("\n\n程序被用户中断")
    except Exception as e:
        print(f"\n程序运行出错: {e}")

if __name__ == "__main__":
    main()
