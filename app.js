// oneshotfinance - app.js

// Handle setup form submission
const setupForm = document.getElementById('setup-form');
if (setupForm) {
  setupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const data = {
      salary: document.getElementById('salary').value,
      cash: document.getElementById('cash').value,
      floor: document.getElementById('floor').value,
      ccBalance: document.getElementById('cc-balance').value,
      ccTarget: document.getElementById('cc-target').value,
      etfValue: document.getElementById('etf-value').value,
      cryptoValue: document.getElementById('crypto-value').value,
      savingsRate: document.getElementById('savings-rate').value,
      investAmount: document.getElementById('invest-amount').value,
      investStart: document.getElementById('invest-start').value
    };
    
    localStorage.setItem('oneshotfinance', JSON.stringify(data));
    window.location.href = 'dashboard.html';
  });
}

// Handle landing page button
const startBtn = document.getElementById('start-btn');
if (startBtn) {
  startBtn.addEventListener('click', function() {
    window.location.href = 'setup.html';
  });
}

// Load data on dashboard
function loadDashboard() {
  const stored = localStorage.getItem('oneshotfinance');
  if (!stored) return;
  
  const data = JSON.parse(stored);
  
  // Update values if elements exist
  const cashEl = document.getElementById('cash-value');
  const amexEl = document.getElementById('amex-value');
  
  if (cashEl && data.cash) {
    cashEl.textContent = '$' + Number(data.cash).toLocaleString();
  }
  if (amexEl && data.ccBalance) {
    amexEl.textContent = '$' + Number(data.ccBalance).toLocaleString();
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', loadDashboard);