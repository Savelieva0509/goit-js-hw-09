// const timer = {
//     start() {
//         const startTime = Date.now();
        
//         setInterval(() => {
//             const currentTime = Date.now();
//             const ms = currentTime - startTime;
//             const { days, hours, minutes, seconds } = convertMs(ms);
//             // console.log(timeComponents);
//             console.log(`${days}: ${hours}: ${minutes}: ${seconds}`);
//         }, 1000);
//     },
// };

// timer.start()

// function pad(value) {
//     return String(value).padStart(2,'0')
// }

// function convertMs(time) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = pad(Math.floor(time / day));
//   // Remaining hours
//   const hours = pad(Math.floor((time % day)) / hour);
//   // Remaining minutes
//   const minutes = pad(Math.floor(((time % day)) % hour) / minute);
//   // Remaining seconds
//   const seconds = pad(Math.floor((((time % day)) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerRef = document.querySelector('.timer');

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');

let userDate = null;
let deadLine = null;
btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        deadLine = selectedDates[0].getTime()
        console.log(selectedDates[0]);
        if (selectedDates[0] < Date.now()) {
            btnStart.disabled = true;
            Notify.failure('Вибраний час у минулому', {
                position: 'center-center',
                backOverLay: true,
                clickToClose: true,
                closeButton: true,
            });
            userDate = new Date();
           
        } else { 
            btnStart.disabled = false;
            userDate = selectedDates[0];
        }
    },
};

const timer = {
    intervalId: null,
    refs: {},
    start(rootSelector, deadLine) {
        const delta = deadLine - Date.now();
        
        if (delta <= 0) {
            return;
        }
            Notify.success('Відлік почався');
            this.getRefs(rootSelector);
            this.intervalId = setInterval(() => {
            const ms = deadLine - Date.now(); 

            if (ms <= 1000) {
                clearInterval(this.intervalId);
                Notify.success('Дедлайн настав!', this.notifyOptions);
            }
        
            const data = this.convertMs(ms);
                Object.entries(data).forEach(([name, value]) => {
                    this.refs[name].textContent = this.pad(value);
                });

        // this.refs.days.textContent = this.pad(data.days);
        // this.refs.hours.textContent = this.pad(data.hours);
        // this.refs.minutes.textContent = this.pad(data.minutes);
        // this.refs.seconds.textContent = this.pad(data.seconds);
          
        },1000)
    },

    getRefs(rootSelector) {
        const arr = [...rootSelector.children]
        arr.forEach(item => {
            const { title } = item.dataset;
            this.refs[title] = item;
   
        })
        // this.refs.days = rootSelector.querySelector('[data-days]');
        // this.refs.hours = rootSelector.querySelector('[data-hours]');
        // this.refs.minutes = rootSelector.querySelector('[data-minutes]');
        // this.refs.seconds = rootSelector.querySelector('[data-seconds]');
    },
    
    convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;


  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
    },

    pad(value) {
    return String(value).padStart(2,'0')
}
};

    flatpickr(inputEl, options);
    btnStart.addEventListener('click', () => timer.start(timerRef, deadLine));
