import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let dateInputMl = 0;

const refs = {
  dataInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  timerNumber: document.querySelectorAll('.timer .field .value'),
};

refs.startBtn.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date().getTime() > selectedDates[0].getTime()) {
      Notify.failure('Please choose a date in the future');
      if (!refs.startBtn.hasAttribute('disabled')) {
        refs.startBtn.setAttribute('disabled', '');
      }
      return;
    }
    dateInputMl = selectedDates[0].getTime() - new Date().getTime();
    setTimeEl(convertMs(dateInputMl));
    refs.startBtn.removeAttribute('disabled', '');
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.dataInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setTimeEl(dateObj) {
  refs.dataDays.textContent = String(dateObj.days).padStart(2, '0');
  refs.dataHours.textContent = String(dateObj.hours).padStart(2, '0');
  refs.dataMinutes.textContent = String(dateObj.minutes).padStart(2, '0');
  refs.dataSeconds.textContent = String(dateObj.seconds).padStart(2, '0');
}

refs.startBtn.addEventListener('click', () => {
  refs.timerNumber.forEach(num => (num.style.color = 'yellow'));
  refs.startBtn.setAttribute('disabled', '');
  const index = setInterval(() => {
    if (dateInputMl < 1000) {
      clearInterval(index);
      return;
    }
    dateInputMl -= 1000;
    setTimeEl(convertMs(dateInputMl));
  }, 1000);
});
