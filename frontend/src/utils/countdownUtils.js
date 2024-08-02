import BackgroundTimer from 'react-native-background-timer';

// // 백그라운드에서 타이머를 설정
export const startCountdown = (initialSeconds, callback) => {
  let seconds = initialSeconds;

  // setInterval 대신 BackgroundTimer.setInterval 사용
  const timer = BackgroundTimer.setInterval(() => {
    if (seconds > 0) {
      seconds--;
      callback(seconds);
    } else {
      BackgroundTimer.clearInterval(timer);
    }
  }, 1000);

  return timer;
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
};
