export const startCountdown = (initialSeconds, callback) => {
    let seconds = initialSeconds;
  
    const timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        callback(seconds);
      } else {
        clearInterval(timer);
      }
    }, 1000);
  
    return timer;
  };
  
  export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };
  