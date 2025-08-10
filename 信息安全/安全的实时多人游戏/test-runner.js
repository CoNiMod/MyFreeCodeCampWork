// 测试运行器 - 用于自动化测试
const { exec } = require('child_process');
const path = require('path');

console.log('🚀 启动安全的实时多人游戏测试...\n');

// 检查依赖
console.log('📦 检查依赖...');
exec('npm list --depth=0', (error, stdout, stderr) => {
  if (error) {
    console.log('❌ 依赖检查失败，正在安装...');
    installDependencies();
  } else {
    console.log('✅ 依赖已安装');
    startServer();
  }
});

function installDependencies() {
  console.log('📥 安装依赖...');
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ 依赖安装失败:', error.message);
      process.exit(1);
    }
    console.log('✅ 依赖安装完成');
    startServer();
  });
}

function startServer() {
  console.log('🚀 启动游戏服务器...');
  console.log('📍 游戏地址: http://localhost:3000');
  console.log('🧪 测试地址: http://localhost:3000/test');
  console.log('\n按 Ctrl+C 停止服务器\n');
  
  const server = exec('npm start', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ 服务器启动失败:', error.message);
      process.exit(1);
    }
  });
  
  server.stdout.pipe(process.stdout);
  server.stderr.pipe(process.stderr);
  
  // 处理进程退出
  process.on('SIGINT', () => {
    console.log('\n🛑 正在停止服务器...');
    server.kill('SIGINT');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 正在停止服务器...');
    server.kill('SIGTERM');
    process.exit(0);
  });
}
