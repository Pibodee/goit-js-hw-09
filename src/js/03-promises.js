import Notiflix, { Notify } from 'notiflix';

const delay = document.querySelector('input[name="delay"]');
const step = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const create = document.querySelector('button[type = "submit"]');

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}

create.addEventListener('click', evt => {
  evt.preventDefault();
  const firstDelay = Number(delay.value);
  const nextDelay = Number(step.value);
  for (let i = 0; i < amount.value; i++) {
    createPromise(i + 1, firstDelay + i * nextDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
