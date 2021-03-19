const timeEl = document.querySelector(".timer-time");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".timer-reset");
const circle = document.querySelector("circle");

let time;
let countdownID;
let ringID;

const resetTimer = function () {
  timeEl.value = "";
  time = undefined;
  clearInterval(countdownID);
  clearInterval(ringID);
  circle.setAttribute("stroke-dashoffset", 0);
};

const getTime = function (e) {
  time = e.target.value;
};

const startRingCountdown = function () {
  let strokeOffset = parseFloat(circle.getAttribute("stroke-dashoffset"));
  let timerTime = timeEl.value;
  const tick = 1257 / timerTime;

  ringID = setInterval(() => {
    if (time === 1) clearInterval(ringID);
    circle.setAttribute("stroke-dashoffset", (strokeOffset -= tick));
  }, 1000);
};

const startCountdown = function () {
  if (isNaN(time)) {
    resetTimer();
    return;
  }
  startRingCountdown();

  countdownID = setInterval(() => {
    time--;
    timeEl.value = time;
    if (time === 0) {
      timeEl.value = "Fin";
      clearInterval(countdownID);
    }
  }, 1000);
};

const pauseCountdown = function () {
  clearInterval(countdownID);
  clearInterval(ringID);
};

timeEl.addEventListener("change", getTime);
playBtn.addEventListener("click", startCountdown);
pauseBtn.addEventListener("click", pauseCountdown);
resetBtn.addEventListener("click", resetTimer);
