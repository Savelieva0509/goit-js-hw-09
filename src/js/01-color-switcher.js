function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let colorChangeIntervalId = null;
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');


startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  document.body.style.backgroundColor = getRandomHexColor();
  colorChangeIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

   startBtn.disabled = true;
   stopBtn.disabled = false;
   
}

function onStopBtnClick() {
  clearInterval(colorChangeIntervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}