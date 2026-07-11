function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
  }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


function setRing(el, percent) {
  if (!el) return;
  const p = Math.max(0, Math.min(100, percent));
  el.setAttribute('stroke-dasharray', p + ' 100');
}

function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}



const dashboard = document.getElementById('dashboard');
const featureViews = Array.from(document.querySelectorAll('.feature-view'));
let activeFeature = null;
let isTransitioning = false;

function openFeature(name) {
  if (isTransitioning || activeFeature === name) return;
  isTransitioning = true;
  dashboard.style.display = 'none';
  featureViews.forEach((view) => {
    view.classList.toggle('active', view.dataset.feature === name);
  });
  activeFeature = name;
  if (name === 'planner') renderPlannerSlots();
  window.setTimeout(() => { isTransitioning = false; }, 250);
}

function closeFeature() {
  if (isTransitioning) return;
  isTransitioning = true;
  featureViews.forEach((view) => view.classList.remove('active'));
  dashboard.style.display = '';
  activeFeature = null;
  window.setTimeout(() => { isTransitioning = false; }, 250);
}

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', () => openFeature(card.dataset.feature));
});
document.querySelectorAll('[data-back]').forEach((btn) => {
  btn.addEventListener('click', closeFeature);
});


const timeText = document.getElementById('timeText');
const dateText = document.getElementById('dateText');
const bgLayer = document.getElementById('bgLayer');
const periodLabel = document.getElementById('periodLabel');
const brandProgress = document.querySelector('.brand-mark-progress');

const DATE_FMT = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };

function periodForHour(hour) {
  if (hour >= 5 && hour < 12) return { key: 'morning', label: 'Morning session' };
  if (hour >= 12 && hour < 17) return { key: 'afternoon', label: 'Afternoon session' };
  if (hour >= 17 && hour < 21) return { key: 'evening', label: 'Evening session' };
  return { key: 'night', label: 'Night session' };
}

function tickClock() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  timeText.textContent = `${h12}:${m} ${ampm}`;
  dateText.textContent = now.toLocaleDateString(undefined, DATE_FMT);

  const period = periodForHour(h);
  bgLayer.className = 'bg-layer period-' + period.key;
  periodLabel.textContent = period.label;

  const dayProgress = Math.max(0, Math.min(100, ((h - 6) * 60 + now.getMinutes()) / (17 * 60) * 100));
  if (brandProgress) setRing(brandProgress, dayProgress);
}

const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  saveJSON('pd_theme_raw', theme);
  localStorage.setItem('pd_theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

const TODO_KEY = 'pd_todos';
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const todoEmpty = document.getElementById('todoEmpty');
const todoCount = document.getElementById('todoCount');
const todoMeta = document.getElementById('todoMeta');
const todoRing = document.querySelector('[data-ring="todo"]');

let todos = loadJSON(TODO_KEY, []);

function renderTodos() {
  todoList.innerHTML = todos.map((t) => `
    <li class="task-item ${t.done ? 'done' : ''} ${t.important ? 'important' : ''}" data-id="${t.id}">
      <button class="task-check" data-action="toggle" aria-label="Mark complete">
        <svg viewBox="0 0 16 16" width="11" height="11"><path fill="none" stroke="#0b1a18" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M2 8.5l3.5 3.5 8-8"/></svg>
      </button>
      <span class="task-text">${escapeHTML(t.text)}</span>
      <button class="task-star" data-action="important" aria-label="Mark important">
        <svg viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L6 21l1.6-7L2.2 9.2l7.1-.6L12 2z"/></svg>
      </button>
      <button class="task-delete" data-action="delete" aria-label="Delete task">
        <svg viewBox="0 0 24 24" width="15" height="15"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14"/></svg>
      </button>
    </li>
  `).join('');

  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  todoEmpty.classList.toggle('visible', total === 0);
  todoCount.textContent = `${total} task${total === 1 ? '' : 's'}`;
  todoMeta.textContent = total === 0 ? 'No tasks yet' : `${done} of ${total} done`;
  setRing(todoRing, total === 0 ? 0 : (done / total) * 100);

  saveJSON(TODO_KEY, todos);
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  todos.unshift({ id: uid(), text, done: false, important: false });
  todoInput.value = '';
  renderTodos();
});

todoList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const li = e.target.closest('.task-item');
  const id = li.dataset.id;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  if (btn.dataset.action === 'toggle') todo.done = !todo.done;
  if (btn.dataset.action === 'important') todo.important = !todo.important;
  if (btn.dataset.action === 'delete') todos = todos.filter((t) => t.id !== id);

  renderTodos();
});

const PLANNER_KEY = 'pd_planner';
const slotList = document.getElementById('slotList');
const plannerCount = document.getElementById('plannerCount');
const plannerMeta = document.getElementById('plannerMeta');

let plannerData = loadJSON(PLANNER_KEY, {});
const PLANNER_START_HOUR = 6;
const PLANNER_END_HOUR = 22; // inclusive

