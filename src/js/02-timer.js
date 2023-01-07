import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const start = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

start.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
      start.disabled = true;
    }
    start.disabled = false;
    console.log(selectedDates[0]);
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

const picker = flatpickr(input, options);

start.addEventListener('click', () => {
  const update = setInterval(() => {
    const upToDate = new Date();
    const selected = new Date(input.value);
    const timer = selected - upToDate;

    start.disabled = true;

    if (timer >= 0) {
      const timeValue = convertMs(timer);
      days.textContent = timeValue.days.toString().padStart(2, '0');

      hours.textContent = timeValue.hours.toString().padStart(2, '0');

      minutes.textContent = timeValue.minutes.toString().padStart(2, '0');

      seconds.textContent = timeValue.seconds.toString().padStart(2, '0');
    }
  });
});
