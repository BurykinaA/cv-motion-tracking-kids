import React, { useEffect, useState } from 'react';

function StatusBar({ video }) {
  const [status, setStatus] = useState(0);

  useEffect(() => {
    let timeoutId;

    const handleTimeUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newStatus = parseInt((video.currentTime / video.duration) * 1000)/10;
        setStatus(newStatus);
      }, 100);
    };

    video && video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video && video.removeEventListener('timeupdate', handleTimeUpdate);
      clearTimeout(timeoutId);
    };
  }, [video]);

  const containerStyle = {
    position: 'relative',
    height: '474px',
  };

  const progressBarStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    backgroundColor: '#34D399',
    width: '40px',
    zIndex: '10',
    height: `${status}%`,
    transition: 'height 0.5s ease', // Добавляем переход для свойства height
  };

  const backgroundBarStyle = {
    width: '40px',
    height: '474px',
    borderWidth: '3px',
    borderColor: '#10B981',
    borderRadius: '9999px',
    position: 'relative',
    overflow: 'hidden', // Добавляем overflow: hidden, чтобы скрыть часть прогресс-бара внутри родительского контейнера
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundBarStyle}>
        <div style={progressBarStyle} />{console.log(status)}
      </div>
    </div>
  );
}

export default StatusBar;
