// 声明全局变量
let textInput, checkBtn, result, exampleBtns;

// 回文检测函数
function isPalindrome(str) {
    // 去除所有非字母数字字符，并转换为小写
    const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    // 如果清理后的字符串为空，返回false
    if (cleanStr.length === 0) {
        return false;
    }
    
    // 检查是否为回文
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}

// 显示结果函数 - 多种方式确保显示
function showResult(text, isPalindrome, hasError = false) {
    console.log('showResult called with:', text, isPalindrome, hasError);
    
    if (!result) {
        console.error('result element not found!');
        // 尝试重新获取元素
        result = document.getElementById('result');
        if (!result) {
            console.error('Still cannot find result element');
            return;
        }
    }
    
    // 方式1：使用textContent
    result.textContent = text;
    
    // 方式2：使用innerText作为备用
    if (result.textContent !== text) {
        result.innerText = text;
    }
    
    // 方式3：使用innerHTML作为最后备用
    if (result.textContent !== text && result.innerText !== text) {
        result.innerHTML = text;
    }
    
    // 移除所有现有的类
    result.classList.remove('palindrome', 'not-palindrome', 'error');
    
    // 添加相应的类
    if (hasError) {
        result.classList.add('error');
        console.log('Added error class, text should be:', text);
        // 错误情况下也显示弹窗提示
        alert(text);
    } else if (isPalindrome) {
        result.classList.add('palindrome');
    } else {
        result.classList.add('not-palindrome');
    }
    
    // 强制重绘
    result.style.display = 'none';
    result.offsetHeight; // 触发重排
    result.style.display = 'flex';
    
    console.log('Result element content after update:', result.textContent);
}

// 检测回文的主要函数
function checkPalindrome() {
    console.log('checkPalindrome called');
    
    if (!textInput || !result) {
        console.error('Elements not found in checkPalindrome');
        // 尝试重新获取元素
        textInput = document.getElementById('text-input');
        result = document.getElementById('result');
        if (!textInput || !result) {
            console.error('Cannot find required elements');
            return;
        }
    }
    
    const inputText = textInput.value.trim();
    console.log('Input text:', inputText, 'Length:', inputText.length);
    
    // 检查是否输入了值
    if (inputText === '' || inputText.length === 0) {
        console.log('Empty input detected, showing error message');
        
        // 弹窗提示
        alert('Please input a value');
        
        // 多种方式显示错误信息
        showResult('Please input a value', false, true);
        
        // 直接设置结果作为备用
        if (result) {
            result.textContent = 'Please input a value';
            result.className = 'result-display error';
        }
        
        return;
    }
    
    // 检测是否为回文
    const palindrome = isPalindrome(inputText);
    
    // 显示结果
    if (palindrome) {
        showResult(`${inputText} is a palindrome`, true);
    } else {
        showResult(`${inputText} is not a palindrome`, false);
    }
}

// 示例按钮点击事件
function handleExampleClick(event) {
    if (!textInput) return;
    
    const exampleText = event.target.getAttribute('data-text');
    textInput.value = exampleText;
    
    // 自动检测
    checkPalindrome();
}

// 键盘事件处理
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkPalindrome();
    }
}

// 初始化函数
function initializeApp() {
    console.log('Initializing app...');
    
    // 获取DOM元素
    textInput = document.getElementById('text-input');
    checkBtn = document.getElementById('check-btn');
    result = document.getElementById('result');
    exampleBtns = document.querySelectorAll('.example-btn');
    
    console.log('Found elements:', {
        textInput: !!textInput,
        checkBtn: !!checkBtn,
        result: !!result,
        exampleBtns: exampleBtns.length
    });
    
    // 检查元素是否存在
    if (!textInput || !checkBtn || !result) {
        console.error('必需的DOM元素未找到');
        console.error('textInput:', textInput);
        console.error('checkBtn:', checkBtn);
        console.error('result:', result);
        return;
    }
    
    // 事件监听器
    checkBtn.addEventListener('click', function(e) {
        console.log('Check button clicked!');
        e.preventDefault();
        checkPalindrome();
    });
    
    textInput.addEventListener('keypress', handleKeyPress);
    
    // 为每个示例按钮添加点击事件
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', handleExampleClick);
    });
    
    // 输入框内容变化时重置结果样式
    textInput.addEventListener('input', function() {
        if (this.value.trim() === '') {
            result.classList.remove('palindrome', 'not-palindrome', 'error');
            result.textContent = '输入文本并点击按钮开始检测';
        }
    });
    
    // 添加一些额外的交互功能
    textInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    textInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
    
    // 添加按钮点击动画
    checkBtn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    checkBtn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
    
    checkBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // 设置输入框焦点
    textInput.focus();
    
    // 显示初始提示
    showResult('输入文本并点击按钮开始检测', false, false);
    
    console.log('回文检测器初始化完成');
    
    // 测试空输入功能
    setTimeout(() => {
        console.log('Testing empty input functionality...');
        if (textInput && result) {
            textInput.value = '';
            checkPalindrome();
        }
    }, 1000);
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    initializeApp();
});

// 备用初始化方法
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded');
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    console.log('Document already loaded, initializing immediately');
    // 如果DOM已经加载完成，直接初始化
    initializeApp();
}

// 额外的备用方案：使用window.onload
window.addEventListener('load', function() {
    console.log('Window load event fired');
    if (!textInput || !checkBtn || !result) {
        console.log('Elements not found on window load, retrying...');
        initializeApp();
    }
});
