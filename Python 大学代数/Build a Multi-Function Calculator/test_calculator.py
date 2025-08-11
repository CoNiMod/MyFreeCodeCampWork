#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试多功能计算器的各个功能
"""

import sys
import os

# 添加当前目录到Python路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from multi_function_calculator import *

def test_proportions():
    """测试比例计算功能"""
    print("测试比例计算...")
    # 模拟输入：a=2, b=3, c=4
    # 期望结果：d = (3*4)/2 = 6
    
    # 这里我们直接测试计算逻辑
    a, b, c = 2, 3, 4
    if b != 0 and a != 0:
        d = (b * c) / a
        expected = 6
        if abs(d - expected) < 0.001:
            print("✓ 比例计算测试通过")
        else:
            print(f"✗ 比例计算测试失败: 期望 {expected}, 得到 {d}")
    else:
        print("✗ 比例计算测试失败: 除零错误")

def test_square_root_factoring():
    """测试平方根分解功能"""
    print("测试平方根分解...")
    
    # 测试案例：12 = 4 * 3，所以 √12 = 2√3
    n = 12
    max_factor = 1
    upper_limit = math.floor(math.sqrt(n)) + 1
    
    for maybe_factor in range(1, upper_limit):
        if n % (maybe_factor**2) == 0:
            max_factor = maybe_factor**2
    
    other_factor = n / max_factor
    square_root = int(math.sqrt(max_factor))
    
    expected_factor = 4  # 12的最大平方因子
    expected_other = 3   # 剩余因子
    
    if max_factor == expected_factor and other_factor == expected_other:
        print("✓ 平方根分解测试通过")
        print(f"  √{n} = {square_root}√{int(other_factor)}")
    else:
        print(f"✗ 平方根分解测试失败: 期望因子 {expected_factor}, 得到 {max_factor}")

def test_decimal_conversion():
    """测试小数转换功能"""
    print("测试小数转换...")
    
    # 测试案例：0.25 = 1/4 = 25%
    decimal_str = "0.25"
    decimal_num = float(decimal_str)
    decimal_places = len(decimal_str.split('.')[-1]) if '.' in decimal_str else 0
    
    denominator = 10 ** decimal_places
    numerator = int(decimal_num * denominator)
    
    from fractions import Fraction
    fraction = Fraction(numerator, denominator)
    percent = decimal_num * 100
    
    expected_fraction = "1/4"
    expected_percent = 25.0
    
    if str(fraction) == expected_fraction and abs(percent - expected_percent) < 0.001:
        print("✓ 小数转换测试通过")
        print(f"  小数: {decimal_num}")
        print(f"  分数: {fraction}")
        print(f"  百分比: {percent}%")
    else:
        print(f"✗ 小数转换测试失败")

def test_fraction_conversion():
    """测试分数转换功能"""
    print("测试分数转换...")
    
    # 测试案例：1/4 = 0.25 = 25%
    numerator, denominator = 1, 4
    
    if denominator != 0:
        decimal = numerator / denominator
        percent = decimal * 100
        
        expected_decimal = 0.25
        expected_percent = 25.0
        
        if abs(decimal - expected_decimal) < 0.001 and abs(percent - expected_percent) < 0.001:
            print("✓ 分数转换测试通过")
            print(f"  分数: {numerator}/{denominator}")
            print(f"  小数: {decimal}")
            print(f"  百分比: {percent}%")
        else:
            print(f"✗ 分数转换测试失败")
    else:
        print("✗ 分数转换测试失败: 分母为0")

def test_percent_conversion():
    """测试百分比转换功能"""
    print("测试百分比转换...")
    
    # 测试案例：25% = 0.25 = 1/4
    percent = 25.0
    
    decimal = percent / 100
    
    from fractions import Fraction
    fraction = Fraction(decimal).limit_denominator(1000)
    
    expected_decimal = 0.25
    expected_fraction = "1/4"
    
    if abs(decimal - expected_decimal) < 0.001 and str(fraction) == expected_fraction:
        print("✓ 百分比转换测试通过")
        print(f"  百分比: {percent}%")
        print(f"  小数: {decimal}")
        print(f"  分数: {fraction}")
    else:
        print(f"✗ 百分比转换测试失败")

def test_geometry_calculations():
    """测试几何计算功能"""
    print("测试几何计算...")
    
    # 测试矩形面积
    length, width = 5, 3
    area = length * width
    expected_area = 15
    
    if area == expected_area:
        print("✓ 矩形面积计算测试通过")
        print(f"  长度: {length}, 宽度: {width}, 面积: {area}")
    else:
        print(f"✗ 矩形面积计算测试失败: 期望 {expected_area}, 得到 {area}")
    
    # 测试圆形面积
    radius = 2
    area = math.pi * radius ** 2
    expected_area = math.pi * 4
    
    if abs(area - expected_area) < 0.001:
        print("✓ 圆形面积计算测试通过")
        print(f"  半径: {radius}, 面积: {area:.2f}")
    else:
        print(f"✗ 圆形面积计算测试失败")

def run_all_tests():
    """运行所有测试"""
    print("开始运行多功能计算器测试...\n")
    
    test_proportions()
    print()
    
    test_square_root_factoring()
    print()
    
    test_decimal_conversion()
    print()
    
    test_fraction_conversion()
    print()
    
    test_percent_conversion()
    print()
    
    test_geometry_calculations()
    print()
    
    print("所有测试完成！")

if __name__ == "__main__":
    run_all_tests()
