const timerDisplay = document.getElementById('timer-display');
const sessionDisplay = document.getElementById('session');
const startButton = document.getElementById('start-button');

const autumnColors = ['#BF7757', '#F0A830', '#F4DDBF', '#D38865'];

let countdown;
let isRunning = false;
let currentSession = 1;

function startTimer(duration) {
    let seconds = duration * 60;

    countdown = setInterval(function () {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        document.body.style.backgroundColor = autumnColors[currentSession - 1];
        seconds--;

        if (seconds < 0) {
            clearInterval(countdown);
            notifyComplete();
        }
    }, 1000);
}

function notifyComplete() {
    sessionDisplay.textContent = `Session ${currentSession} Complete!`;
    startButton.style.display = 'none';
    setTimeout(() => {
        sessionDisplay.textContent = `Session ${currentSession + 1}`;
        startButton.style.display = 'block';
        document.body.style.backgroundColor = autumnColors[currentSession % autumnColors.length];
        currentSession++;
    }, 2000);
}

startButton.addEventListener('click', function () {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause';
        startTimer(25); // Adjust the time duration as needed
    } else {
        isRunning = false;
        startButton.textContent = 'Resume';
        clearInterval(countdown);
    }
});
