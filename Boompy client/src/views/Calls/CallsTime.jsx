import React, { useState, useEffect } from 'react';

const Timer = ({ variable, endCall }) => {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    let timerId;

    const calculateTimeRemaining = () => {
      // Obtener la hora de expiración de la cookie 'classEndTime'
      const classEndTimeString = document.cookie.replace(/(?:(?:^|.*;\s*)classEndTime\s*=\s*([^;]*).*$)|^.*$/, "$1");
      const classEndTime = new Date(classEndTimeString);

      // Calcular el tiempo restante en segundos
      const currentTime = new Date();
      const timeDifferenceSeconds = Math.floor((classEndTime - currentTime) / 1000);

      return timeDifferenceSeconds;
    };

    const startTimer = () => {
      timerId = setInterval(() => {
        const remaining = calculateTimeRemaining();
        setTimeRemaining(remaining);

        if (remaining <= 0) {
          stopTimer();
          endCall(); // Ejecutar la función endCall cuando se alcance la hora de finalización
        } else if (remaining <= 3300 && !isRed) { // 3300 segundos = 55 minutos
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
  }, [isActive, isRed, endCall]);

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
      {formatTime(timeRemaining)}
    </div>
  );
};

export default Timer;
