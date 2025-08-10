import React, { useState, useEffect } from 'react';
import './App.css';

// 预设的引语数据
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  }
];

function App() {
  const [currentQuote, setCurrentQuote] = useState({ text: "", author: "" });

  // 获取随机引语的函数
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  // 生成新引语的函数
  const handleNewQuote = () => {
    setCurrentQuote(getRandomQuote());
  };

  // 组件加载时获取第一个随机引语
  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  // 构建Twitter分享链接
  const tweetUrl = `https://twitter.com/intent/tweet?text="${encodeURIComponent(currentQuote.text)}" - ${encodeURIComponent(currentQuote.author)}`;

  return (
    <div className="App">
      <div id="quote-box">
        <div id="text">
          "{currentQuote.text}"
        </div>
        <div id="author">
          - {currentQuote.author}
        </div>
        <div className="buttons">
          <button id="new-quote" onClick={handleNewQuote}>
            New Quote
          </button>
          <a 
            id="tweet-quote" 
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet Quote
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
