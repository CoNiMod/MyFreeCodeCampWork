const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 启用 CORS
app.use(cors());

// 解析 JSON 请求体
app.use(express.json());

// 静态文件服务
app.use(express.static('public'));

// 主页路由
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API 路由 - 处理日期参数
app.get('/api/:date?', (req, res) => {
  let date;
  
  // 如果没有提供日期参数，使用当前时间
  if (!req.params.date) {
    date = new Date();
  } else {
    // 检查是否是 Unix 时间戳（数字）
    const timestamp = parseInt(req.params.date);
    if (!isNaN(timestamp)) {
      date = new Date(timestamp);
    } else {
      // 尝试解析日期字符串
      date = new Date(req.params.date);
    }
  }
  
  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  
  // 返回格式化的响应
  const response = {
    unix: date.getTime(),
    utc: date.toUTCString()
  };
  
  res.json(response);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`时间戳微服务运行在端口 ${PORT}`);
  console.log(`访问 http://localhost:${PORT} 查看应用`);
  console.log(`API 端点: http://localhost:${PORT}/api/:date?`);
});
