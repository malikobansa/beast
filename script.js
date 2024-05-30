const bg = document.querySelector('.bg');
const counterElement = document.getElementById('counter');
const reset = document.getElementById('reset');
const targetDate = new Date('June 7, 2024 00:00:00').getTime();
const startDate = new Date().getTime();
const totalDuration = targetDate - startDate; // Total duration in milliseconds

function formatTime(seconds) {
    let days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;

    days = days < 10 ? '0' + days : days;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return `${days}D ${hours}H ${minutes}M ${seconds}S`;
}

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = Math.floor((targetDate - now) / 1000);
    const timeElapsed = now - startDate;
    const blurAmount = scale(timeElapsed, 0, totalDuration, 30, 0);

    if (timeLeft > 0) {
        counterElement.innerText = formatTime(timeLeft);
        bg.style.filter = `blur(${blurAmount}px)`;
    } else {
        counterElement.innerText = "00D 00H 00M 00S";
        bg.style.filter = "blur(0px)";
    }
}

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

setInterval(updateCountdown, 1000);

reset.addEventListener('click', () => {
    location.reload(); // Reload the page to reset the timer and blurring effect
});

updateCountdown();