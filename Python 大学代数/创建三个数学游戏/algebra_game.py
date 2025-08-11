#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
代数练习游戏
用随机的整数值生成一步和两步的问题，玩家必须输入答案
"""

import random

class AlgebraGame:
    """代数练习游戏"""
    
    def __init__(self):
        self.score = 0
        self.level = 1
        self.max_level = 5
        
    def generate_one_step_problem(self):
        """生成一步代数问题"""
        operations = ['+', '-', '*', '/']
        op = random.choice(operations)
        
        if op == '+':
            b = random.randint(1, 20)
            x = random.randint(-15, 15)
            answer = x + b
            problem = f"x + {b} = {answer}"
        elif op == '-':
            b = random.randint(1, 20)
            x = random.randint(-15, 15)
            answer = x - b
            problem = f"x - {b} = {answer}"
        elif op == '*':
            a = random.randint(2, 10)
            x = random.randint(-10, 10)
            answer = a * x
            problem = f"{a}x = {answer}"
        else:  # 除法
            a = random.randint(2, 10)
            x = random.randint(-10, 10)
            answer = a * x
            problem = f"{answer} ÷ {a} = x"
        
        return problem, x
    
    def generate_two_step_problem(self):
        """生成两步代数问题"""
        # ax + b = c 形式
        a = random.randint(2, 10)
        b = random.randint(-15, 15)
        x = random.randint(-10, 10)
        c = a * x + b
        
        problem = f"{a}x + {b} = {c}"
        return problem, x
    
    def get_level_settings(self):
        """根据等级获取游戏设置"""
        if self.level == 1:
            return 3, "一步问题", [-10, 10]
        elif self.level == 2:
            return 4, "一步问题", [-15, 15]
        elif self.level == 3:
            return 5, "混合问题", [-20, 20]
        elif self.level == 4:
            return 6, "两步问题", [-25, 25]
        else:
            return 7, "两步问题", [-30, 30]
    
    def play_round(self):
        """玩一轮游戏"""
        problems_count, problem_type, number_range = self.get_level_settings()
        
        print(f"\n--- 等级 {self.level}: {problem_type} ---")
        print(f"数字范围: {number_range[0]} 到 {number_range[1]}")
        
        correct_answers = 0
        
        for i in range(problems_count):
            if problem_type == "一步问题" or (problem_type == "混合问题" and random.random() < 0.7):
                problem, answer = self.generate_one_step_problem()
            else:
                problem, answer = self.generate_two_step_problem()
            
            print(f"\n问题 {i+1}: {problem}")
            
            # 确保答案在合理范围内
            if abs(answer) > max(abs(number_range[0]), abs(number_range[1])):
                continue
            
            while True:
                try:
                    guess = input("x = ")
                    if guess.lower() == 'quit':
                        return 0
                    
                    guess = int(guess)
                    if guess == answer:
                        print("✓ 正确!")
                        correct_answers += 1
                        break
                    else:
                        print(f"✗ 错误! 正确答案是 {answer}")
                        break
                except ValueError:
                    print("请输入一个整数")
                except:
                    print("输入错误! 请重试")
        
        round_score = correct_answers / problems_count
        self.score += round_score
        
        print(f"\n本轮得分: {round_score:.1%}")
        print(f"总分: {self.score:.1f}")
        
        return round_score
    
    def play(self):
        """开始游戏"""
        print("=== 代数练习游戏 ===")
        print("规则: 解决代数问题，输入 x 的值")
        print("输入 'quit' 可以退出游戏")
        
        for level in range(1, self.max_level + 1):
            self.level = level
            
            round_score = self.play_round()
            
            if round_score == 0:  # 玩家选择退出
                break
                
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
    game = AlgebraGame()
    game.play()
