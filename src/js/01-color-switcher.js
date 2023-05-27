const start = document.querySelector(`[data-start]`);
const stop = document.querySelector(`[data-stop]`);
const body = document.querySelector(`body`)
let timerId= null

start.addEventListener(`click`, () => {
      start.disabled = true;
      stop.disabled = false;
    timerId = setInterval(changeBodyColour, 1000);
    console.log(timerId);
})

stop.addEventListener(`click`, (() => {
    clearInterval(timerId);
    start.disabled = false;
    stop.disabled = true;
}))


function changeBodyColour(evt) {
    body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}