function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const background = document.querySelector('body');

const start = document.querySelector('button[data-start]');
const stop = document.querySelector('button[data-stop]');

let timerId = null;

start.addEventListener('click', () => {
    timerId = setInterval(() => {
        background.style.backgroundColor = getRandomHexColor()
    }, 1000);
    start.disabled = true;
    stop.disabled = false;
})

stop.addEventListener('click', () => {
    clearInterval(timerId);
    start.disabled = false;
    stop.disabled = true;
})