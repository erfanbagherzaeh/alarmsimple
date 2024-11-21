// script.js

// Elements
const currentTimeEl = document.getElementById("currentTime");
const currentDateEl = document.getElementById("currentDate");
const alarmTimeInput = document.getElementById("alarmTime");
const setAlarmButton = document.getElementById("setAlarm");

let alarmTime = null;
let alarmInterval = null;

// Function to update the current time and date
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();

    currentTimeEl.textContent = `Current Time: ${timeString}`;
    currentDateEl.textContent = `Today's Date: ${dateString}`;
}

// Function to check if it's time for the alarm
function checkAlarm() {
    const now = new Date();
    if (alarmTime && now >= alarmTime) {
        triggerAlarm();
        alarmTime = null; // Reset alarm
        clearInterval(alarmInterval);
    }
}

// Function to trigger the alarm
function triggerAlarm() {
    // Flashing the date
    let flashCount = 0;
    const flashDateInterval = setInterval(() => {
        if (flashCount >= 20) {
            clearInterval(flashDateInterval);
            currentDateEl.style.animation = "";
        } else {
            currentDateEl.style.animation = "flashBackground 1s infinite";
            flashCount++;
        }
    }, 50);

    // Flashing the screen
    let flashScreenCount = 0;
    const flashScreenInterval = setInterval(() => {
        if (flashScreenCount >= 15) {
            clearInterval(flashScreenInterval);
            document.body.style.backgroundColor = "#f4f4f4"; // Reset background
        } else {
            document.body.style.backgroundColor =
                document.body.style.backgroundColor === "black" ? "white" : "black";
            flashScreenCount++;
        }
    }, 66); // Flash for 1 second total (15 flashes)
}

// Set Alarm Button Click Event
setAlarmButton.addEventListener("click", () => {
    const alarmDate = new Date(alarmTimeInput.value);
    if (alarmDate > new Date()) {
        alarmTime = alarmDate;
        alert("Alarm set for " + alarmDate.toLocaleString());
        if (!alarmInterval) {
            alarmInterval = setInterval(checkAlarm, 1000);
        }
    } else {
        alert("Please set a valid future time for the alarm.");
    }
});

// Start clock
setInterval(updateClock, 1000);
updateClock();
