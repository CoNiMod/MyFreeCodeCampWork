// 转换日期函数
async function convertDate() {
    const input = document.getElementById('dateInput').value.trim();
    const resultDiv = document.getElementById('result');
    
    if (!input) {
        // 如果没有输入，获取当前时间
        await testCurrentTime();
        return;
    }
    
    try {
        const response = await fetch(`/api/${encodeURIComponent(input)}`);
        const data = await response.json();
        
        if (data.error) {
            resultDiv.className = 'result-box error';
            resultDiv.innerHTML = `<p><strong>错误：</strong> ${data.error}</p>`;
        } else {
            resultDiv.className = 'result-box success';
            resultDiv.innerHTML = `
                <pre>{
  "unix": ${data.unix},
  "utc": "${data.utc}"
}</pre>
            `;
        }
    } catch (error) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = `<p><strong>请求错误：</strong> ${error.message}</p>`;
    }
}

// 测试获取当前时间
async function testCurrentTime() {
    const resultDiv = document.getElementById('result');
    
    try {
        const response = await fetch('/api/');
        const data = await response.json();
        
        resultDiv.className = 'result-box success';
        resultDiv.innerHTML = `
            <p><strong>当前时间：</strong></p>
            <pre>{
  "unix": ${data.unix},
  "utc": "${data.utc}"
}</pre>
        `;
    } catch (error) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = `<p><strong>请求错误：</strong> ${error.message}</p>`;
    }
}

// 测试日期转换
async function testDateConversion() {
    const resultDiv = document.getElementById('result');
    
    try {
        const response = await fetch('/api/2023-12-25');
        const data = await response.json();
        
        resultDiv.className = 'result-box success';
        resultDiv.innerHTML = `
            <p><strong>日期转换测试 (2023-12-25)：</strong></p>
            <pre>{
  "unix": ${data.unix},
  "utc": "${data.utc}"
}</pre>
        `;
    } catch (error) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = `<p><strong>请求错误：</strong> ${error.message}</p>`;
    }
}

// 测试时间戳转换
async function testTimestamp() {
    const resultDiv = document.getElementById('result');
    
    try {
        const response = await fetch('/api/1451001600000');
        const data = await response.json();
        
        resultDiv.className = 'result-box success';
        resultDiv.innerHTML = `
            <p><strong>时间戳转换测试 (1451001600000)：</strong></p>
            <pre>{
  "unix": ${data.unix},
  "utc": "${data.utc}"
}</pre>
        `;
    } catch (error) {
        resultDiv.className = 'result-box error';
        resultDiv.innerHTML = `<p><strong>请求错误：</strong> ${error.message}</p>`;
    }
}

// 回车键触发转换
document.getElementById('dateInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        convertDate();
    }
});

// 页面加载时显示当前时间
window.addEventListener('load', function() {
    testCurrentTime();
});
