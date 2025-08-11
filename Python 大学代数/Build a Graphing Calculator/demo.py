#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
多功能计算器演示脚本
展示各种数学计算功能
"""

import math
import sympy
from sympy import symbols, solve
from fractions import Fraction

def demo_proportions():
    """演示比例计算"""
    print("=" * 50)
    print("比例计算演示")
    print("=" * 50)
    
    # 示例：如果2个苹果需要3元，那么4个苹果需要多少钱？
    a, b, c = 2, 3, 4
    d = (b * c) / a
    
    print(f"问题：如果 {a} 个苹果需要 {b} 元，那么 {c} 个苹果需要多少钱？")
    print(f"比例：{a}/{b} = {c}/{d}")
    print(f"答案：{c} 个苹果需要 {d} 元")
    print()

def demo_equations():
    """演示方程求解"""
    print("=" * 50)
    print("方程求解演示")
    print("=" * 50)
    
    # 示例：解方程 2x + 5 = 13
    x = symbols('x')
    equation = 2*x + 5 - 13
    solution = solve(equation, x)
    
    print(f"方程：2x + 5 = 13")
    print(f"解：x = {solution[0]}")
    print(f"验证：2 × {solution[0]} + 5 = {2*solution[0] + 5}")
    print()

def demo_square_roots():
    """演示平方根分解"""
    print("=" * 50)
    print("平方根分解演示")
    print("=" * 50)
    
    # 示例：分解 √12
    n = 12
    max_factor = 1
    upper_limit = math.floor(math.sqrt(n)) + 1
    
    for maybe_factor in range(1, upper_limit):
        if n % (maybe_factor**2) == 0:
            max_factor = maybe_factor**2
    
    other_factor = n / max_factor
    square_root = int(math.sqrt(max_factor))
    
    print(f"分解 √{n}")
    print(f"最大平方因子：{max_factor}")
    print(f"剩余因子：{int(other_factor)}")
    print(f"结果：√{n} = {square_root}√{int(other_factor)}")
    print()

def demo_conversions():
    """演示各种转换"""
    print("=" * 50)
    print("数值转换演示")
    print("=" * 50)
    
    # 小数转分数和百分比
    decimal = 0.375
    decimal_str = "0.375"
    decimal_places = len(decimal_str.split('.')[-1])
    
    denominator = 10 ** decimal_places
    numerator = int(decimal * denominator)
    fraction = Fraction(numerator, denominator)
    percent = decimal * 100
    
    print(f"小数 {decimal} 的转换：")
    print(f"  分数：{fraction}")
    print(f"  百分比：{percent}%")
    print()
    
    # 分数转小数和百分比
    frac_num, frac_den = 3, 8
    frac_decimal = frac_num / frac_den
    frac_percent = frac_decimal * 100
    
    print(f"分数 {frac_num}/{frac_den} 的转换：")
    print(f"  小数：{frac_decimal}")
    print(f"  百分比：{frac_percent}%")
    print()
    
    # 百分比转小数和分数
    percent_val = 37.5
    percent_decimal = percent_val / 100
    percent_fraction = Fraction(percent_decimal).limit_denominator(1000)
    
    print(f"百分比 {percent_val}% 的转换：")
    print(f"  小数：{percent_decimal}")
    print(f"  分数：{percent_fraction}")
    print()

def demo_geometry():
    """演示几何计算"""
    print("=" * 50)
    print("几何计算演示")
    print("=" * 50)
    
    # 矩形面积
    length, width = 6, 4
    rect_area = length * width
    print(f"矩形：长度 = {length}, 宽度 = {width}")
    print(f"面积 = {length} × {width} = {rect_area}")
    print()
    
    # 圆形面积
    radius = 3
    circle_area = math.pi * radius ** 2
    print(f"圆形：半径 = {radius}")
    print(f"面积 = π × {radius}² = {circle_area:.2f}")
    print()
    
    # 三角形面积
    base, height = 5, 4
    triangle_area = 0.5 * base * height
    print(f"三角形：底边 = {base}, 高度 = {height}")
    print(f"面积 = 1/2 × {base} × {height} = {triangle_area}")
    print()

def run_demo():
    """运行所有演示"""
    print("多功能计算器功能演示")
    print("=" * 50)
    
    demo_proportions()
    demo_equations()
    demo_square_roots()
    demo_conversions()
    demo_geometry()
    
    print("=" * 50)
    print("演示完成！")
    print("运行 'python multi_function_calculator.py' 来使用交互式计算器")

if __name__ == "__main__":
    run_demo()
