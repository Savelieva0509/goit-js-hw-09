import { Notify } from "notiflix";

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);
const input = document.querySelector('input');

function onInputValue(event) {
  let inputValue = event.currentTarget.value;
  console.log(inputValue);
 
  if (inputValue < 0) {
    inputValue = 0
    console.log('error');
  }
}

input.addEventListener('input',onInputValue )

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(event.currentTarget.delay.value);
  let step = Number(event.currentTarget.step.value);
  let amount = Number(event.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {

 const onSuccess = ({ position, delay }) => {
   setTimeout(() => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }, delay)
   
    }
    
const onError = ({ position, delay }) => {
  setTimeout(() => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }, delay)
}

createPromise(position, delay)
  .then(onSuccess)
  .catch(onError)
    
  delay += step;  
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay)
 
}



