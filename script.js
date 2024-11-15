// script.js

let startTime = 0;
let elapsedTime = 0;
let intervalID;
let isRunning = false;

const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPauseButton");
const lapsList = document.getElementById("laps");

// Format time into mm:ss:ms
function formatTime(ms) {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

// Update display
function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  display.textContent = formatTime(currentTime);
}

// Start/Pause function
function startPause() {
  if (!isRunning) {
    startTime = Date.now();
    intervalID = setInterval(updateDisplay, 10);
    startPauseButton.textContent = "Pause";
  } else {
    clearInterval(intervalID);
    elapsedTime += Date.now() - startTime;
    startPauseButton.textContent = "Start";
  }
  isRunning = !isRunning;
}

// Reset function
function reset() {
  clearInterval(intervalID);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00.00";
  startPauseButton.textContent = "Start";
  lapsList.innerHTML = ""; // Clear laps
}

// Record Lap function
function recordLap() {
  if (isRunning) {
    const currentTime = Date.now() - startTime + elapsedTime;
    const lapTime = formatTime(currentTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapsList.appendChild(lapItem);
  }
}
