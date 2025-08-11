#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
多功能计算器 - Multi-Function Calculator
FreeCodeCamp 数学基础项目

功能包括：
1. 解决比例问题
2. 解方程求x
3. 分解平方根
4. 小数转分数和百分比
5. 分数转小数和百分比
6. 百分比转小数和分数
"""

import math
import sympy
from sympy import symbols, solve
from fractions import Fraction

def solve_proportions():
    """解决比例问题 a/b = c/d"""
    print("\n=== 比例计算器 ===")
    print("格式: a/b = c/d")
    
    try:
        a = float(input("输入 a: "))
        b = float(input("输入 b: "))
        c = float(input("输入 c: "))
        
        if b == 0:
            print("错误：b 不能为 0")
            return
            
        # 使用比例公式：a/b = c/d，所以 d = (b*c)/a
        if a != 0:
            d = (b * c) / a
            print(f"比例 {a}/{b} = {c}/{d}")
            print(f"d = {d}")
        else:
            print("错误：a 不能为 0")
            
    except ValueError:
        print("请输入有效的数字")

def solve_equations():
    """解方程求x"""
    print("\n=== 方程求解器 ===")
    print("输入方程，例如: x + 5 = 10")
    
    try:
        equation_str = input("输入方程: ")
        
        # 将方程转换为标准形式 0 = ...
        if "=" in equation_str:
            left, right = equation_str.split("=")
            # 将右边移到左边，形成 0 = 左边 - 右边
            equation = f"({left.strip()}) - ({right.strip()})"
        else:
            equation = equation_str
        
        x = symbols('x')
        solutions = solve(equation, x)
        
        if solutions:
            print(f"方程的解: x = {solutions[0]}")
        else:
            print("方程无解")
            
    except Exception as e:
        print(f"错误：{e}")

def factor_square_roots():
    """分解平方根"""
    print("\n=== 平方根分解器 ===")
    
    try:
        n = int(input("输入要分解的数字: "))
        
        if n < 0:
            print("请输入非负数")
            return
            
        # 找到最大的平方因子
        max_factor = 1
        upper_limit = math.floor(math.sqrt(n)) + 1
        
        for maybe_factor in range(1, upper_limit):
            if n % (maybe_factor**2) == 0:
                max_factor = maybe_factor**2
        
        # 分解平方根
        other_factor = n / max_factor
        square_root = int(math.sqrt(max_factor))
        
        if max_factor == 1:
            print(f"√{n} 无法进一步分解")
        else:
            print(f"√{n} = {square_root}√{int(other_factor)}")
            
    except ValueError:
        print("请输入有效的整数")

def decimal_to_fraction_percent():
    """小数转分数和百分比"""
    print("\n=== 小数转换器 ===")
    
    try:
        decimal_str = input("输入小数: ")
        decimal_num = float(decimal_str)
        
        # 计算小数位数
        decimal_places = len(decimal_str.split('.')[-1]) if '.' in decimal_str else 0
        
        # 转换为分数
        denominator = 10 ** decimal_places
        numerator = int(decimal_num * denominator)
        
        # 简化分数
        fraction = Fraction(numerator, denominator)
        
        # 转换为百分比
        percent = decimal_num * 100
        
        print(f"小数: {decimal_num}")
        print(f"分数: {fraction}")
        print(f"百分比: {percent}%")
        
    except ValueError:
        print("请输入有效的小数")

def fraction_to_decimal_percent():
    """分数转小数和百分比"""
    print("\n=== 分数转换器 ===")
    
    try:
        numerator = int(input("输入分子: "))
        denominator = int(input("输入分母: "))
        
        if denominator == 0:
            print("错误：分母不能为 0")
            return
            
        # 转换为小数
        decimal = numerator / denominator
        
        # 转换为百分比
        percent = decimal * 100
        
        print(f"分数: {numerator}/{denominator}")
        print(f"小数: {decimal}")
        print(f"百分比: {percent}%")
        
    except ValueError:
        print("请输入有效的整数")

def percent_to_decimal_fraction():
    """百分比转小数和分数"""
    print("\n=== 百分比转换器 ===")
    
    try:
        percent = float(input("输入百分比 (例如: 25): "))
        
        # 转换为小数
        decimal = percent / 100
        
        # 转换为分数
        fraction = Fraction(decimal).limit_denominator(1000)
        
        print(f"百分比: {percent}%")
        print(f"小数: {decimal}")
        print(f"分数: {fraction}")
        
    except ValueError:
        print("请输入有效的数字")

def calculate_area():
    """计算几何图形面积"""
    print("\n=== 面积计算器 ===")
    print("1. 矩形")
    print("2. 圆形")
    print("3. 三角形")
    
    try:
        choice = input("选择图形 (1-3): ")
        
        if choice == "1":
            length = float(input("输入长度: "))
            width = float(input("输入宽度: "))
            area = length * width
            print(f"矩形面积: {area}")
            
        elif choice == "2":
            radius = float(input("输入半径: "))
            area = math.pi * radius ** 2
            print(f"圆形面积: {area}")
            
        elif choice == "3":
            base = float(input("输入底边: "))
            height = float(input("输入高度: "))
            area = 0.5 * base * height
            print(f"三角形面积: {area}")
            
        else:
            print("无效选择")
            
    except ValueError:
        print("请输入有效的数字")

def show_menu():
    """显示主菜单"""
    print("\n" + "="*50)
    print("          多功能计算器")
    print("="*50)
    print("1. 解决比例问题")
    print("2. 解方程求x")
    print("3. 分解平方根")
    print("4. 小数转分数和百分比")
    print("5. 分数转小数和百分比")
    print("6. 百分比转小数和分数")
    print("7. 几何面积计算")
    print("0. 退出")
    print("="*50)

def main():
    """主函数"""
    print("欢迎使用多功能计算器！")
    
    while True:
        show_menu()
        
        try:
            choice = input("请选择功能 (0-7): ")
            
            if choice == "0":
                print("感谢使用！再见！")
                break
            elif choice == "1":
                solve_proportions()
            elif choice == "2":
                solve_equations()
            elif choice == "3":
                factor_square_roots()
            elif choice == "4":
                decimal_to_fraction_percent()
            elif choice == "5":
                fraction_to_decimal_percent()
            elif choice == "6":
                percent_to_decimal_fraction()
            elif choice == "7":
                calculate_area()
            else:
                print("无效选择，请重新输入")
                
        except KeyboardInterrupt:
            print("\n\n程序被中断")
            break
        except Exception as e:
            print(f"发生错误: {e}")
        
        input("\n按回车键继续...")

if __name__ == "__main__":
    main()
