let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    startStopBtn.textContent = 'Start';
}

function lap() {
    if (isRunning) {
        const li = document.createElement('li');
        li.textContent = display.textContent;
        laps.appendChild(li);
    }
}

function updateDisplay() {
    const currentTime = elapsedTime + (Date.now() - startTime);
    const minutes = Math.floor(currentTime / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((currentTime % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((currentTime % 1000) / 10).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
