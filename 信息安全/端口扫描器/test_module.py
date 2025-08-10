#!/usr/bin/env python3
"""
端口扫描器单元测试模块
"""

import unittest
import port_scanner

class TestPortScanner(unittest.TestCase):
    """端口扫描器测试类"""
    
    def test_get_open_ports_basic(self):
        """测试基本的端口扫描功能"""
        # 测试IP地址扫描
        result = port_scanner.get_open_ports("209.216.230.240", [440, 445])
        self.assertIsInstance(result, list)
        
        # 测试域名扫描
        result = port_scanner.get_open_ports("www.stackoverflow.com", [79, 82])
        self.assertIsInstance(result, list)
    
    def test_get_open_ports_verbose(self):
        """测试详细模式输出"""
        result = port_scanner.get_open_ports("scanme.nmap.org", [20, 80], True)
        self.assertIsInstance(result, str)
        self.assertIn("Open ports for scanme.nmap.org", result)
        self.assertIn("PORT     SERVICE", result)
    
    def test_invalid_hostname(self):
        """测试无效主机名"""
        result = port_scanner.get_open_ports("invalid-hostname-12345", [80, 90])
        self.assertEqual(result, "Error: Invalid hostname")
    
    def test_invalid_ip_address(self):
        """测试无效IP地址"""
        result = port_scanner.get_open_ports("999.999.999.999", [80, 90])
        self.assertEqual(result, "Error: Invalid IP address")
    
    def test_ip_validation(self):
        """测试IP地址验证功能"""
        # 有效IP地址
        self.assertTrue(port_scanner.is_valid_ip("192.168.1.1"))
        self.assertTrue(port_scanner.is_valid_ip("10.0.0.1"))
        self.assertTrue(port_scanner.is_valid_ip("172.16.0.1"))
        
        # 无效IP地址
        self.assertFalse(port_scanner.is_valid_ip("256.1.2.3"))
        self.assertFalse(port_scanner.is_valid_ip("1.2.3.256"))
        self.assertFalse(port_scanner.is_valid_ip("1.2.3"))
        self.assertFalse(port_scanner.is_valid_ip("1.2.3.4.5"))
        self.assertFalse(port_scanner.is_valid_ip("abc.def.ghi.jkl"))
    
    def test_format_verbose_output(self):
        """测试详细输出格式化"""
        # 有开放端口的情况
        result = port_scanner.format_verbose_output("test.com", "192.168.1.1", [80, 443])
        expected_lines = [
            "Open ports for test.com (192.168.1.1)",
            "PORT     SERVICE",
            "80       http",
            "443      https"
        ]
        for line in expected_lines:
            self.assertIn(line, result)
        
        # 没有开放端口的情况
        result = port_scanner.format_verbose_output("test.com", "192.168.1.1", [])
        self.assertIn("Open ports for test.com (192.168.1.1)", result)
        self.assertIn("PORT     SERVICE", result)
    
    def test_port_range_handling(self):
        """测试端口范围处理"""
        # 测试单端口范围
        result = port_scanner.get_open_ports("127.0.0.1", [80, 80])
        self.assertIsInstance(result, list)
        
        # 测试多端口范围
        result = port_scanner.get_open_ports("127.0.0.1", [80, 85])
        self.assertIsInstance(result, list)
    
    def test_error_handling(self):
        """测试错误处理"""
        # 测试空端口范围
        with self.assertRaises(IndexError):
            port_scanner.get_open_ports("127.0.0.1", [])
        
        # 测试无效端口范围
        with self.assertRaises(IndexError):
            port_scanner.get_open_ports("127.0.0.1", [80])

def run_tests():
    """运行所有测试"""
    # 创建测试套件
    test_suite = unittest.TestLoader().loadTestsFromTestCase(TestPortScanner)
    
    # 运行测试
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(test_suite)
    
    # 返回测试结果
    return result.wasSuccessful()

if __name__ == "__main__":
    # 如果直接运行此文件，则执行测试
    success = run_tests()
    if success:
        print("\n✅ 所有测试通过!")
    else:
        print("\n❌ 部分测试失败!")
