import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        reslove(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

const ref = {
  formEl: document.querySelector('.form'),
};

ref.formEl.addEventListener('submit', event => {
  event.preventDefault();

  const formElements = event.currentTarget.elements;

  let delay = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(res => Notify.success(res))
      .catch(rej => Notify.failure(rej));
    delay += step;
  }

  ref.formEl.reset();
});
