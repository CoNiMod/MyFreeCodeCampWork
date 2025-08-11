#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
财务计算器 - Financial Calculator
实现以下功能：
1. 按每月增长率或连续增长率计算养老金
2. 计算每月抵押付款
3. 估计退休投资结余
4. 在给定增长率的情况下计算翻倍时间
5. 求解对数方程
6. 科学计数法转换
"""

import math
import matplotlib.pyplot as plt
import numpy as np
from typing import Tuple, Optional

class FinancialCalculator:
    """财务计算器主类"""
    
    def __init__(self):
        """初始化计算器"""
        self.pi = math.pi
        self.e = math.e
        
    def calculate_annuity_monthly(self, principal: float, monthly_rate: float, 
                                 months: int, monthly_contribution: float = 0) -> float:
        """
        计算每月复利的养老金
        
        Args:
            principal: 初始本金
            monthly_rate: 月利率（小数形式）
            months: 月数
            monthly_contribution: 每月额外贡献（可选）
            
        Returns:
            最终金额
        """
        if monthly_rate == 0:
            return principal + (monthly_contribution * months)
        
        # 使用复利公式：A = P(1 + r)^n + PMT * ((1 + r)^n - 1) / r
        future_value = principal * (1 + monthly_rate) ** months
        
        if monthly_contribution > 0:
            future_value += monthly_contribution * ((1 + monthly_rate) ** months - 1) / monthly_rate
            
        return future_value
    
    def calculate_annuity_continuous(self, principal: float, annual_rate: float, 
                                   years: float) -> float:
        """
        计算连续复利的养老金
        
        Args:
            principal: 初始本金
            annual_rate: 年利率（小数形式）
            years: 年数
            
        Returns:
            最终金额
        """
        return principal * math.exp(annual_rate * years)
    
    def calculate_mortgage_payment(self, principal: float, annual_rate: float, 
                                 years: int) -> float:
        """
        计算每月抵押付款
        
        Args:
            principal: 贷款金额
            annual_rate: 年利率（小数形式）
            years: 贷款年数
            
        Returns:
            每月付款金额
        """
        monthly_rate = annual_rate / 12
        total_payments = years * 12
        
        if monthly_rate == 0:
            return principal / total_payments
        
        # 抵押付款公式
        monthly_payment = principal * (monthly_rate * (1 + monthly_rate) ** total_payments) / \
                         ((1 + monthly_rate) ** total_payments - 1)
        
        return monthly_payment
    
    def estimate_retirement_balance(self, initial_amount: float, monthly_contribution: float,
                                  annual_rate: float, years: int) -> float:
        """
        估计退休投资结余
        
        Args:
            initial_amount: 初始投资金额
            monthly_contribution: 每月贡献
            annual_rate: 年回报率（小数形式）
            years: 投资年数
            
        Returns:
            退休时的总金额
        """
        monthly_rate = annual_rate / 12
        months = years * 12
        
        # 初始金额的未来价值
        future_initial = initial_amount * (1 + monthly_rate) ** months
        
        # 每月贡献的未来价值
        if monthly_contribution > 0:
            future_contributions = monthly_contribution * ((1 + monthly_rate) ** months - 1) / monthly_rate
        else:
            future_contributions = 0
            
        return future_initial + future_contributions
    
    def calculate_doubling_time(self, annual_rate: float) -> float:
        """
        计算资金翻倍所需时间
        
        Args:
            annual_rate: 年利率（小数形式）
            
        Returns:
            翻倍所需年数
        """
        if annual_rate <= 0:
            return float('inf')
        
        # 使用72法则的精确版本：t = ln(2) / r
        return math.log(2) / annual_rate
    
    def solve_logarithmic_equation(self, base: float, result: float) -> float:
        """
        求解对数方程 log_b(x) = y
        
        Args:
            base: 对数的底数
            result: 对数的结果
            
        Returns:
            方程的解 x
        """
        if base <= 0 or base == 1:
            raise ValueError("底数必须大于0且不等于1")
        
        if result <= 0:
            raise ValueError("结果必须大于0")
            
        return base ** result
    
    def convert_to_scientific_notation(self, number: float) -> Tuple[float, int]:
        """
        将数字转换为科学计数法
        
        Args:
            number: 要转换的数字
            
        Returns:
            (系数, 指数) 的元组，表示 n × 10^exponent
        """
        if number == 0:
            return (0, 0)
        
        # 计算指数
        exponent = math.floor(math.log10(abs(number)))
        
        # 计算系数
        coefficient = number / (10 ** exponent)
        
        # 四舍五入到合适的小数位数
        coefficient = round(coefficient, 10)
        
        return (coefficient, exponent)
    
    def convert_from_scientific_notation(self, coefficient: float, exponent: int) -> float:
        """
        从科学计数法转换回普通数字
        
        Args:
            coefficient: 系数
            exponent: 指数
            
        Returns:
            普通数字
        """
        return coefficient * (10 ** exponent)
    
    def format_scientific_notation(self, number: float) -> str:
        """
        格式化科学计数法显示
        
        Args:
            number: 要格式化的数字
            
        Returns:
            格式化的科学计数法字符串
        """
        if abs(number) < 0.0001 or abs(number) >= 10000:
            coeff, exp = self.convert_to_scientific_notation(number)
            return f"{coeff:.4g} × 10^{exp}"
        else:
            return f"{number:.4f}"
    
    def plot_investment_growth(self, principal: float, annual_rate: float, 
                              years: int, monthly_contribution: float = 0):
        """
        绘制投资增长图表
        
        Args:
            principal: 初始本金
            annual_rate: 年利率
            years: 年数
            monthly_contribution: 每月贡献
        """
        months = years * 12
        x_values = np.linspace(0, years, months + 1)
        y_values = []
        
        for month in range(months + 1):
            month_years = month / 12
            balance = self.calculate_annuity_monthly(
                principal, annual_rate/12, month, monthly_contribution
            )
            y_values.append(balance)
        
        plt.figure(figsize=(10, 6))
        plt.plot(x_values, y_values, 'b-', linewidth=2, label='投资余额')
        plt.axhline(y=principal, color='r', linestyle='--', alpha=0.7, label='初始本金')
        
        plt.xlabel('年数')
        plt.ylabel('金额 ($)')
        plt.title(f'投资增长图表\n年利率: {annual_rate*100:.2f}%, 初始本金: ${principal:,.2f}')
        plt.grid(True, alpha=0.3)
        plt.legend()
        plt.tight_layout()
        plt.show()
    
    def show_menu(self):
        """显示主菜单"""
        print("\n" + "="*50)
        print("           财务计算器 - Financial Calculator")
        print("="*50)
        print("1. 计算养老金 (每月复利)")
        print("2. 计算养老金 (连续复利)")
        print("3. 计算每月抵押付款")
        print("4. 估计退休投资结余")
        print("5. 计算资金翻倍时间")
        print("6. 求解对数方程")
        print("7. 科学计数法转换")
        print("8. 绘制投资增长图表")
        print("9. 退出")
        print("="*50)
    
    def run(self):
        """运行计算器主程序"""
        while True:
            self.show_menu()
            choice = input("\n请选择功能 (1-9): ").strip()
            
            try:
                if choice == '1':
                    self.calculate_annuity_monthly_menu()
                elif choice == '2':
                    self.calculate_annuity_continuous_menu()
                elif choice == '3':
                    self.calculate_mortgage_menu()
                elif choice == '4':
                    self.estimate_retirement_menu()
                elif choice == '5':
                    self.calculate_doubling_time_menu()
                elif choice == '6':
                    self.solve_logarithmic_menu()
                elif choice == '7':
                    self.scientific_notation_menu()
                elif choice == '8':
                    self.plot_investment_growth_menu()
                elif choice == '9':
                    print("\n感谢使用财务计算器！再见！")
                    break
                else:
                    print("\n❌ 无效选择，请输入 1-9 之间的数字")
                    
            except ValueError as e:
                print(f"\n❌ 输入错误: {e}")
            except Exception as e:
                print(f"\n❌ 计算错误: {e}")
            
            input("\n按回车键继续...")
    
    def calculate_annuity_monthly_menu(self):
        """养老金计算菜单 (每月复利)"""
        print("\n--- 养老金计算 (每月复利) ---")
        principal = float(input("请输入初始本金 ($): "))
        annual_rate = float(input("请输入年利率 (%): ")) / 100
        years = int(input("请输入投资年数: "))
        monthly_contribution = float(input("请输入每月额外贡献 ($，0表示无): "))
        
        monthly_rate = annual_rate / 12
        months = years * 12
        
        result = self.calculate_annuity_monthly(principal, monthly_rate, months, monthly_contribution)
        total_contributed = principal + (monthly_contribution * months)
        interest_earned = result - total_contributed
        
        print(f"\n📊 计算结果:")
        print(f"初始本金: ${principal:,.2f}")
        print(f"总贡献: ${total_contributed:,.2f}")
        print(f"利息收入: ${interest_earned:,.2f}")
        print(f"最终金额: ${result:,.2f}")
    
    def calculate_annuity_continuous_menu(self):
        """养老金计算菜单 (连续复利)"""
        print("\n--- 养老金计算 (连续复利) ---")
        principal = float(input("请输入初始本金 ($): "))
        annual_rate = float(input("请输入年利率 (%): ")) / 100
        years = float(input("请输入投资年数: "))
        
        result = self.calculate_annuity_continuous(principal, annual_rate, years)
        interest_earned = result - principal
        
        print(f"\n📊 计算结果:")
        print(f"初始本金: ${principal:,.2f}")
        print(f"利息收入: ${interest_earned:,.2f}")
        print(f"最终金额: ${result:,.2f}")
    
    def calculate_mortgage_menu(self):
        """抵押付款计算菜单"""
        print("\n--- 抵押付款计算 ---")
        principal = float(input("请输入贷款金额 ($): "))
        annual_rate = float(input("请输入年利率 (%): ")) / 100
        years = int(input("请输入贷款年数: "))
        
        monthly_payment = self.calculate_mortgage_payment(principal, annual_rate, years)
        total_payment = monthly_payment * years * 12
        total_interest = total_payment - principal
        
        print(f"\n📊 计算结果:")
        print(f"贷款金额: ${principal:,.2f}")
        print(f"年利率: {annual_rate*100:.2f}%")
        print(f"贷款期限: {years} 年")
        print(f"每月付款: ${monthly_payment:,.2f}")
        print(f"总付款: ${total_payment:,.2f}")
        print(f"总利息: ${total_interest:,.2f}")
    
    def estimate_retirement_menu(self):
        """退休投资结余估计菜单"""
        print("\n--- 退休投资结余估计 ---")
        initial_amount = float(input("请输入初始投资金额 ($): "))
        monthly_contribution = float(input("请输入每月贡献 ($): "))
        annual_rate = float(input("请输入年回报率 (%): ")) / 100
        years = int(input("请输入投资年数: "))
        
        result = self.estimate_retirement_balance(initial_amount, monthly_contribution, annual_rate, years)
        total_contributed = initial_amount + (monthly_contribution * years * 12)
        investment_growth = result - total_contributed
        
        print(f"\n📊 计算结果:")
        print(f"初始投资: ${initial_amount:,.2f}")
        print(f"总贡献: ${total_contributed:,.2f}")
        print(f"投资增长: ${investment_growth:,.2f}")
        print(f"退休时总金额: ${result:,.2f}")
    
    def calculate_doubling_time_menu(self):
        """资金翻倍时间计算菜单"""
        print("\n--- 资金翻倍时间计算 ---")
        annual_rate = float(input("请输入年利率 (%): ")) / 100
        
        doubling_time = self.calculate_doubling_time(annual_rate)
        
        if doubling_time == float('inf'):
            print("\n❌ 利率必须大于0才能计算翻倍时间")
        else:
            print(f"\n📊 计算结果:")
            print(f"年利率: {annual_rate*100:.2f}%")
            print(f"资金翻倍时间: {doubling_time:.2f} 年")
            print(f"资金翻倍时间: {doubling_time*12:.1f} 个月")
    
    def solve_logarithmic_menu(self):
        """对数方程求解菜单"""
        print("\n--- 对数方程求解 ---")
        print("求解方程: log_b(x) = y")
        base = float(input("请输入底数 b: "))
        result = float(input("请输入结果 y: "))
        
        try:
            solution = self.solve_logarithmic_equation(base, result)
            print(f"\n📊 计算结果:")
            print(f"方程: log_{base}(x) = {result}")
            print(f"解: x = {solution}")
            print(f"验证: log_{base}({solution}) = {math.log(solution, base):.6f}")
        except ValueError as e:
            print(f"\n❌ 错误: {e}")
    
    def scientific_notation_menu(self):
        """科学计数法转换菜单"""
        print("\n--- 科学计数法转换 ---")
        print("1. 转换为科学计数法")
        print("2. 从科学计数法转换")
        
        sub_choice = input("请选择 (1-2): ").strip()
        
        if sub_choice == '1':
            number = float(input("请输入要转换的数字: "))
            coeff, exp = self.convert_to_scientific_notation(number)
            formatted = self.format_scientific_notation(number)
            
            print(f"\n📊 转换结果:")
            print(f"原数字: {number}")
            print(f"科学计数法: {coeff} × 10^{exp}")
            print(f"格式化显示: {formatted}")
            
        elif sub_choice == '2':
            coeff = float(input("请输入系数: "))
            exp = int(input("请输入指数: "))
            number = self.convert_from_scientific_notation(coeff, exp)
            
            print(f"\n📊 转换结果:")
            print(f"科学计数法: {coeff} × 10^{exp}")
            print(f"普通数字: {number}")
        else:
            print("❌ 无效选择")
    
    def plot_investment_growth_menu(self):
        """投资增长图表菜单"""
        print("\n--- 投资增长图表 ---")
        principal = float(input("请输入初始本金 ($): "))
        annual_rate = float(input("请输入年利率 (%): ")) / 100
        years = int(input("请输入投资年数: "))
        monthly_contribution = float(input("请输入每月贡献 ($，0表示无): "))
        
        self.plot_investment_growth(principal, annual_rate, years, monthly_contribution)

def main():
    """主函数"""
    print("欢迎使用财务计算器！")
    print("正在初始化...")
    
    try:
        calculator = FinancialCalculator()
        calculator.run()
    except KeyboardInterrupt:
        print("\n\n程序被用户中断")
    except Exception as e:
        print(f"\n程序出现错误: {e}")

if __name__ == "__main__":
    main()
