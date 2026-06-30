const STORAGE_KEYS = {
  TRANSACTIONS: 'fintrack_transactions',
  CURRENCY: 'fintrack_currency',
  DISPLAY_NAME: 'fintrack_display_name',
  THEME: 'fintrack_theme',
  LOGGED_IN: 'fintrack_logged_in',
  LOGIN_NAME: 'fintrack_login_name',
};

const CURRENCIES = { USD: '$', EUR: '\u20AC', GBP: '\u00A3', INR: '\u20B9', JPY: '\u00A5' };

let currentCurrency = 'USD';
let currentFilter = 'all';
let transactionType = 'income';
let chartInstance = null;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function getTransactions() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) || [];
  } catch { return []; }
}

function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCurrency(amount) {
  const symbol = CURRENCIES[currentCurrency] || '$';
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${symbol}${formatted}`;
}

function showToast(message, type = 'success') {
  const toast = $('#toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._hide);
  toast._hide = setTimeout(() => toast.classList.remove('show'), 3000);
}

function calcTotals(transactions) {
  let income = 0, expense = 0;
  for (const t of transactions) {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;
  }
  return { income, expense, balance: income - expense, count: transactions.length };
}

function updateSummaryCards(totals) {
  $('#balanceValue').textContent = formatCurrency(totals.balance);
  $('#incomeValue').textContent = formatCurrency(totals.income);
  $('#expenseValue').textContent = formatCurrency(totals.expense);
  $('#countValue').textContent = totals.count;
}

function renderTable(transactions) {
  const tbody = $('#transactionTableBody');
  const emptyState = $('#emptyState');
  const countEl = $('#tableCount');

  if (transactions.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    countEl.textContent = '0 entries';
    return;
  }

  emptyState.style.display = 'none';
  countEl.textContent = `${transactions.length} ${transactions.length === 1 ? 'entry' : 'entries'}`;

  tbody.innerHTML = transactions.map(t => `
    <tr>
      <td>${formatDate(t.date)}</td>
      <td>${escapeHtml(t.description)}</td>
      <td><span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">${escapeHtml(t.category)}</span></td>
      <td class="${t.type === 'income' ? 'amount-income' : 'amount-expense'}">${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}</td>
      <td>
        <button class="btn-icon" data-id="${t.id}" title="Delete transaction">&times;</button>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('.btn-icon').forEach(btn => {
    btn.addEventListener('click', () => deleteTransaction(btn.dataset.id));
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderChart(transactions) {
  const ctx = document.getElementById('cashFlowChart').getContext('2d');

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  const grouped = {};
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  for (const t of sorted) {
    const key = t.date;
    if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
    if (t.type === 'income') grouped[key].income += t.amount;
    else grouped[key].expense += t.amount;
  }

  const labels = Object.keys(grouped);
  const incomeData = labels.map(l => grouped[l].income);
  const expenseData = labels.map(l => grouped[l].expense);

  if (labels.length === 0) {
    labels.push('No data');
    incomeData.push(0);
    expenseData.push(0);
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.map(l => formatDate(l)),
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(22, 163, 74, 0.75)',
          borderColor: '#16a34a',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'Expense',
          data: expenseData,
          backgroundColor: 'rgba(220, 38, 38, 0.75)',
          borderColor: '#dc2626',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8, font: { family: 'Inter' } } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
        y: { beginAtZero: true, ticks: { font: { family: 'Inter', size: 11 }, callback: v => formatCurrency(v) } },
      },
    },
  });
}

function refreshDashboard() {
  const transactions = getTransactions();
  const filtered = currentFilter === 'all'
    ? [...transactions]
    : transactions.filter(t => t.type === currentFilter);

  const totals = calcTotals(transactions);
  updateSummaryCards(totals);

  const filterBtn = $(`.filter-btn[data-filter="${currentFilter}"]`);
  if (filterBtn) {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    filterBtn.classList.add('active');
  }

  renderTable(filtered);
  renderChart(transactions);
}

function masterRefresh() {
  refreshDashboard();
}

function addTransaction(e) {
  const type = transactionType;
  const description = $('#descriptionInput').value.trim();
  const amount = parseFloat($('#amountInput').value);
  const date = $('#dateInput').value;
  const category = $('#categorySelect').value;

  let valid = true;

  if (!description) {
    $('#descriptionError').classList.add('visible');
    valid = false;
  } else {
    $('#descriptionError').classList.remove('visible');
  }

  if (!amount || amount <= 0) {
    $('#amountError').classList.add('visible');
    valid = false;
  } else {
    $('#amountError').classList.remove('visible');
  }

  if (!date) {
    $('#dateError').classList.add('visible');
    valid = false;
  } else {
    $('#dateError').classList.remove('visible');
  }

  if (!category) {
    $('#categoryError').classList.add('visible');
    valid = false;
  } else {
    $('#categoryError').classList.remove('visible');
  }

  if (!valid) return;

  const transaction = {
    id: generateId(),
    type,
    description,
    amount,
    date,
    category,
    timestamp: Date.now(),
  };

  const transactions = getTransactions();
  transactions.push(transaction);
  saveTransactions(transactions);
  closeModal();
  masterRefresh();
  showToast('Transaction saved successfully');
}

function deleteTransaction(id) {
  let transactions = getTransactions();
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions(transactions);
  masterRefresh();
  showToast('Transaction deleted');
}

function openModal() {
  $('#transactionModal').classList.add('open');
  $('#descriptionInput').focus();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#transactionModal').classList.remove('open');
  document.body.style.overflow = '';
  resetModalForm();
}

