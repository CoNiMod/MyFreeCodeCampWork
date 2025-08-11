def arithmetic_arranger(problems, show_answers=False):
    """
    将算术问题格式化为垂直排列的形式
    
    Args:
        problems (list): 算术问题字符串列表
        show_answers (bool): 是否显示答案，默认为False
    
    Returns:
        str: 格式化后的字符串或错误信息
    """
    
    # 检查问题数量限制
    if len(problems) > 5:
        return 'Error: Too many problems.'
    
    # 存储每行的内容
    first_line = []
    second_line = []
    dash_line = []
    answer_line = []
    
    for problem in problems:
        # 分割问题字符串
        parts = problem.split()
        
        # 检查格式是否正确
        if len(parts) != 3:
            return 'Error: Invalid problem format.'
        
        num1, operator, num2 = parts
        
        # 检查操作符
        if operator not in ['+', '-']:
            return "Error: Operator must be '+' or '-'."
        
        # 检查数字是否只包含数字
        if not num1.isdigit() or not num2.isdigit():
            return 'Error: Numbers must only contain digits.'
        
        # 检查数字长度
        if len(num1) > 4 or len(num2) > 4:
            return 'Error: Numbers cannot be more than four digits.'
        
        # 计算最大宽度
        max_width = max(len(num1), len(num2)) + 2
        
        # 格式化第一行（第一个数字）
        first_line.append(num1.rjust(max_width))
        
        # 格式化第二行（操作符和第二个数字）
        second_line.append(operator + ' ' + num2.rjust(max_width - 2))
        
        # 格式化破折号行
        dash_line.append('-' * max_width)
        
        # 如果需要显示答案
        if show_answers:
            if operator == '+':
                answer = int(num1) + int(num2)
            else:
                answer = int(num1) - int(num2)
            answer_line.append(str(answer).rjust(max_width))
    
    # 组合所有行
    result = '    '.join(first_line) + '\n'
    result += '    '.join(second_line) + '\n'
    result += '    '.join(dash_line)
    
    # 如果需要显示答案，添加答案行
    if show_answers:
        result += '\n' + '    '.join(answer_line)
    
    return result


def test_arithmetic_arranger():
    """测试算术格式化器函数"""
    
    print("测试算术格式化器函数...\n")
    
    # 测试1: 基本格式化，不显示答案
    print("测试1: arithmetic_arranger(['3801 - 2', '123 + 49'])")
    result1 = arithmetic_arranger(["3801 - 2", "123 + 49"])
    print("结果:")
    print(result1)
    print("\n期望结果:")
    print("3801      123\n-    2    +  49\n------    -----")
    print("-" * 50)
    
    # 测试2: 基本格式化，不显示答案
    print("\n测试2: arithmetic_arranger(['1 + 2', '1 - 9380'])")
    result2 = arithmetic_arranger(["1 + 2", "1 - 9380"])
    print("结果:")
    print(result2)
    print("\n期望结果:")
    print("1         1\n+ 2    - 9380\n---    ------")
    print("-" * 50)
    
    # 测试3: 四个问题，不显示答案
    print("\n测试3: arithmetic_arranger(['3 + 855', '3801 - 2', '45 + 43', '123 + 49'])")
    result3 = arithmetic_arranger(["3 + 855", "3801 - 2", "45 + 43", "123 + 49"])
    print("结果:")
    print(result3)
    print("\n期望结果:")
    print("3      3801      45      123\n+ 855    -    2    + 43    +  49\n-----    ------    ----    -----")
    print("-" * 50)
    
    # 测试4: 五个问题，不显示答案
    print("\n测试4: arithmetic_arranger(['11 + 4', '3801 - 2999', '1 + 2', '123 + 49', '1 - 9380'])")
    result4 = arithmetic_arranger(["11 + 4", "3801 - 2999", "1 + 2", "123 + 49", "1 - 9380"])
    print("结果:")
    print(result4)
    print("\n期望结果:")
    print("11      3801      1      123         1\n+  4    - 2999    + 2    +  49    - 9380\n----    ------    ---    -----    ------")
    print("-" * 50)
    
    # 测试5: 太多问题（错误情况）
    print("\n测试5: arithmetic_arranger(['44 + 815', '909 - 2', '45 + 43', '123 + 49', '888 + 40', '653 + 87'])")
    result5 = arithmetic_arranger(["44 + 815", "909 - 2", "45 + 43", "123 + 49", "888 + 40", "653 + 87"])
    print("结果:", result5)
    print("期望结果: Error: Too many problems.")
    print("-" * 50)
    
    # 测试6: 无效操作符（错误情况）
    print("\n测试6: arithmetic_arranger(['3 / 855', '3801 - 2', '45 + 43', '123 + 49'])")
    result6 = arithmetic_arranger(["3 / 855", "3801 - 2", "45 + 43", "123 + 49"])
    print("结果:", result6)
    print("期望结果: Error: Operator must be '+' or '-'.")
    print("-" * 50)
    
    # 测试7: 数字超过四位（错误情况）
    print("\n测试7: arithmetic_arranger(['24 + 85215', '3801 - 2', '45 + 43', '123 + 49'])")
    result7 = arithmetic_arranger(["24 + 85215", "3801 - 2", "45 + 43", "123 + 49"])
    print("结果:", result7)
    print("期望结果: Error: Numbers cannot be more than four digits.")
    print("-" * 50)
    
    # 测试8: 数字包含非数字字符（错误情况）
    print("\n测试8: arithmetic_arranger(['98 + 3g5', '3801 - 2', '45 + 43', '123 + 49'])")
    result8 = arithmetic_arranger(["98 + 3g5", "3801 - 2", "45 + 43", "123 + 49"])
    print("结果:", result8)
    print("期望结果: Error: Numbers must only contain digits.")
    print("-" * 50)
    
    # 测试9: 显示答案
    print("\n测试9: arithmetic_arranger(['3 + 855', '988 + 40'], True)")
    result9 = arithmetic_arranger(["3 + 855", "988 + 40"], True)
    print("结果:")
    print(result9)
    print("\n期望结果:")
    print("3      988\n+ 855    +  40\n-----    -----\n  858     1028")
    print("-" * 50)
    
    # 测试10: 五个问题，显示答案
    print("\n测试10: arithmetic_arranger(['32 - 698', '1 - 3801', '45 + 43', '123 + 49', '988 + 40'], True)")
    result10 = arithmetic_arranger(["32 - 698", "1 - 3801", "45 + 43", "123 + 49", "988 + 40"], True)
    print("结果:")
    print(result10)
    print("\n期望结果:")
    print("32         1      45      123      988\n- 698    - 3801    + 43    +  49    +  40\n-----    ------    ----    -----    -----\n -666     -3800      88      172     1028")
    print("-" * 50)