function formatHour(h) {
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:00 ${ampm}`;
}

function renderPlannerSlots() {
  const currentHour = new Date().getHours();
  let html = '';
  for (let h = PLANNER_START_HOUR; h <= PLANNER_END_HOUR; h++) {
    const val = plannerData[h] || '';
    html += `
      <div class="slot-row ${h === currentHour ? 'current' : ''}" data-hour="${h}">
        <span class="slot-time">${formatHour(h)}</span>
        <input class="slot-input" type="text" maxlength="120" placeholder="Nothing planned" value="${escapeHTML(val)}">
      </div>
    `;
  }
  slotList.innerHTML = html;
  updatePlannerMeta();
}

const savePlannerDebounced = debounce(() => saveJSON(PLANNER_KEY, plannerData), 400);

slotList.addEventListener('input', (e) => {
  const input = e.target.closest('.slot-input');
  if (!input) return;
  const hour = input.closest('.slot-row').dataset.hour;
  const val = input.value.trim();
  if (val) plannerData[hour] = val; else delete plannerData[hour];
  savePlannerDebounced();
  updatePlannerMeta();
});

function updatePlannerMeta() {
  const filled = Object.keys(plannerData).length;
  plannerCount.textContent = `${filled} planned`;
  const currentHour = new Date().getHours();
  const now = plannerData[currentHour];
  plannerMeta.textContent = filled === 0 ? 'Plan your hours' : (now ? `Now: ${now}` : `${filled} hour${filled === 1 ? '' : 's'} planned`);
}

const GOALS_KEY = 'pd_goals';
const goalForm = document.getElementById('goalForm');
const goalInput = document.getElementById('goalInput');
const goalsList = document.getElementById('goalsList');
const goalsEmpty = document.getElementById('goalsEmpty');
const goalsCount = document.getElementById('goalsCount');
const goalsMeta = document.getElementById('goalsMeta');
const goalsProgressFill = document.getElementById('goalsProgressFill');
const goalsRing = document.querySelector('[data-ring="goals"]');

let goals = loadJSON(GOALS_KEY, []);

function renderGoals() {
  goalsList.innerHTML = goals.map((g) => `
    <li class="task-item ${g.done ? 'done' : ''}" data-id="${g.id}">
      <button class="task-check" data-action="toggle" aria-label="Mark complete">
        <svg viewBox="0 0 16 16" width="11" height="11"><path fill="none" stroke="#0b1a18" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" d="M2 8.5l3.5 3.5 8-8"/></svg>
      </button>
      <span class="task-text">${escapeHTML(g.text)}</span>
      <button class="task-delete" data-action="delete" aria-label="Delete goal">
        <svg viewBox="0 0 24 24" width="15" height="15"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 6h16M9 6V4h6v2M6 6l1 14h10l1-14"/></svg>
      </button>
    </li>
  `).join('');

  const total = goals.length;
  const done = goals.filter((g) => g.done).length;
  goalsEmpty.classList.toggle('visible', total === 0);
  goalsCount.textContent = `${done} of ${total}`;
  goalsMeta.textContent = total === 0 ? "Set today's goals" : `${done} of ${total} complete`;
  const pct = total === 0 ? 0 : (done / total) * 100;
  goalsProgressFill.style.width = pct + '%';
  setRing(goalsRing, pct);

  saveJSON(GOALS_KEY, goals);
}

goalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = goalInput.value.trim();
  if (!text) return;
  goals.push({ id: uid(), text, done: false });
  goalInput.value = '';
  renderGoals();
});

goalsList.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const li = e.target.closest('.task-item');
  const id = li.dataset.id;
  const goal = goals.find((g) => g.id === id);
  if (!goal) return;

  if (btn.dataset.action === 'toggle') goal.done = !goal.done;
  if (btn.dataset.action === 'delete') goals = goals.filter((g) => g.id !== id);

  renderGoals();
});

const timerTime = document.getElementById('timerTime');
const timerLabel = document.getElementById('timerLabel');
const timerRingFill = document.getElementById('timerRingFill');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const skipBtn = document.getElementById('skipBtn');
const timerModes = document.getElementById('timerModes');
const pomodoroSessionLabel = document.getElementById('pomodoroSessionLabel');
const pomodoroMeta = document.getElementById('pomodoroMeta');
const pomodoroRing = document.querySelector('[data-ring="pomodoro"]');

let workMinutes = 25;
const BREAK_MINUTES_MAP = { 25: 5, 45: 10, 50: 10 };
let sessionType = 'work'; // 'work' | 'break'
let totalSeconds = workMinutes * 60;
let secondsLeft = totalSeconds;
let intervalId = null;
let isRunning = false;

function currentSessionMinutes() {
  return sessionType === 'work' ? workMinutes : (BREAK_MINUTES_MAP[workMinutes] || 5);
}

function formatMMSS(totalSecs) {
  const m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSecs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function renderTimer() {
  timerTime.textContent = formatMMSS(secondsLeft);
  timerLabel.textContent = sessionType === 'work' ? 'Work' : 'Break';
  pomodoroSessionLabel.textContent = sessionType === 'work' ? 'Work session' : 'Break';
  const total = currentSessionMinutes() * 60;
  const elapsedPct = total === 0 ? 0 : ((total - secondsLeft) / total) * 100;
  setRing(timerRingFill, 100 - elapsedPct);
  setRing(pomodoroRing, elapsedPct);
  pomodoroMeta.textContent = `${formatMMSS(secondsLeft)} · ${isRunning ? 'Running' : (secondsLeft === total ? 'Ready' : 'Paused')}`;
  document.title = isRunning ? `${formatMMSS(secondsLeft)} — Focus Deck` : 'Focus Deck — Productivity Dashboard';
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 660;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.9);
  } catch (e) { }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startPauseBtn.textContent = 'Pause';
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    secondsLeft -= 1;
    if (secondsLeft <= 0) {
      playChime();
      sessionType = sessionType === 'work' ? 'break' : 'work';
      secondsLeft = currentSessionMinutes() * 60;
    }
    renderTimer();
  }, 1000);
  renderTimer();
}

function pauseTimer() {
  isRunning = false;
  startPauseBtn.textContent = 'Start';
  clearInterval(intervalId);
  renderTimer();
}

function resetTimer() {
  clearInterval(intervalId);
  isRunning = false;
  sessionType = 'work';
  secondsLeft = workMinutes * 60;
  startPauseBtn.textContent = 'Start';
  renderTimer();
}

startPauseBtn.addEventListener('click', () => (isRunning ? pauseTimer() : startTimer()));
resetBtn.addEventListener('click', resetTimer);
skipBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  sessionType = sessionType === 'work' ? 'break' : 'work';
  secondsLeft = currentSessionMinutes() * 60;
  if (isRunning) startTimer(); else renderTimer();
});

timerModes.addEventListener('click', (e) => {
  const btn = e.target.closest('.mode-btn');
  if (!btn) return;
  timerModes.querySelectorAll('.mode-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  workMinutes = parseInt(btn.dataset.minutes, 10);
  resetTimer();
});

const quoteCard = document.getElementById('quoteCard');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const motivationMeta = document.getElementById('motivationMeta');

async function fetchQuote() {
  quoteCard.classList.remove('error');
  quoteCard.classList.add('loading');
  quoteText.textContent = 'Finding a good one…';
  quoteAuthor.textContent = '';
  newQuoteBtn.disabled = true;

  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    if (!res.ok) throw new Error('Request failed');
    const data = await res.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
    motivationMeta.textContent = 'Tap for another';
  } catch (err) {
    quoteCard.classList.add('error');
    quoteText.textContent = "Couldn't reach the quote service — check your connection and try again.";
    quoteAuthor.textContent = '';
  } finally {
    quoteCard.classList.remove('loading');
    newQuoteBtn.disabled = false;
  }
}

newQuoteBtn.addEventListener('click', fetchQuote);

const weatherIcon = document.getElementById('weatherIcon');
const weatherTemp = document.getElementById('weatherTemp');
const weatherLoc = document.getElementById('weatherLoc');

const WEATHER_CODES = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌦️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '🌨️',
  80: '🌧️', 81: '🌧️', 82: '⛈️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
};

async function loadWeather(lat, lon, label) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    if (!res.ok) throw new Error('forecast failed');
    const data = await res.json();
    const temp = Math.round(data.current_weather.temperature);
    const code = data.current_weather.weathercode;
    weatherIcon.textContent = WEATHER_CODES[code] || '🌡️';
    weatherTemp.textContent = `${temp}°C`;
    weatherLoc.textContent = label;
  } catch (err) {
    weatherTemp.textContent = '—°';
    weatherIcon.textContent = '⚠️';
    weatherLoc.textContent = 'Weather unavailable';
  }
}

async function resolveLocationName(lat, lon) {
  try {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
    if (!res.ok) throw new Error('geocode failed');
    const data = await res.json();
    return data.city || data.locality || data.principalSubdivision || 'Your location';
  } catch (err) {
    return 'Your location';
  }
}

function initWeather() {
  const fallback = { lat: 51.5074, lon: -0.1278, label: 'Bhopal' };

  if (!('geolocation' in navigator)) {
    loadWeather(fallback.lat, fallback.lon, fallback.label);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      const label = await resolveLocationName(latitude, longitude);
      loadWeather(latitude, longitude, label);
    },
    () => {
      weatherLoc.textContent = fallback.label;
      loadWeather(fallback.lat, fallback.lon, fallback.label);
    },
    { timeout: 8000 }
  );
}

function init() {
  renderTodos();
  updatePlannerMeta();
  renderGoals();
  renderTimer();
  tickClock();
  setInterval(tickClock, 1000);
  initWeather();
}

document.addEventListener('DOMContentLoaded', init);
