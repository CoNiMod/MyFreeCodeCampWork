import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [timerLabel, setTimerLabel] = useState('Session');
  
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // 格式化时间为 mm:ss 格式
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 处理休息时间减少
  const handleBreakDecrement = () => {
    if (!isRunning && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  // 处理休息时间增加
  const handleBreakIncrement = () => {
    if (!isRunning && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  // 处理工作时间减少
  const handleSessionDecrement = () => {
    if (!isRunning && sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeft((sessionLength - 1) * 60);
    }
  };

  // 处理工作时间增加
  const handleSessionIncrement = () => {
    if (!isRunning && sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft((sessionLength + 1) * 60);
    }
  };

  // 开始/停止计时器
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  // 重置计时器
  const handleReset = () => {
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setIsSession(true);
    setTimerLabel('Session');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // 计时器逻辑
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // 播放提示音
            if (audioRef.current) {
              audioRef.current.play();
            }
            
            // 切换模式
            if (isSession) {
              // 从工作时间切换到休息时间
              setIsSession(false);
              setTimerLabel('Break');
              return breakLength * 60;
            } else {
              // 从休息时间切换到工作时间
              setIsSession(true);
              setTimerLabel('Session');
              return sessionLength * 60;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isSession, breakLength, sessionLength]);

  // 当sessionLength改变时更新timeLeft
  useEffect(() => {
    if (!isRunning && isSession) {
      setTimeLeft(sessionLength * 60);
    }
  }, [sessionLength, isRunning, isSession]);

  return (
    <div className="App">
      <div className="pomodoro-clock">
        <h1>Pomodoro Clock</h1>
        
        {/* 长度控制区域 */}
        <div className="length-controls">
          <div className="break-controls">
            <div id="break-label">Break Length</div>
            <div className="controls">
              <button 
                id="break-decrement" 
                onClick={handleBreakDecrement}
                className="control-btn"
              >
                -
              </button>
              <span id="break-length" className="length-display">
                {breakLength}
              </span>
              <button 
                id="break-increment" 
                onClick={handleBreakIncrement}
                className="control-btn"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="session-controls">
            <div id="session-label">Session Length</div>
            <div className="controls">
              <button 
                id="session-decrement" 
                onClick={handleSessionDecrement}
                className="control-btn"
              >
                -
              </button>
              <span id="session-length" className="length-display">
                {sessionLength}
              </span>
              <button 
                id="session-increment" 
                onClick={handleSessionIncrement}
                className="control-btn"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 计时器显示区域 */}
        <div className="timer-display">
          <div id="timer-label" className="timer-label">
            {timerLabel}
          </div>
          <div id="time-left" className="time-left">
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="timer-controls">
          <button 
            id="start_stop" 
            onClick={handleStartStop}
            className="control-btn start-stop"
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button 
            id="reset" 
            onClick={handleReset}
            className="control-btn reset"
          >
            Reset
          </button>
        </div>

        {/* 音频元素 */}
        <audio 
          id="beep" 
          ref={audioRef}
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
        />
      </div>
    </div>
  );
}

export default App;
