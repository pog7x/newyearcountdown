"use strict";

const COUNTDOWN_REFRESH_MS = 1000;

const getNewYearDate = () => {
  const now = new Date();
  const year = now.getMonth() === 11 && now.getDate() === 31 && now.getHours() === 0
    ? now.getFullYear()
    : now.getFullYear() + 1;
  return new Date(`January 1, ${year} 00:00:00`);
};

const padNumber = (num, length = 2) => String(num).padStart(length, "0");

const calculateTimeDiff = (targetDate) => {
  const diff = Math.max(0, Math.floor((targetDate - Date.now()) / 1000));

  return {
    days: Math.floor(diff / 86400),
    hours: Math.floor((diff % 86400) / 3600),
    min: Math.floor((diff % 3600) / 60),
    sec: diff % 60,
    total: diff,
  };
};

const createCardHTML = (value, label) =>
  `<div class="countdown__card">
    <span class="countdown__value">${value}</span>
    <span class="countdown__label">${label}</span>
  </div>`;

const renderCountdown = (container, data) => {
  if (data.total <= 0) {
    container.innerHTML = `<p class="countdown__message">Happy New Year! 🎉</p>`;
    return false;
  }

  container.innerHTML =
    createCardHTML(padNumber(data.days, 3), "days") +
    createCardHTML(padNumber(data.hours), "hrs") +
    createCardHTML(padNumber(data.min), "min") +
    createCardHTML(padNumber(data.sec), "sec");

  return true;
};

const initCountdown = () => {
  const container = document.querySelector(".countdown");
  if (!container) return;

  const targetDate = getNewYearDate();

  const tick = () => {
    const data = calculateTimeDiff(targetDate);
    const shouldContinue = renderCountdown(container, data);

    if (shouldContinue) {
      setTimeout(tick, COUNTDOWN_REFRESH_MS);
    }
  };

  tick();
};

document.addEventListener("DOMContentLoaded", initCountdown);