def main():
    """主程序：演示算术格式化器的使用"""
    
    print("算术格式化器演示")
    print("=" * 50)
    
    # 示例1: 基本格式化，不显示答案
    print("\n示例1: 基本格式化（不显示答案）")
    problems1 = ["32 + 698", "3801 - 2", "45 + 43", "123 + 49"]
    print("输入:", problems1)
    result1 = arithmetic_arranger(problems1)
    print("输出:")
    print(result1)
    
    # 示例2: 显示答案
    print("\n" + "=" * 50)
    print("示例2: 显示答案")
    problems2 = ["32 + 8", "1 - 3801", "9999 + 9999", "523 - 49"]
    print("输入:", problems2)
    result2 = arithmetic_arranger(problems2, True)
    print("输出:")
    print(result2)
    
    # 示例3: 错误情况演示
    print("\n" + "=" * 50)
    print("示例3: 错误情况演示")
    
    # 太多问题
    print("\n错误1: 太多问题")
    problems_error1 = ["44 + 815", "909 - 2", "45 + 43", "123 + 49", "888 + 40", "653 + 87"]
    print("输入:", problems_error1)
    result_error1 = arithmetic_arranger(problems_error1)
    print("输出:", result_error1)
    
    # 无效操作符
    print("\n错误2: 无效操作符")
    problems_error2 = ["3 / 855", "3801 - 2", "45 + 43", "123 + 49"]
    print("输入:", problems_error2)
    result_error2 = arithmetic_arranger(problems_error2)
    print("输出:", result_error2)
    
    # 数字超过四位
    print("\n错误3: 数字超过四位")
    problems_error3 = ["24 + 85215", "3801 - 2", "45 + 43", "123 + 49"]
    print("输入:", problems_error3)
    result_error3 = arithmetic_arranger(problems_error3)
    print("输出:", result_error3)
    
    # 数字包含非数字字符
    print("\n错误4: 数字包含非数字字符")
    problems_error4 = ["98 + 3g5", "3801 - 2", "45 + 43", "123 + 49"]
    print("输入:", problems_error4)
    result_error4 = arithmetic_arranger(problems_error4)
    print("输出:", result_error4)
    
    print("\n" + "=" * 50)
    print("演示完成！")


def run_tests():
    """运行所有测试"""
    test_arithmetic_arranger()


if __name__ == "__main__":
    print("算术格式化器项目")
    print("=" * 50)
    print("选择运行模式:")
    print("1. 运行演示程序")
    print("2. 运行所有测试")
    print("3. 退出")
    
    while True:
        try:
            choice = input("\n请输入选择 (1-3): ").strip()
            
            if choice == '1':
                print("\n" + "=" * 50)
                main()
                break
            elif choice == '2':
                print("\n" + "=" * 50)
                run_tests()
                break
            elif choice == '3':
                print("退出程序")
                break
            else:
                print("无效选择，请输入 1、2 或 3")
        except KeyboardInterrupt:
            print("\n\n程序被用户中断")
            break
        except Exception as e:
            print(f"发生错误: {e}")
            break
