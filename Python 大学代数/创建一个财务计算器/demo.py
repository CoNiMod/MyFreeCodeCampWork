#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
财务计算器演示脚本
展示各种功能的使用方法
"""

from financial_calculator import FinancialCalculator
import matplotlib.pyplot as plt

def demo_annuity_calculations():
    """演示养老金计算功能"""
    print("\n" + "="*50)
    print("演示：养老金计算功能")
    print("="*50)
    
    calc = FinancialCalculator()
    
    # 示例1：每月复利
    principal = 10000
    annual_rate = 0.08
    years = 10
    monthly_contribution = 500
    
    result_monthly = calc.calculate_annuity_monthly(
        principal, annual_rate/12, years*12, monthly_contribution
    )
    
    print(f"示例1 - 每月复利:")
    print(f"初始本金: ${principal:,.2f}")
    print(f"年利率: {annual_rate*100:.1f}%")
    print(f"投资年数: {years} 年")
    print(f"每月贡献: ${monthly_contribution}")
    print(f"最终金额: ${result_monthly:,.2f}")
    
    # 示例2：连续复利
    result_continuous = calc.calculate_annuity_continuous(principal, annual_rate, years)
    
    print(f"\n示例2 - 连续复利:")
    print(f"最终金额: ${result_continuous:,.2f}")
    print(f"差异: ${result_continuous - result_monthly:,.2f}")

def demo_mortgage_calculation():
    """演示抵押付款计算功能"""
    print("\n" + "="*50)
    print("演示：抵押付款计算功能")
    print("="*50)
    
    calc = FinancialCalculator()
    
    principal = 300000
    annual_rate = 0.045
    years = 30
    
    monthly_payment = calc.calculate_mortgage_payment(principal, annual_rate, years)
    total_payment = monthly_payment * years * 12
    total_interest = total_payment - principal
    
    print(f"贷款金额: ${principal:,.2f}")
    print(f"年利率: {annual_rate*100:.2f}%")
    print(f"贷款期限: {years} 年")
    print(f"每月付款: ${monthly_payment:,.2f}")
    print(f"总付款: ${total_payment:,.2f}")
    print(f"总利息: ${total_interest:,.2f}")

def demo_retirement_planning():
    """演示退休规划功能"""
    print("\n" + "="*50)
    print("演示：退休规划功能")
    print("="*50)
    
    calc = FinancialCalculator()
    
    initial_amount = 50000
    monthly_contribution = 1000
    annual_rate = 0.07
    years = 25
    
    result = calc.estimate_retirement_balance(
        initial_amount, monthly_contribution, annual_rate, years
    )
    
    total_contributed = initial_amount + (monthly_contribution * years * 12)
    investment_growth = result - total_contributed
    
    print(f"初始投资: ${initial_amount:,.2f}")
    print(f"每月贡献: ${monthly_contribution}")
    print(f"年回报率: {annual_rate*100:.1f}%")
    print(f"投资年数: {years} 年")
    print(f"总贡献: ${total_contributed:,.2f}")
    print(f"投资增长: ${investment_growth:,.2f}")
    print(f"退休时总金额: ${result:,.2f}")

def demo_doubling_time():
    """演示资金翻倍时间计算"""
    print("\n" + "="*50)
    print("演示：资金翻倍时间计算")
    print("="*50)
    
    calc = FinancialCalculator()
    
    rates = [0.03, 0.05, 0.07, 0.10, 0.12]
    
    print("不同利率下的资金翻倍时间:")
    print("-" * 40)
    for rate in rates:
        doubling_time = calc.calculate_doubling_time(rate)
        print(f"年利率 {rate*100:5.1f}%: {doubling_time:6.1f} 年 ({doubling_time*12:5.1f} 个月)")

def demo_logarithmic_equations():
    """演示对数方程求解"""
    print("\n" + "="*50)
    print("演示：对数方程求解")
    print("="*50)
    
    calc = FinancialCalculator()
    
    equations = [
        (2, 3),    # log_2(x) = 3
        (10, 2),   # log_10(x) = 2
        (3, 4),    # log_3(x) = 4
        (5, 2.5),  # log_5(x) = 2.5
    ]
    
    for base, result in equations:
        try:
            solution = calc.solve_logarithmic_equation(base, result)
            print(f"log_{base}(x) = {result} → x = {solution:.6f}")
        except ValueError as e:
            print(f"log_{base}(x) = {result} → 错误: {e}")

def demo_scientific_notation():
    """演示科学计数法转换"""
    print("\n" + "="*50)
    print("演示：科学计数法转换")
    print("="*50)
    
    calc = FinancialCalculator()
    
    numbers = [
        1234567890,
        0.00000000123,
        9876543210000,
        0.000000000000987,
        1.5,
        0.75
    ]
    
    print("数字转换为科学计数法:")
    print("-" * 40)
    for number in numbers:
        formatted = calc.format_scientific_notation(number)
        print(f"{number:20} → {formatted}")

def demo_investment_growth_chart():
    """演示投资增长图表"""
    print("\n" + "="*50)
    print("演示：投资增长图表")
    print("="*50)
    
    calc = FinancialCalculator()
    
    print("正在生成投资增长图表...")
    print("图表将显示在单独的窗口中")
    
    # 生成示例图表
    calc.plot_investment_growth(
        principal=10000,
        annual_rate=0.08,
        years=20,
        monthly_contribution=500
    )

def run_all_demos():
    """运行所有演示"""
    print("🚀 财务计算器功能演示")
    print("="*60)
    
    try:
        demo_annuity_calculations()
        demo_mortgage_calculation()
        demo_retirement_planning()
        demo_doubling_time()
        demo_logarithmic_equations()
        demo_scientific_notation()
        
        # 询问是否显示图表
        show_chart = input("\n是否显示投资增长图表？(y/n): ").strip().lower()
        if show_chart == 'y':
            demo_investment_growth_chart()
        
        print("\n✅ 所有演示完成！")
        
    except Exception as e:
        print(f"\n❌ 演示过程中出现错误: {e}")

def main():
    """主函数"""
    print("欢迎使用财务计算器演示！")
    print("本演示将展示计算器的各种功能")
    
    choice = input("\n是否运行完整演示？(y/n): ").strip().lower()
    
    if choice == 'y':
        run_all_demos()
    else:
        print("演示已取消")

if __name__ == "__main__":
    main()
