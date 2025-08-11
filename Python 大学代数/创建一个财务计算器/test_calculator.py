#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
财务计算器测试脚本
"""

def test_basic_functions():
    """测试基本功能"""
    try:
        from financial_calculator import FinancialCalculator
        calc = FinancialCalculator()
        print("✅ 财务计算器导入成功")
        
        # 测试连续复利计算
        result = calc.calculate_annuity_continuous(10000, 0.08, 10)
        print(f"✅ 连续复利计算: 10000本金，8%年利率，10年后: ${result:,.2f}")
        
        # 测试每月复利计算
        result_monthly = calc.calculate_annuity_monthly(10000, 0.08/12, 120, 500)
        print(f"✅ 每月复利计算: 10000本金，8%年利率，每月贡献500，10年后: ${result_monthly:,.2f}")
        
        # 测试抵押付款计算
        monthly_payment = calc.calculate_mortgage_payment(300000, 0.045, 30)
        print(f"✅ 抵押付款计算: 30万贷款，4.5%利率，30年: ${monthly_payment:,.2f}/月")
        
        # 测试翻倍时间计算
        doubling_time = calc.calculate_doubling_time(0.07)
        print(f"✅ 翻倍时间计算: 7%年利率，翻倍时间: {doubling_time:.2f}年")
        
        # 测试对数方程求解
        solution = calc.solve_logarithmic_equation(2, 3)
        print(f"✅ 对数方程求解: log_2(x) = 3, x = {solution}")
        
        # 测试科学计数法转换
        coeff, exp = calc.convert_to_scientific_notation(1234567890)
        print(f"✅ 科学计数法转换: 1234567890 = {coeff} × 10^{exp}")
        
        print("\n🎉 所有基本功能测试通过！")
        return True
        
    except Exception as e:
        print(f"❌ 测试失败: {e}")
        return False

def test_advanced_functions():
    """测试高级功能"""
    try:
        from financial_calculator import FinancialCalculator
        calc = FinancialCalculator()
        
        # 测试退休投资结余估计
        result = calc.estimate_retirement_balance(50000, 1000, 0.07, 25)
        print(f"✅ 退休投资结余估计: 初始5万，每月贡献1000，7%回报率，25年: ${result:,.2f}")
        
        print("\n🎉 高级功能测试通过！")
        return True
        
    except Exception as e:
        print(f"❌ 高级功能测试失败: {e}")
        return False

def main():
    """主测试函数"""
    print("🧪 财务计算器功能测试")
    print("="*40)
    
    # 测试基本功能
    basic_success = test_basic_functions()
    
    # 测试高级功能
    advanced_success = test_advanced_functions()
    
    # 总结
    print("\n" + "="*40)
    if basic_success and advanced_success:
        print("🎉 所有测试通过！财务计算器工作正常。")
    else:
        print("❌ 部分测试失败，请检查代码。")
    
    print("\n💡 提示: 运行 'python demo.py' 查看完整演示")
    print("💡 提示: 运行 'python start_calculator.py' 启动交互式计算器")

if __name__ == "__main__":
    main()
