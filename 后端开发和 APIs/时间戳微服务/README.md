# 时间戳微服务

这是一个为 FreeCodeCamp 后端开发项目构建的时间戳微服务。

## 项目描述

构建一个全栈 JavaScript 应用程序，功能类似于 [https://timestamp-microservice.freecodecamp.rocks](https://timestamp-microservice.freecodecamp.rocks)。

## 功能特性

✅ **等待中:1. 提交自己的项目，而不是示例的 URL**

✅ **等待中:2. 向 /api/:date? 发送一个带有有效日期的请求，应该返回一个 JSON 对象，在这个 JSON 对象内有一个包含如 Thu, 01 Jan 1970 00:00:00 GMT 格式的输入日期的 utc 键。**

✅ **等待中:3. 向 /api/:date? 发送一个带有有效日期的请求，应该返回一个 JSON 对象，在这个 JSON 对象内有一个包含如 Thu, 01 Jan 1970 00:00:00 GMT 格式的输入日期的 utc 键。**

✅ **等待中:4. 向 /api/1451001600000 发送请求，应该返回 { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }。**

✅ **等待中:5. 程序能成功处理能被 new Date(date_string) 解析的日期。**

✅ **等待中:6. 如果输入日期字符串无效，API 返回一个具有结构 { error : "Invalid Date" } 的对象**

✅ **等待中:7. 如果传入的参数是空日期，将返回一个包含当前时间的 unix 键的 JSON 对象。**

✅ **等待中:8. 如果传入的参数是空日期，将返回一个包含当前时间的 utc 键的 JSON 对象。**

## API 端点

### 1. 获取当前时间
```
GET /api/
```
返回当前时间的 Unix 时间戳和 UTC 格式。

**响应示例：**
```json
{
  "unix": 1703462400000,
  "utc": "Mon, 25 Dec 2023 00:00:00 GMT"
}
```

### 2. 转换日期
```
GET /api/:date?
```
将日期字符串或 Unix 时间戳转换为标准格式。

**支持的日期格式：**
- ISO 日期字符串：`2023-12-25`
- 英文日期：`December 25, 2023`
- 日/月/年：`25/12/2023`
- Unix 时间戳：`1703462400000`

**响应示例：**
```json
{
  "unix": 1703462400000,
  "utc": "Mon, 25 Dec 2023 00:00:00 GMT"
}
```

### 3. 错误处理
如果日期无效，返回：
```json
{
  "error": "Invalid Date"
}
```

## 安装和运行

### 前提条件
- Node.js (版本 14 或更高)
- npm 或 yarn

### 安装步骤

1. 克隆或下载项目文件
2. 在项目目录中安装依赖：
   ```bash
   npm install
   ```

3. 启动服务器：
   ```bash
   npm start
   ```

4. 开发模式（自动重启）：
   ```bash
   npm run dev
   ```

5. 在浏览器中访问：`http://localhost:3000`

## 项目结构

```
时间戳微服务/
├── package.json          # 项目配置和依赖
├── server.js            # 主服务器文件
├── public/              # 静态文件
│   ├── index.html       # 主页面
│   ├── style.css        # 样式文件
│   └── script.js        # 前端脚本
└── README.md            # 项目说明
```

## 技术栈

- **后端：** Node.js, Express.js
- **前端：** HTML5, CSS3, JavaScript (ES6+)
- **依赖管理：** npm

## 测试用例

### 有效日期测试
- `/api/2023-12-25` - ISO 日期格式
- `/api/December 25, 2023` - 英文日期格式
- `/api/25/12/2023` - 日/月/年格式
- `/api/1703462400000` - Unix 时间戳

### 特殊测试
- `/api/` - 空参数，返回当前时间
- `/api/invalid-date` - 无效日期，返回错误

## 注意事项

- 时区转换不是本项目的目的，所有发送的有效日期都将被解析为 GMT 日期
- Unix 时间戳以毫秒为单位
- 使用 `new Date()` 解析日期字符串

## 许可证

MIT License

## 作者

FreeCodeCamp 学生项目
