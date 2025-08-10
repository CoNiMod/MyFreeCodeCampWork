const { spawn } = require('child_process');
const path = require('path');

// 设置测试环境
process.env.NODE_ENV = 'test';

// 启动测试
const test = spawn('npm', ['test'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

test.on('close', (code) => {
  process.exit(code);
});
