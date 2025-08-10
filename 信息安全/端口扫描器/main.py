#!/usr/bin/env python3
"""
端口扫描器测试程序
用于测试 port_scanner.py 中的功能
"""

import port_scanner

def main():
    """主测试函数"""
    print("端口扫描器测试程序")
    print("=" * 50)
    
    # 测试1: 扫描IP地址的端口范围
    print("\n测试1: 扫描IP地址 209.216.230.240 的端口 440-445")
    try:
        result = port_scanner.get_open_ports("209.216.230.240", [440, 445])
        print(f"结果: {result}")
    except Exception as e:
        print(f"错误: {e}")
    
    # 测试2: 扫描域名的端口范围
    print("\n测试2: 扫描域名 www.stackoverflow.com 的端口 79-82")
    try:
        result = port_scanner.get_open_ports("www.stackoverflow.com", [79, 82])
        print(f"结果: {result}")
    except Exception as e:
        print(f"错误: {e}")
    
    # 测试3: 详细模式扫描
    print("\n测试3: 详细模式扫描 scanme.nmap.org 的端口 20-80")
    try:
        result = port_scanner.get_open_ports("scanme.nmap.org", [20, 80], True)
        print("结果:")
        print(result)
    except Exception as e:
        print(f"错误: {e}")
    
    # 测试4: 无效主机名
    print("\n测试4: 测试无效主机名")
    try:
        result = port_scanner.get_open_ports("invalid-hostname-12345", [80, 90])
        print(f"结果: {result}")
    except Exception as e:
        print(f"错误: {e}")
    
    # 测试5: 无效IP地址
    print("\n测试5: 测试无效IP地址")
    try:
        result = port_scanner.get_open_ports("999.999.999.999", [80, 90])
        print(f"结果: {result}")
    except Exception as e:
        print(f"错误: {e}")
    
    # 测试6: 本地主机扫描
    print("\n测试6: 扫描本地主机 localhost 的端口 80-90")
    try:
        result = port_scanner.get_open_ports("localhost", [80, 90])
        print(f"结果: {result}")
    except Exception as e:
        print(f"错误: {e}")
    
    print("\n" + "=" * 50)
    print("测试完成!")

if __name__ == "__main__":
    main()
