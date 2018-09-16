const utils = {
  timeFormatter(time) {
    let minutes = Math.floor(time / 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let seconds = time - minutes * 60;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  },
  otherUtil(param) {
    return `Just another util. ${param}`;
  },
};

export default utils;
