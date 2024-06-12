import React, { useState, useEffect } from 'react';

const Timer = ({ variable, endCall }) => {
  const [isActive, setIsActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    let timerId;

    const startTimer = () => {
      timerId = setInterval(() => {
        setCallDuration(prevDuration => prevDuration + 1);
        if (callDuration >= 3600) { // Si se alcanza una hora
          stopTimer();
          endCall(); // Ejecutar la función endCall
        } else if (callDuration >= 3300 && !isRed) { // 3300 segundos = 55 minutos
          setIsRed(true);
        }
      }, 1000);
    };

    const stopTimer = () => {
      clearInterval(timerId);
    };

    if (isActive) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => clearInterval(timerId);
  }, [isActive, callDuration, isRed, endCall]);

  useEffect(() => {
    setIsActive(variable);
  }, [variable]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    if (hours > 0) {
      return (
        <div className={isRed ? "call-timer-red" : "call-timer"}>
          {hours.toString().padStart(2, '0')}:
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </div>
      );
    } else {
      return (
        <div className={isRed ? "call-timer-red" : "call-timer"}>
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </div>
      );
    }
  };

  return (
    <div>
      {formatTime(callDuration)}
    </div>
  );
};

export default Timer;
