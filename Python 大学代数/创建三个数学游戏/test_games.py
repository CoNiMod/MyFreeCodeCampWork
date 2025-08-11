#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
三个数学游戏测试文件
"""

import unittest
from unittest.mock import patch, MagicMock
import sys
import os

# 添加当前目录到路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

class TestScatterPlotGame(unittest.TestCase):
    """测试散点图游戏"""
    
    def setUp(self):
        from scatter_plot_game import ScatterPlotGame
        self.game = ScatterPlotGame()
    
    def test_level_settings(self):
        """测试等级设置"""
        xmin, xmax, ymin, ymax, points = self.game.get_level_settings()
        self.assertEqual(self.game.level, 1)
        self.assertEqual(xmin, -5)
        self.assertEqual(xmax, 5)
        self.assertEqual(ymin, -5)
        self.assertEqual(ymax, 5)
        self.assertEqual(points, 3)
    
    def test_score_initialization(self):
        """测试分数初始化"""
        self.assertEqual(self.game.score, 0)


class TestAlgebraGame(unittest.TestCase):
    """测试代数练习游戏"""
    
    def setUp(self):
        from algebra_game import AlgebraGame
        self.game = AlgebraGame()
    
    def test_one_step_problem_generation(self):
        """测试一步问题生成"""
        problem, answer = self.game.generate_one_step_problem()
        self.assertIsInstance(problem, str)
        self.assertIsInstance(answer, int)
    
    def test_two_step_problem_generation(self):
        """测试两步问题生成"""
        problem, answer = self.game.generate_two_step_problem()
        self.assertIsInstance(problem, str)
        self.assertIsInstance(answer, int)
        self.assertIn('x', problem)


class TestProjectileGame(unittest.TestCase):
    """测试弹射游戏"""
    
    def setUp(self):
        from projectile_game import ProjectileGame
        self.game = ProjectileGame()
    
    def test_trajectory_calculation(self):
        """测试轨迹计算"""
        x_values = [0, 1, 2]
        y_values = self.game.calculate_trajectory(-0.5, 5, 10, x_values)
        self.assertEqual(len(y_values), 3)
        self.assertEqual(y_values[0], 10)  # 在x=0时，y=c
    
    def test_collision_detection(self):
        """测试碰撞检测"""
        # 测试不撞墙的情况
        no_collision = self.game.check_collision(-0.1, 10, 15, 20, 10)
        self.assertFalse(no_collision)
        
        # 测试撞墙的情况
        collision = self.game.check_collision(-0.5, 5, 10, 20, 15)
        self.assertTrue(collision)


def run_tests():
    """运行所有测试"""
    print("🧪 开始运行测试...")
    
    # 创建测试套件
    test_suite = unittest.TestSuite()
    
    # 添加测试类
    test_suite.addTest(unittest.makeSuite(TestScatterPlotGame))
    test_suite.addTest(unittest.makeSuite(TestAlgebraGame))
    test_suite.addTest(unittest.makeSuite(TestProjectileGame))
    
    # 运行测试
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(test_suite)
    
    # 显示结果
    print(f"\n📊 测试结果:")
    print(f"运行测试: {result.testsRun}")
    print(f"失败: {len(result.failures)}")
    print(f"错误: {len(result.errors)}")
    
    if result.failures:
        print("\n❌ 失败的测试:")
        for test, traceback in result.failures:
            print(f"  - {test}")
    
    if result.errors:
        print("\n❌ 错误的测试:")
        for test, traceback in result.errors:
            print(f"  - {test}")
    
    if not result.failures and not result.errors:
        print("\n✅ 所有测试通过!")
    
    return result.wasSuccessful()


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
