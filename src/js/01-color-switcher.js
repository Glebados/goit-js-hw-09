const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let bgcTimer = null;

btnStartEl.addEventListener('click', onChangeColor);
btnStopEl.addEventListener('click', offChangeColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
console.log(bodyEl.style.backgroundColor);
function onChangeColor() {
  btnStartEl.setAttribute('disabled', 'true');
  btnStopEl.removeAttribute('disabled');
  bgcTimer = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function offChangeColor() {
  btnStartEl.removeAttribute('disabled');
  btnStopEl.setAttribute('disabled', 'true');
  clearInterval(bgcTimer);
}
