import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const start = document.querySelector(`[data-start]`);
const input = document.querySelector('#datetime-picker');

const data = {
  days: document.querySelector(`[data-days]`),
  hours: document.querySelector(`[data-hours]`),
  minutes: document.querySelector(`[data-minutes]`),
  seconds: document.querySelector(`[data-seconds]`),
};

start.disabled = true;
let difference = 0;
const timerSeconds = 1000;

function updateFormat(days, hours, minutes, seconds) {
  data.days.textContent = days.toString().padStart(2, '0');
  data.hours.textContent = hours.toString().padStart(2, '0');
  data.minutes.textContent = minutes.toString().padStart(2, '0');
  data.seconds.textContent = seconds.toString().padStart(2, '0');
}

function timeToWrite() {
  let timerId = setInterval(() => {
    difference = difference - timerSeconds;
    const { days, hours, minutes, seconds } = convertMs(difference);
    updateFormat(days, hours, minutes, seconds);
    if (difference < timerSeconds) {
      clearInterval(timerId);
    }
  }, 1000);
}

start.addEventListener('click', () => {
  timeToWrite();
  start.disabled = true;
  Notiflix.Notify.success('The countdown begins');
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const defaultDate = options.defaultDate;

    difference = selectedDate - defaultDate;

    if (difference > 0) {
      start.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};
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

flatpickr(input, options);
