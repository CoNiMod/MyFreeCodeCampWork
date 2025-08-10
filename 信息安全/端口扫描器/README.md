# 端口扫描器

这是一个用Python编写的端口扫描器，可以扫描指定主机的端口范围，检测哪些端口是开放的。

## 功能特性

- 支持IP地址和域名作为扫描目标
- 可指定端口范围进行扫描
- 提供详细模式输出，显示端口对应的服务名称
- 包含错误处理，对无效的主机名和IP地址给出明确提示
- 支持超时设置，避免长时间等待

## 文件结构

```
端口扫描器/
├── port_scanner.py      # 主要的端口扫描器代码
├── common_ports.py      # 常见端口和服务名称字典
├── main.py             # 测试程序
├── test_module.py      # 单元测试
└── README.md           # 项目说明文档
```

## 使用方法

### 基本用法

```python
import port_scanner

# 扫描IP地址的端口范围
result = port_scanner.get_open_ports("209.216.230.240", [440, 445])

# 扫描域名的端口范围
result = port_scanner.get_open_ports("www.stackoverflow.com", [79, 82])
```

### 详细模式

```python
# 启用详细模式，返回格式化的字符串
result = port_scanner.get_open_ports("scanme.nmap.org", [20, 80], True)
```

详细模式输出示例：
```
Open ports for scanme.nmap.org (45.33.32.156)
PORT     SERVICE
22       ssh
80       http
```

## 函数说明

### `get_open_ports(target, port_range, verbose=False)`

主要扫描函数，接受以下参数：

- `target` (str): 目标主机，可以是URL或IP地址
- `port_range` (list): 端口范围，包含起始和结束端口
- `verbose` (bool): 是否启用详细模式，默认为False

返回值：
- 普通模式：返回开放端口列表 `[port1, port2, ...]`
- 详细模式：返回格式化的字符串描述

### 错误处理

- 无效主机名：返回 `"Error: Invalid hostname"`
- 无效IP地址：返回 `"Error: Invalid IP address"`

## 运行测试

### 运行主程序测试

```bash
python main.py
```

### 运行单元测试

```bash
python test_module.py
```

或者使用Python的unittest模块：

```bash
python -m unittest test_module.py -v
```

## 技术实现

- 使用Python的`socket`模块进行TCP连接测试
- 设置1秒超时时间，提高扫描效率
- 支持IPv4地址格式验证
- 使用正则表达式验证IP地址格式
- 包含常见端口和服务名称的映射

## 注意事项

1. 端口扫描可能被某些防火墙或安全软件阻止
2. 请确保只扫描你有权限测试的主机
3. 某些网络环境可能限制端口扫描活动
4. 建议在测试环境中使用，避免在生产环境中进行大规模扫描

## 依赖要求

- Python 3.6+
- 标准库模块：`socket`, `re`

## 许可证

本项目遵循MIT许可证。

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！
