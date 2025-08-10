import socket
import re
from common_ports import ports_and_services

def get_open_ports(target, port_range, verbose=False):
    """
    扫描指定目标主机的端口范围，返回开放端口列表或详细描述
    
    Args:
        target (str): 目标主机，可以是URL或IP地址
        port_range (list): 端口范围，包含起始和结束端口
        verbose (bool): 是否返回详细模式，默认为False
    
    Returns:
        list or str: 开放端口列表或详细描述字符串
    """
    try:
        # 验证IP地址格式
        if is_valid_ip(target):
            ip_address = target
            hostname = target
        else:
            # 尝试解析URL
            try:
                ip_address = socket.gethostbyname(target)
                hostname = target
            except socket.gaierror:
                return "Error: Invalid hostname"
        
        # 验证IP地址是否有效
        if not is_valid_ip(ip_address):
            return "Error: Invalid IP address"
        
        # 扫描端口
        open_ports = []
        start_port, end_port = port_range[0], port_range[1]
        
        for port in range(start_port, end_port + 1):
            try:
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(1)  # 设置超时时间为1秒
                result = sock.connect_ex((ip_address, port))
                if result == 0:
                    open_ports.append(port)
                sock.close()
            except:
                pass
        
        if verbose:
            return format_verbose_output(hostname, ip_address, open_ports)
        else:
            return open_ports
            
    except Exception as e:
        return f"Error: {str(e)}"

def is_valid_ip(ip):
    """
    验证IP地址格式是否有效
    
    Args:
        ip (str): 要验证的IP地址
    
    Returns:
        bool: 如果IP地址格式有效返回True，否则返回False
    """
    # IPv4地址正则表达式
    ipv4_pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
    if not re.match(ipv4_pattern, ip):
        return False
    
    # 检查每个数字是否在0-255范围内
    parts = ip.split('.')
    for part in parts:
        if not (0 <= int(part) <= 255):
            return False
    
    return True

def format_verbose_output(hostname, ip_address, open_ports):
    """
    格式化详细输出
    
    Args:
        hostname (str): 主机名
        ip_address (str): IP地址
        open_ports (list): 开放端口列表
    
    Returns:
        str: 格式化的详细输出字符串
    """
    if not open_ports:
        return f"Open ports for {hostname} ({ip_address})\nPORT     SERVICE\n"
    
    output = f"Open ports for {hostname} ({ip_address})\n"
    output += "PORT     SERVICE\n"
    
    for port in open_ports:
        service = ports_and_services.get(port, "unknown")
        output += f"{port:<8} {service}\n"
    
    return output.rstrip()
