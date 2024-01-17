import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; 

const CountdownTimer = () => {
  const [initialTime, setInitialTime] = useState(0); 
  const [time, setTime] = useState(0); // Current time in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setIsActive(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartStop = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const handleReset = () => {
    setTime(0);
    setInitialTime(0);
    setIsActive(false);
  };

  const handleInputChange = (event) => {
    const inputTime = event.target.value;
    const [hours, minutes, seconds] = inputTime.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    setInitialTime(isNaN(totalSeconds) ? 0 : totalSeconds);
    setTime(isNaN(totalSeconds) ? 0 : totalSeconds);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formatNumber = (number) => (number < 10 ? `0${number}` : number);

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(remainingSeconds)}`;
  };

  return (
    <div className="countdown-timer">
      <h1>Countdown Timer</h1>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="controls">
        <label>
          Set Time (HH:MM:SS):
          <input type="text" placeholder="00:00:00" value={formatTime(initialTime)} onChange={handleInputChange} />
        </label>
        <button onClick={handleStartStop}>{isActive ? 'Stop' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;
