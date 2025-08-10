import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [display, setDisplay] = useState('');
  
  // 鼓垫数据配置
  const drumPads = [
    { id: 'Q', key: 'Q', audio: 'Heater-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
    { id: 'W', key: 'W', audio: 'Heater-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
    { id: 'E', key: 'E', audio: 'Heater-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
    { id: 'A', key: 'A', audio: 'Heater-4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
    { id: 'S', key: 'S', audio: 'Clap', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
    { id: 'D', key: 'D', audio: 'Open-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
    { id: 'Z', key: 'Z', audio: 'Kick-n\'-Hat', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
    { id: 'X', key: 'X', audio: 'Kick', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
    { id: 'C', key: 'C', audio: 'Closed-HH', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
  ];

  // 播放音频的函数
  const playAudio = (audioId) => {
    const audio = document.getElementById(audioId);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  // 处理鼓垫点击
  const handleDrumPadClick = (drumPad) => {
    playAudio(drumPad.id);
    setDisplay(drumPad.audio);
  };

  // 处理键盘事件
  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      const drumPad = drumPads.find(pad => pad.key === key);
      if (drumPad) {
        playAudio(drumPad.id);
        setDisplay(drumPad.audio);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="App">
      <div id="drum-machine">
        <div id="display">{display}</div>
        <div className="drum-pads-container">
          {drumPads.map((drumPad) => (
            <div
              key={drumPad.id}
              className="drum-pad"
              id={drumPad.id}
              onClick={() => handleDrumPadClick(drumPad)}
            >
              {drumPad.key}
              <audio
                className="clip"
                id={drumPad.id}
                src={drumPad.src}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