function resetModalForm() {
  $('#descriptionInput').value = '';
  $('#amountInput').value = '';
  $('#dateInput').value = '';
  $('#categorySelect').value = '';
  $$('.form-error').forEach(el => el.classList.remove('visible'));
  transactionType = 'income';
  const btns = $$('.type-btn');
  btns[0].className = 'type-btn active-income';
  btns[1].className = 'type-btn';
}

function switchPage(page) {
  $$('.section').forEach(s => s.classList.remove('active'));
  $$('.nav-links button').forEach(b => b.classList.remove('active'));

  if (page === 'dashboard') {
    $('#dashboardSection').classList.add('active');
    $(`.nav-links button[data-page="dashboard"]`).classList.add('active');
    masterRefresh();
  } else if (page === 'settings') {
    $('#settingsSection').classList.add('active');
    $(`.nav-links button[data-page="settings"]`).classList.add('active');
    loadSettings();
  }
}

function applyCurrency(currency) {
  currentCurrency = currency || 'USD';
  masterRefresh();
  const transactions = getTransactions();
  renderChart(transactions);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    $('#darkModeToggle').checked = true;
  } else {
    document.documentElement.removeAttribute('data-theme');
    $('#darkModeToggle').checked = false;
  }
}

function loadSettings() {
  const name = localStorage.getItem(STORAGE_KEYS.DISPLAY_NAME) || '';
  $('#displayNameInput').value = name;

  const currency = localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'USD';
  $('#currencySelect').value = currency;
}

function saveDisplayName() {
  const name = $('#displayNameInput').value.trim();
  localStorage.setItem(STORAGE_KEYS.DISPLAY_NAME, name);
  showToast('Display name saved');
}

function saveCurrency() {
  const currency = $('#currencySelect').value;
  localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  applyCurrency(currency);
  showToast(`Currency changed to ${currency}`);
}

function toggleDarkMode(e) {
  const enabled = e.target.checked;
  const theme = enabled ? 'dark' : 'light';
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  applyTheme(theme);
}

function resetAllData() {
  if (!confirm('Are you sure you want to delete ALL your data? This action cannot be undone.')) return;
  if (!confirm('This will remove all transactions, settings, and preferences. Proceed?')) return;

  localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
  localStorage.removeItem(STORAGE_KEYS.CURRENCY);
  localStorage.removeItem(STORAGE_KEYS.DISPLAY_NAME);
  localStorage.removeItem(STORAGE_KEYS.THEME);

  currentCurrency = 'USD';
  applyCurrency('USD');
  applyTheme('light');

  $('#currencySelect').value = 'USD';
  $('#displayNameInput').value = '';
  $('#darkModeToggle').checked = false;

  masterRefresh();
  showToast('All data has been reset');
}

function login() {
  const name = $('#loginName').value.trim();
  if (!name) {
    $('#loginName').focus();
    return;
  }
  localStorage.setItem(STORAGE_KEYS.LOGGED_IN, 'true');
  localStorage.setItem(STORAGE_KEYS.LOGIN_NAME, name);
  showApp();
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.LOGGED_IN);
  localStorage.removeItem(STORAGE_KEYS.LOGIN_NAME);
  $('#loginName').value = '';
  $('#loginScreen').style.display = 'flex';
  $('#app').style.display = 'none';
}

function showApp() {
  $('#loginScreen').style.display = 'none';
  $('#app').style.display = 'block';
  initApp();
}

function initApp() {
  const savedCurrency = localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'USD';
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';

  currentCurrency = savedCurrency;
  $('#currencySelect').value = savedCurrency;
  applyTheme(savedTheme);
  masterRefresh();
}

document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem(STORAGE_KEYS.LOGGED_IN) === 'true';

  if (isLoggedIn) {
    showApp();
  } else {
    $('#loginScreen').style.display = 'flex';
    $('#app').style.display = 'none';
  }

  $('#loginBtn').addEventListener('click', login);
  $('#loginName').addEventListener('keydown', e => { if (e.key === 'Enter') login(); });

  $('#logoutBtn').addEventListener('click', logout);

  $$('.nav-links button').forEach(btn => {
    btn.addEventListener('click', () => switchPage(btn.dataset.page));
  });

  $('#addTransactionBtn').addEventListener('click', openModal);

  $('#modalClose').addEventListener('click', closeModal);
  $('#modalCancel').addEventListener('click', closeModal);
  $('#transactionModal').addEventListener('click', e => {
    if (e.target === $('#transactionModal')) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && $('#transactionModal').classList.contains('open')) closeModal();
  });

  $$('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      transactionType = btn.dataset.type;
      $$('.type-btn').forEach(b => {
        b.className = 'type-btn';
        if (b.dataset.type === 'income' && transactionType === 'income') b.classList.add('active-income');
        if (b.dataset.type === 'expense' && transactionType === 'expense') b.classList.add('active-expense');
      });
    });
  });

  $('#modalSave').addEventListener('click', addTransaction);
  $('#descriptionInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTransaction(e);
  });

  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      masterRefresh();
    });
  });

  let settingsTimeout;
  $('#displayNameInput').addEventListener('input', () => {
    clearTimeout(settingsTimeout);
    settingsTimeout = setTimeout(saveDisplayName, 600);
  });

  $('#currencySelect').addEventListener('change', saveCurrency);

  $('#darkModeToggle').addEventListener('change', toggleDarkMode);

  $('#resetDataBtn').addEventListener('click', resetAllData);
});
